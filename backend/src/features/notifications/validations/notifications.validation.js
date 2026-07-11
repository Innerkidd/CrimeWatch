const TYPES = ['crime_alert', 'emergency_alert', 'status_update', 'police_update', 'admin_broadcast', 'system_notification'];
const STATUSES = ['unread', 'read', 'archived'];
const PRIORITIES = ['low', 'normal', 'high', 'critical'];

function required(v, field) {
  if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) return `${field} is required`;
  return null;
}

function isString(v, field) {
  if (v !== undefined && v !== null && typeof v !== 'string') return `${field} must be a string`;
  return null;
}

function inList(v, list, field) {
  if (v && !list.includes(v)) return `${field} must be one of: ${list.join(', ')}`;
  return null;
}

function isObject(v, field) {
  if (v !== undefined && v !== null && (typeof v !== 'object' || Array.isArray(v))) return `${field} must be an object`;
  return null;
}

function validate(schema, data) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const err = rule(data[field], field);
      if (err) { errors.push(err); break; }
    }
  }
  return errors;
}

// ─── Create Notification ─────────────────────────────────────────────────────────

exports.validateCreateNotification = (data) => {
  return validate({
    userId: [(v) => required(v, 'userId'), (v) => isString(v, 'userId')],
    title: [(v) => required(v, 'title'), (v) => isString(v, 'title')],
    message: [(v) => required(v, 'message'), (v) => isString(v, 'message')],
    type: [(v) => inList(v, TYPES, 'type')],
    priority: [(v) => inList(v, PRIORITIES, 'priority')],
  }, data);
};

exports.validateCreateAlert = (data) => {
  return validate({
    userId: [(v) => required(v, 'userId'), (v) => isString(v, 'userId')],
    title: [(v) => required(v, 'title'), (v) => isString(v, 'title')],
    message: [(v) => required(v, 'message'), (v) => isString(v, 'message')],
  }, data);
};

exports.validateStatusUpdate = (data) => {
  return validate({
    userId: [(v) => required(v, 'userId')],
    reportId: [(v) => required(v, 'reportId')],
    oldStatus: [(v) => required(v, 'oldStatus')],
    newStatus: [(v) => required(v, 'newStatus')],
  }, data);
};

exports.validatePoliceUpdate = (data) => {
  return validate({
    userId: [(v) => required(v, 'userId')],
    reportId: [(v) => required(v, 'reportId')],
    officerName: [(v) => required(v, 'officerName')],
    officerId: [(v) => required(v, 'officerId')],
  }, data);
};

exports.validateBroadcast = (data) => {
  return validate({
    title: [(v) => required(v, 'title'), (v) => isString(v, 'title')],
    message: [(v) => required(v, 'message'), (v) => isString(v, 'message')],
    userId: [(v) => isString(v, 'userId')],
  }, data);
};

// ─── Status ──────────────────────────────────────────────────────────────────────

exports.validateMarkStatus = (data) => {
  const errors = [];
  if (data.status && !STATUSES.includes(data.status)) {
    errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  }
  return errors;
};

// ─── Filters ─────────────────────────────────────────────────────────────────────

exports.validateNotificationsQuery = (query) => {
  const errors = [];
  if (query.status && !STATUSES.includes(query.status)) {
    errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  }
  if (query.type && !TYPES.includes(query.type)) {
    errors.push(`type must be one of: ${TYPES.join(', ')}`);
  }
  if (query.priority && !PRIORITIES.includes(query.priority)) {
    errors.push(`priority must be one of: ${PRIORITIES.join(', ')}`);
  }
  if (query.page && (isNaN(parseInt(query.page)) || parseInt(query.page) < 1)) {
    errors.push('page must be a positive integer');
  }
  if (query.limit && (isNaN(parseInt(query.limit)) || parseInt(query.limit) < 1)) {
    errors.push('limit must be a positive integer');
  }
  if (query.sortBy && !['createdAt', 'priority', 'type'].includes(query.sortBy)) {
    errors.push('sortBy must be one of: createdAt, priority, type');
  }
  if (query.sortOrder && !['asc', 'desc'].includes(query.sortOrder)) {
    errors.push('sortOrder must be "asc" or "desc"');
  }
  return errors;
};

// ─── Generic ─────────────────────────────────────────────────────────────────────

exports.validateId = (id) => {
  if (!id || (typeof id === 'string' && id.trim() === '')) return 'ID parameter is required';
  return null;
};
