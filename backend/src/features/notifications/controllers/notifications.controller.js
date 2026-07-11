const service = require('../services/notifications.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── Get ─────────────────────────────────────────────────────────────────────────

exports.getNotifications = async (req, res, next) => {
  await ok(() => service.getUserNotifications(req.params.userId, req.query), req, res, next);
};

exports.getNotificationById = async (req, res, next) => {
  await ok(() => service.getNotificationById(req.params.id), req, res, next);
};

exports.getUnreadCount = async (req, res, next) => {
  await ok(() => service.getUnreadCount(req.params.userId), req, res, next);
};

// ─── Create ──────────────────────────────────────────────────────────────────────

exports.createNotification = async (req, res, next) => {
  await ok(() => service.createNotification(req.body), req, res, next);
};

exports.createCrimeAlert = async (req, res, next) => {
  await ok(() => service.createCrimeAlert(req.body), req, res, next);
};

exports.createEmergencyAlert = async (req, res, next) => {
  await ok(() => service.createEmergencyAlert(req.body), req, res, next);
};

exports.createStatusUpdate = async (req, res, next) => {
  const { userId, reportId, oldStatus, newStatus } = req.body;
  await ok(() => service.createStatusUpdate(userId, reportId, oldStatus, newStatus), req, res, next);
};

exports.createPoliceUpdate = async (req, res, next) => {
  const { userId, reportId, officerName, officerId } = req.body;
  await ok(() => service.createPoliceUpdate(userId, reportId, officerName, officerId), req, res, next);
};

exports.createAdminBroadcast = async (req, res, next) => {
  await ok(() => service.createAdminBroadcast(req.body), req, res, next);
};

// ─── Mark ─────────────────────────────────────────────────────────────────────────

exports.markAsRead = async (req, res, next) => {
  await ok(() => service.markAsRead(req.params.id, req.params.userId), req, res, next);
};

exports.markAsUnread = async (req, res, next) => {
  await ok(() => service.markAsUnread(req.params.id, req.params.userId), req, res, next);
};

exports.markAllAsRead = async (req, res, next) => {
  await ok(() => service.markAllAsRead(req.params.userId), req, res, next);
};

exports.archiveNotification = async (req, res, next) => {
  await ok(() => service.archiveNotification(req.params.id, req.params.userId), req, res, next);
};

// ─── Delete ──────────────────────────────────────────────────────────────────────

exports.deleteNotification = async (req, res, next) => {
  await ok(async () => {
    await service.deleteNotification(req.params.id, req.params.userId);
    return { message: 'Notification deleted successfully' };
  }, req, res, next);
};

exports.deleteAllNotifications = async (req, res, next) => {
  await ok(() => service.deleteAllNotifications(req.params.userId), req, res, next);
};
