const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/admin.controller');
const validate = require('../validations/admin.validation');

function validateRequest(validationFn) {
  return (req, res, next) => {
    const errors = validationFn(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

function validateQuery(validationFn, paramName) {
  return (req, res, next) => {
    const error = validationFn(req.params[paramName]);
    if (error) {
      return res.status(400).json({ success: false, errors: [error] });
    }
    next();
  };
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────

router.get('/dashboard', ctrl.getDashboardStats);

// ─── Users ──────────────────────────────────────────────────────────────────────

router.get('/users', ctrl.getAllUsers);
router.get('/users/:id', validateQuery(validate.validateId, 'id'), ctrl.getUserById);
router.patch('/users/:id/status', validateQuery(validate.validateId, 'id'), validateRequest(validate.validateUserStatus), ctrl.updateUserStatus);
router.delete('/users/:id', validateQuery(validate.validateId, 'id'), ctrl.deleteUser);

// ─── Police Officers ────────────────────────────────────────────────────────────

router.get('/police', ctrl.getAllOfficers);
router.get('/police/:id', validateQuery(validate.validateId, 'id'), ctrl.getOfficerById);
router.post('/police', validateRequest(validate.validateCreateOfficer), ctrl.createOfficer);
router.put('/police/:id', validateQuery(validate.validateId, 'id'), validateRequest(validate.validateUpdateOfficer), ctrl.updateOfficer);
router.patch('/police/:id/status', validateQuery(validate.validateId, 'id'), validateRequest(validate.validateOfficerStatus), ctrl.toggleOfficerStatus);
router.delete('/police/:id', validateQuery(validate.validateId, 'id'), ctrl.deleteOfficer);

// ─── Crime Categories ───────────────────────────────────────────────────────────

router.get('/categories', ctrl.getAllCategories);
router.get('/categories/:id', validateQuery(validate.validateId, 'id'), ctrl.getCategoryById);
router.post('/categories', validateRequest(validate.validateCreateCategory), ctrl.createCategory);
router.put('/categories/:id', validateQuery(validate.validateId, 'id'), validateRequest(validate.validateUpdateCategory), ctrl.updateCategory);
router.delete('/categories/:id', validateQuery(validate.validateId, 'id'), ctrl.deleteCategory);

// ─── Reports ────────────────────────────────────────────────────────────────────

router.get('/reports', ctrl.getAllReports);
router.get('/reports/:id', validateQuery(validate.validateId, 'id'), ctrl.getReportById);
router.put('/reports/:id', validateQuery(validate.validateId, 'id'), validateRequest(validate.validateUpdateReport), ctrl.updateReport);
router.post('/reports/:id/assign', validateQuery(validate.validateId, 'id'), validateRequest(validate.validateAssignPolice), ctrl.assignPolice);
router.delete('/reports/:id', validateQuery(validate.validateId, 'id'), ctrl.deleteReport);

// ─── Analytics ──────────────────────────────────────────────────────────────────

router.get('/analytics/categories', ctrl.getCrimesByCategory);
router.get('/analytics/cities', ctrl.getCrimesByCity);
router.get('/analytics/monthly', ctrl.getMonthlyReports);
router.get('/analytics/trends', ctrl.getCrimeTrend);
router.get('/analytics/locations', ctrl.getTopLocations);

// ─── Audit Logs ─────────────────────────────────────────────────────────────────

router.get('/audit-logs', ctrl.getAuditLogs);

module.exports = router;
