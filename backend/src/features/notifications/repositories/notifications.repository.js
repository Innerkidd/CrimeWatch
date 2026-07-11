let idCounter = 100;
const generateId = () => String(idCounter++);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const notifications = [
  {
    id: '1', userId: '1', type: 'crime_alert', title: 'New crime reported nearby',
    message: 'A Smartphone snatching has been reported at Central Park, 500m from your location.',
    data: { reportId: '1', category: 'Robbery', severity: 'high', lat: 40.7829, lng: -73.9654 },
    status: 'unread', priority: 'high', relatedTo: { type: 'report', id: '1' },
    createdAt: new Date('2025-06-10T20:35:00'), readAt: null,
  },
  {
    id: '2', userId: '2', type: 'status_update', title: 'Report status updated',
    message: 'Your report "Car break-in on 5th Avenue" status changed to Investigating.',
    data: { reportId: '2', oldStatus: 'pending', newStatus: 'investigating' },
    status: 'unread', priority: 'normal', relatedTo: { type: 'report', id: '2' },
    createdAt: new Date('2025-06-10T09:00:00'), readAt: null,
  },
  {
    id: '3', userId: '1', type: 'police_update', title: 'Police assigned to your report',
    message: 'Officer Jane Doe has been assigned to investigate "Assault at Downtown Bar".',
    data: { reportId: '3', officerId: '1', officerName: 'Officer Jane Doe' },
    status: 'read', priority: 'normal', relatedTo: { type: 'report', id: '3' },
    createdAt: new Date('2025-06-09T10:00:00'), readAt: new Date('2025-06-09T14:00:00'),
  },
  {
    id: '4', userId: '1', type: 'crime_alert', title: 'Emergency: Shots fired in Bronx',
    message: 'Critical incident reported in Bronx area. Stay away from the vicinity.',
    data: { reportId: '11', severity: 'critical', lat: 40.8448, lng: -73.8648 },
    status: 'unread', priority: 'critical', relatedTo: { type: 'report', id: '11' },
    createdAt: new Date('2025-06-12T02:35:00'), readAt: null,
  },
  {
    id: '5', userId: '2', type: 'system_notification', title: 'Profile updated',
    message: 'Your profile information has been updated successfully.',
    data: {},
    status: 'read', priority: 'low', relatedTo: { type: 'user', id: '2' },
    createdAt: new Date('2025-06-08T12:00:00'), readAt: new Date('2025-06-08T12:05:00'),
  },
  {
    id: '6', userId: '3', type: 'admin_broadcast', title: 'System maintenance tonight',
    message: 'The system will be down for maintenance from 2 AM to 4 AM.',
    data: { startTime: '2025-06-15T02:00:00', endTime: '2025-06-15T04:00:00' },
    status: 'unread', priority: 'normal', relatedTo: { type: '', id: '' },
    createdAt: new Date('2025-06-11T10:00:00'), readAt: null,
  },
  {
    id: '7', userId: '3', type: 'crime_alert', title: 'Investigation completed',
    message: 'The investigation into "Drug deal observed in alley" has been completed. Suspect charged.',
    data: { reportId: '6', resolution: 'Suspect charged', officerName: 'Officer Jane Doe' },
    status: 'archived', priority: 'normal', relatedTo: { type: 'report', id: '6' },
    createdAt: new Date('2025-06-07T11:30:00'), readAt: new Date('2025-06-08T09:00:00'),
  },
  {
    id: '8', userId: '1', type: 'status_update', title: 'Report resolved',
    message: 'Your report "Drug deal observed in alley" has been marked as Resolved.',
    data: { reportId: '6', newStatus: 'resolved' },
    status: 'unread', priority: 'normal', relatedTo: { type: 'report', id: '6' },
    createdAt: new Date('2025-06-07T11:30:00'), readAt: null,
  },
  {
    id: '9', userId: '1', type: 'police_update', title: 'Officer assigned to your case',
    message: 'Officer John Roe is now handling your "Hit and run accident" report.',
    data: { reportId: '7', officerId: '2', officerName: 'Officer John Roe' },
    status: 'unread', priority: 'high', relatedTo: { type: 'report', id: '7' },
    createdAt: new Date('2025-06-11T08:00:00'), readAt: null,
  },
  {
    id: '10', userId: '2', type: 'system_notification', title: 'Welcome to CrimeWatch',
    message: 'Thank you for joining CrimeWatch. Report incidents and stay informed about crime in your area.',
    data: {},
    status: 'read', priority: 'low', relatedTo: { type: '', id: '' },
    createdAt: new Date('2025-04-01T00:00:00'), readAt: new Date('2025-04-01T00:05:00'),
  },
];

