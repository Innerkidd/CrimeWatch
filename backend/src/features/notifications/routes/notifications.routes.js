const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notifications.controller');
const validate = require('../validations/notifications.validation');

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

// ─── Get ─────────────────────────────────────────────────────────────────────────

router.get('/:userId', param(validate.validateId, 'userId'), query(validate.validateNotificationsQuery), ctrl.getNotifications);
router.get('/:userId/unread-count', param(validate.validateId, 'userId'), ctrl.getUnreadCount);
router.get('/detail/:id', param(validate.validateId, 'id'), ctrl.getNotificationById);

// ─── Create ──────────────────────────────────────────────────────────────────────

router.post('/', body(validate.validateCreateNotification), ctrl.createNotification);
router.post('/crime-alert', body(validate.validateCreateAlert), ctrl.createCrimeAlert);
router.post('/emergency-alert', body(validate.validateCreateAlert), ctrl.createEmergencyAlert);
router.post('/status-update', body(validate.validateStatusUpdate), ctrl.createStatusUpdate);
router.post('/police-update', body(validate.validatePoliceUpdate), ctrl.createPoliceUpdate);
router.post('/broadcast', body(validate.validateBroadcast), ctrl.createAdminBroadcast);

// ─── Mark ────────────────────────────────────────────────────────────────────────

router.patch('/:userId/read-all', param(validate.validateId, 'userId'), ctrl.markAllAsRead);
router.patch('/:userId/:id/read', param(validate.validateId, 'userId'), param(validate.validateId, 'id'), ctrl.markAsRead);
router.patch('/:userId/:id/unread', param(validate.validateId, 'userId'), param(validate.validateId, 'id'), ctrl.markAsUnread);
router.patch('/:userId/:id/archive', param(validate.validateId, 'userId'), param(validate.validateId, 'id'), ctrl.archiveNotification);

// ─── Delete ──────────────────────────────────────────────────────────────────────

router.delete('/:userId/:id', param(validate.validateId, 'userId'), param(validate.validateId, 'id'), ctrl.deleteNotification);
router.delete('/:userId', param(validate.validateId, 'userId'), ctrl.deleteAllNotifications);

module.exports = router;
