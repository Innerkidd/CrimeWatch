const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/police.controller');
const validate = require('../validations/police.validation');

function body(validationFn) {
  return (req, res, next) => {
    const errors = validationFn(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

function query(validationFn) {
  return (req, res, next) => {
    const errors = validationFn(req.query);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

function param(validationFn, paramName) {
  return (req, res, next) => {
    const error = validationFn(req.params[paramName]);
    if (error) {
      return res.status(400).json({ success: false, errors: [error] });
    }
    next();
  };
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────

router.get('/:officerId/dashboard', param(validate.validateId, 'officerId'), ctrl.getDashboard);

// ─── Profile ────────────────────────────────────────────────────────────────────

router.get('/:officerId/profile', param(validate.validateId, 'officerId'), ctrl.getProfile);
router.put('/:officerId/profile', param(validate.validateId, 'officerId'), body(validate.validateUpdateProfile), ctrl.updateProfile);
router.patch('/:officerId/availability', param(validate.validateId, 'officerId'), body(validate.validateAvailability), ctrl.updateAvailability);
router.patch('/:officerId/location', param(validate.validateId, 'officerId'), body(validate.validateLocation), ctrl.updateCurrentLocation);

// ─── Assigned Reports ───────────────────────────────────────────────────────────

router.get('/:officerId/reports', param(validate.validateId, 'officerId'), ctrl.getAssignedReports);
router.get('/reports/:id', param(validate.validateId, 'id'), ctrl.getReportDetail);
router.patch('/reports/:id/status', param(validate.validateId, 'id'), body(validate.validateUpdateReportStatus), ctrl.updateReportStatus);

// ─── Investigations ─────────────────────────────────────────────────────────────

router.get('/:officerId/investigations', param(validate.validateId, 'officerId'), ctrl.getInvestigations);
router.post('/:officerId/investigations/:id/accept', param(validate.validateId, 'officerId'), param(validate.validateId, 'id'), ctrl.acceptInvestigation);
router.post('/:officerId/investigations/:id/start', param(validate.validateId, 'officerId'), param(validate.validateId, 'id'), body(validate.validateStartInvestigation), ctrl.startInvestigation);
router.patch('/:officerId/investigations/:id/notes', param(validate.validateId, 'officerId'), param(validate.validateId, 'id'), body(validate.validateUpdateNotes), ctrl.updateInvestigationNotes);
router.post('/:officerId/investigations/:id/close', param(validate.validateId, 'officerId'), param(validate.validateId, 'id'), body(validate.validateCloseInvestigation), ctrl.closeInvestigation);

// ─── Evidence ───────────────────────────────────────────────────────────────────

router.post('/:officerId/investigations/:id/evidence', param(validate.validateId, 'officerId'), param(validate.validateId, 'id'), body(validate.validateUploadEvidence), ctrl.uploadEvidence);
router.delete('/:officerId/evidence/:evidenceId', param(validate.validateId, 'officerId'), param(validate.validateId, 'evidenceId'), ctrl.deleteEvidence);

// ─── Nearby Crimes ──────────────────────────────────────────────────────────────

router.get('/nearby', query(validate.validateNearbyCrimes), ctrl.getNearbyCrimes);

// ─── Activity Logs ──────────────────────────────────────────────────────────────

router.get('/:officerId/activity-logs', param(validate.validateId, 'officerId'), ctrl.getActivityLogs);

module.exports = router;