const Repository = {
  // ─── CRUD ──────────────────────────────────────────────────────────────────────
  create: async (data) => {
    await sleep(5);
    const notification = {
      id: generateId(),
      userId: data.userId,
      type: data.type || 'system_notification',
      title: data.title,
      message: data.message,
      data: data.data || {},
      status: 'unread',
      priority: data.priority || 'normal',
      relatedTo: data.relatedTo || { type: '', id: '' },
      createdAt: new Date(),
      readAt: null,
    };
    notifications.push(notification);
    return notification;
  },

  findById: async (notificationId) => {
    await sleep(3);
    return notifications.find((n) => n.id === notificationId) || null;
  },

  findAllByUser: async (userId, filters = {}) => {
    await sleep(10);
    let result = notifications.filter((n) => n.userId === userId);
    if (filters.status) {
      if (filters.status === 'unread') result = result.filter((n) => n.status === 'unread');
      else if (filters.status === 'read') result = result.filter((n) => n.status === 'read');
      else if (filters.status === 'archived') result = result.filter((n) => n.status === 'archived');
    }
    if (filters.type) result = result.filter((n) => n.type === filters.type);
    if (filters.priority) result = result.filter((n) => n.priority === filters.priority);
    if (filters.dateFrom) result = result.filter((n) => n.createdAt >= new Date(filters.dateFrom));
    if (filters.dateTo) result = result.filter((n) => n.createdAt <= new Date(filters.dateTo));
    const sortField = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      if (sortField === 'priority') {
        const order = { critical: 4, high: 3, normal: 2, low: 1 };
        return (order[a.priority] - order[b.priority]) * sortOrder;
      }
      return (new Date(a[sortField]) - new Date(b[sortField])) * sortOrder;
    });
    const page = parseInt(filters.page, 10) || 1;
    const limit = parseInt(filters.limit, 10) || 20;
    const offset = (page - 1) * limit;
    const total = result.length;
    const items = result.slice(offset, offset + limit);
    return { notifications: items, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  // ─── Status ─────────────────────────────────────────────────────────────────────
  markAsReadById: async (notificationId) => {
    await sleep(3);
    const n = notifications.find((x) => x.id === notificationId);
    if (!n) return null;
    n.status = 'read';
    n.readAt = new Date();
    return n;
  },

  markAsUnreadById: async (notificationId) => {
    await sleep(3);
    const n = notifications.find((x) => x.id === notificationId);
    if (!n) return null;
    n.status = 'unread';
    n.readAt = null;
    return n;
  },

  markAllAsReadByUser: async (userId) => {
    await sleep(5);
    const now = new Date();
    let count = 0;
    notifications.forEach((n) => {
      if (n.userId === userId && n.status === 'unread') {
        n.status = 'read';
        n.readAt = now;
        count++;
      }
    });
    return count;
  },

  archiveById: async (notificationId) => {
    await sleep(3);
    const n = notifications.find((x) => x.id === notificationId);
    if (!n) return null;
    n.status = 'archived';
    return n;
  },

  // ─── Delete ─────────────────────────────────────────────────────────────────────
  deleteById: async (notificationId) => {
    await sleep(3);
    const idx = notifications.findIndex((x) => x.id === notificationId);
    if (idx === -1) return false;
    notifications.splice(idx, 1);
    return true;
  },

  deleteAllByUser: async (userId) => {
    await sleep(5);
    const before = notifications.length;
    const filtered = notifications.filter((n) => n.userId !== userId);
    notifications.length = 0;
    notifications.push(...filtered);
    return before - notifications.length;
  },

  // ─── Counts ─────────────────────────────────────────────────────────────────────
  countUnreadByUser: async (userId) => {
    await sleep(3);
    return notifications.filter((n) => n.userId === userId && n.status === 'unread').length;
  },

  // ─── Bulk Create (for crime alerts) ─────────────────────────────────────────────
  createMany: async (entries) => {
    await sleep(8);
    const created = [];
    for (const entry of entries) {
      const n = {
        id: generateId(),
        userId: entry.userId,
        type: entry.type || 'crime_alert',
        title: entry.title,
        message: entry.message,
        data: entry.data || {},
        status: 'unread',
        priority: entry.priority || 'normal',
        relatedTo: entry.relatedTo || { type: '', id: '' },
        createdAt: new Date(),
        readAt: null,
      };
      notifications.push(n);
      created.push(n);
    }
    return created;
  },
};

module.exports = Repository;
