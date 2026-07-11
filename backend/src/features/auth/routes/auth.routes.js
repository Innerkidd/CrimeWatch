const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth.controller');
const validate = require('../validations/auth.validation');
const service = require('../services/auth.service');

function body(fn) {
  return (req, res, next) => {
    const errors = fn(req.body);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });
    next();
  };
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, errors: ['Access token required'] });
  }
  const token = authHeader.split(' ')[1];
  const payload = service.verifyAccessToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, errors: ['Invalid or expired access token'] });
  }
  req.user = payload;
  next();
}

// ─── Public Routes ───────────────────────────────────────────────────────────────

router.post('/register', body(validate.validateRegister), ctrl.register);
router.post('/login', body(validate.validateLogin), ctrl.login);
router.post('/refresh-token', body(validate.validateRefreshToken), ctrl.refreshToken);
router.post('/forgot-password', body(validate.validateForgotPassword), ctrl.forgotPassword);
router.post('/reset-password', body(validate.validateResetPassword), ctrl.resetPassword);

// ─── Protected Routes ────────────────────────────────────────────────────────────

router.post('/logout', authMiddleware, body(validate.validateLogout), ctrl.logout);
router.get('/profile', authMiddleware, ctrl.getProfile);

module.exports = router;
