class NotificationsModel {
  static Notification = {
    id: '',
    userId: '',
    type: 'system_notification',
    title: '',
    message: '',
    data: {},
    status: 'unread',
    priority: 'normal',
    relatedTo: { type: '', id: '' },
    createdAt: null,
    readAt: null,
  };

  static TYPES = [
    'crime_alert',
    'emergency_alert',
    'status_update',
    'police_update',
    'admin_broadcast',
    'system_notification',
  ];

  static STATUSES = ['unread', 'read', 'archived'];

  static PRIORITIES = ['low', 'normal', 'high', 'critical'];
}

module.exports = NotificationsModel;
