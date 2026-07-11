const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reports.controller');
const validate = require('../validations/reports.validation');
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
  if (!payload) return res.status(401).json({ success: false, errors: ['Invalid or expired access token'] });
  req.user = payload;
  next();
}

// ─── Create ─────────────────────────────────────────────────────────────────────

router.post('/', auth, body(validate.validateCreateReport), ctrl.createReport);

// ─── List / Search ──────────────────────────────────────────────────────────────

router.get('/', query(validate.validateFilters), ctrl.getAllReports);
router.get('/search', query(validate.validateSearch), ctrl.searchReports);
router.get('/category/:category', param(validate.validateId, 'category'), ctrl.getReportsByCategory);
router.get('/nearby', query(validate.validateLocationQuery), ctrl.getReportsByLocation);

// ─── Evidence ───────────────────────────────────────────────────────────────────

router.post('/:id/evidence', auth, param(validate.validateId, 'id'), body(validate.validateAddEvidence), ctrl.addEvidence);
router.delete('/:id/evidence/:evidenceId', auth, param(validate.validateId, 'id'), param(validate.validateId, 'evidenceId'), ctrl.deleteEvidence);

// ─── Stats ─────────────────────────────────────────────────────────────────────

router.get('/stats', ctrl.getStats);

// ─── By ID ──────────────────────────────────────────────────────────────────────

router.get('/:id', param(validate.validateId, 'id'), ctrl.getReportById);
router.put('/:id', auth, param(validate.validateId, 'id'), body(validate.validateUpdateReport), ctrl.updateReport);
router.patch('/:id/status', auth, param(validate.validateId, 'id'), body(validate.validateUpdateStatus), ctrl.updateReportStatus);
router.delete('/:id', auth, param(validate.validateId, 'id'), ctrl.deleteReport);

module.exports = router;
