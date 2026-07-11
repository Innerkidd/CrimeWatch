const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/users.controller');
const validate = require('../validations/users.validation');
const authService = require('../../auth/services/auth.service');

function body(fn) {
  return (req, res, next) => {
    const errors = fn(req.body);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });
    next();
  };
}

function query(fn) {
  return (req, res, next) => {
    const errors = fn(req.query);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });
    next();
  };
}

function param(fn, name) {
  return (req, res, next) => {
    const error = fn(req.params[name]);
    if (error) return res.status(400).json({ success: false, errors: [error] });
    next();
  };
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, errors: ['Access token required'] });
  }
  const token = authHeader.split(' ')[1];
  const payload = authService.verifyAccessToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, errors: ['Invalid or expired access token'] });
  }
  req.user = payload;
  next();
}

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, errors: ['Admin access required'] });
  }
  next();
}

// ─── Profile (authenticated) ────────────────────────────────────────────────────

router.get('/profile', auth, ctrl.getProfile);
router.put('/profile', auth, body(validate.validateUpdateProfile), ctrl.updateProfile);
router.patch('/profile/password', auth, body(validate.validateChangePassword), ctrl.changePassword);
router.patch('/profile/avatar', auth, body(validate.validateAvatar), ctrl.updateAvatar);

// ─── Statistics ─────────────────────────────────────────────────────────────────

router.get('/stats', auth, ctrl.getStats);

// ─── Search ─────────────────────────────────────────────────────────────────────

router.get('/search', auth, query(validate.validateSearch), ctrl.searchUsers);

// ─── Admin Management ───────────────────────────────────────────────────────────

router.get('/', auth, adminOnly, query(validate.validateFilters), ctrl.getAllUsers);
router.get('/:id', auth, param(validate.validateId, 'id'), ctrl.getUserById);
router.put('/:id', auth, adminOnly, param(validate.validateId, 'id'), body(validate.validateUpdateUser), ctrl.updateUser);
router.patch('/:id/status', auth, adminOnly, param(validate.validateId, 'id'), body(validate.validateStatus), ctrl.activateUser);
router.delete('/:id', auth, adminOnly, param(validate.validateId, 'id'), ctrl.deleteUser);

module.exports = router;
