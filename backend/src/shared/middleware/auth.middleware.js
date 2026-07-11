const JwtHelper = require('../utils/jwt.helper');
const { ROLES, ROLE_HIERARCHY, HTTP_STATUS } = require('../constants');
const { sendError } = require('./response.helper');

function authenticate(req, res, next) {
  const token = JwtHelper.extractToken(req);
  if (!token) {
    return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Access token required', 'AuthenticationError');
  }
  const payload = JwtHelper.verifyAccessToken(token);
  if (!payload) {
    return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired access token', 'AuthenticationError');
  }
  req.user = payload;
  next();
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Authentication required', 'AuthenticationError');
    }
    if (allowedRoles.length === 0) return next();
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return sendError(res, HTTP_STATUS.FORBIDDEN, 'Insufficient permissions', 'AuthorizationError');
    }
    next();
  };
}

function adminOnly(req, res, next) {
  return authorize(ROLES.ADMIN)(req, res, next);
}

function policeOnly(req, res, next) {
  return authorize(ROLES.POLICE)(req, res, next);
}

function citizenOnly(req, res, next) {
  return authorize(ROLES.CITIZEN)(req, res, next);
}

function adminOrPolice(req, res, next) {
  return authorize(ROLES.ADMIN, ROLES.POLICE)(req, res, next);
}

function adminOrCitizen(req, res, next) {
  return authorize(ROLES.ADMIN, ROLES.CITIZEN)(req, res, next);
}

function optionalAuth(req, res, next) {
  const token = JwtHelper.extractToken(req);
  if (token) {
    const payload = JwtHelper.verifyAccessToken(token);
    if (payload) req.user = payload;
  }
  next();
}

function requireRole(minimumRole) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Authentication required', 'AuthenticationError');
    }
    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    const requiredLevel = ROLE_HIERARCHY[minimumRole] || 0;
    if (userLevel < requiredLevel) {
      return sendError(res, HTTP_STATUS.FORBIDDEN, 'Insufficient permissions', 'AuthorizationError');
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorize,
  adminOnly,
  policeOnly,
  citizenOnly,
  adminOrPolice,
  adminOrCitizen,
  optionalAuth,
  requireRole,
};
