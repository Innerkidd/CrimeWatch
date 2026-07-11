const repo = require('../repositories/notifications.repository');

let io = null;

function setSocketIO(socketIO) {
  io = socketIO;
}

function getIO() {
  return io;
}

function emitToUser(userId, event, data) {
  if (!io) return;
  try {
    io.to(`user:${userId}`).emit(event, data);
  } catch (err) {
    console.error(`Socket emit error for user ${userId} event ${event}:`, err.message);
  }
}

function emitToAll(event, data) {
  if (!io) return;
  try {
    io.emit(event, data);
  } catch (err) {
    console.error(`Socket broadcast error for event ${event}:`, err.message);
  }
}

function notFound(entity) {
  const err = new Error(`${entity} not found`);
  err.statusCode = 404;
  throw err;
}

const Service = {
  // ─── Socket.IO Init ────────────────────────────────────────────────────────────
  initSocketIO: (socketIO) => {
    setSocketIO(socketIO);
  },

  // ─── CRUD ──────────────────────────────────────────────────────────────────────
  createNotification: async (data) => {
    const notification = await repo.create(data);
    emitToUser(data.userId, 'notification:new', notification);
    return notification;
  },

  createCrimeAlert: async (data) => {
    const notification = await repo.create({ ...data, type: 'crime_alert', priority: data.priority || 'high' });
    emitToUser(data.userId, 'notification:new', notification);
    return notification;
  },

  createEmergencyAlert: async (data) => {
    const notification = await repo.create({ ...data, type: 'emergency_alert', priority: 'critical' });
    emitToAll('notification:new', notification);
    return notification;
  },

  createStatusUpdate: async (userId, reportId, oldStatus, newStatus) => {
    const title = 'Report status updated';
    const message = `Your report status changed from ${oldStatus} to ${newStatus}.`;
    const notification = await repo.create({
      userId, type: 'status_update', title, message, priority: 'normal',
      data: { reportId, oldStatus, newStatus },
      relatedTo: { type: 'report', id: reportId },
    });
    emitToUser(userId, 'notification:new', notification);
    return notification;
  },

  createPoliceUpdate: async (userId, reportId, officerName, officerId) => {
    const title = 'Police assigned to your report';
    const message = `${officerName} has been assigned to your report.`;
    const notification = await repo.create({
      userId, type: 'police_update', title, message, priority: 'high',
      data: { reportId, officerId, officerName },
      relatedTo: { type: 'report', id: reportId },
    });
    emitToUser(userId, 'notification:new', notification);
    return notification;
  },

  createAdminBroadcast: async (data) => {
    const notification = await repo.create({ ...data, type: 'admin_broadcast', priority: data.priority || 'normal' });
    emitToAll('notification:new', notification);
    return notification;
  },

  bulkCreateAlerts: async (entries) => {
    const created = await repo.createMany(entries);
    for (const n of created) {
      emitToUser(n.userId, 'notification:new', n);
    }
    return created;
  },

  // ─── Get ───────────────────────────────────────────────────────────────────────
  getUserNotifications: async (userId, filters) => {
    return repo.findAllByUser(userId, filters);
  },

  getNotificationById: async (notificationId) => {
    const notification = await repo.findById(notificationId);
    if (!notification) notFound('Notification');
    return notification;
  },

  getUnreadCount: async (userId) => {
    return repo.countUnreadByUser(userId);
  },

  // ─── Mark ──────────────────────────────────────────────────────────────────────
  markAsRead: async (notificationId, userId) => {
    const notification = await repo.markAsReadById(notificationId);
    if (!notification) notFound('Notification');
    if (notification.userId !== userId) {
      const err = new Error('Unauthorized to modify this notification');
      err.statusCode = 403;
      throw err;
    }
    emitToUser(userId, 'notification:update', notification);
    return notification;
  },

  markAsUnread: async (notificationId, userId) => {
    const notification = await repo.markAsUnreadById(notificationId);
    if (!notification) notFound('Notification');
    if (notification.userId !== userId) {
      const err = new Error('Unauthorized to modify this notification');
      err.statusCode = 403;
      throw err;
    }
    emitToUser(userId, 'notification:update', notification);
    return notification;
  },

  markAllAsRead: async (userId) => {
    const count = await repo.markAllAsReadByUser(userId);
    emitToUser(userId, 'notification:update', { action: 'markAllRead', userId, count });
    return { count };
  },

  archiveNotification: async (notificationId, userId) => {
    const notification = await repo.archiveById(notificationId);
    if (!notification) notFound('Notification');
    if (notification.userId !== userId) {
      const err = new Error('Unauthorized to modify this notification');
      err.statusCode = 403;
      throw err;
    }
    emitToUser(userId, 'notification:update', notification);
    return notification;
  },

  // ─── Delete ─────────────────────────────────────────────────────────────────────
  deleteNotification: async (notificationId, userId) => {
    const notification = await repo.findById(notificationId);
    if (!notification) notFound('Notification');
    if (notification.userId !== userId) {
      const err = new Error('Unauthorized to delete this notification');
      err.statusCode = 403;
      throw err;
    }
    const deleted = await repo.deleteById(notificationId);
    if (deleted) emitToUser(userId, 'notification:delete', { id: notificationId });
    return deleted;
  },

  deleteAllNotifications: async (userId) => {
    const deleted = await repo.deleteAllByUser(userId);
    emitToUser(userId, 'notification:delete', { action: 'deleteAll', userId });
    return { deleted };
  },
};

module.exports = Service;
