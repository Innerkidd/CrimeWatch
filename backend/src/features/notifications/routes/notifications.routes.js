const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller');

// TODO: Implement auth middleware and validation
router.get('/', notificationsController.getNotifications);
router.get('/unread-count', notificationsController.getUnreadCount);
router.patch('/:id/read', notificationsController.markAsRead);
router.patch('/read-all', notificationsController.markAllAsRead);
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;
