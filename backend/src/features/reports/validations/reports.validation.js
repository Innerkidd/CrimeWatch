const Model = require('../models/reports.model');

function required(v, field) {
  if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) return `${field} is required`;
  return null;
}

function isString(v, field) {
  if (v !== undefined && v !== null && typeof v !== 'string') return `${field} must be a string`;
  return null;
}

function minLength(v, min, field) {
  if (v && v.length < min) return `${field} must be at least ${min} characters`;
  return null;
}

function maxLength(v, max, field) {
  if (v && v.length > max) return `${field} must be at most ${max} characters`;
  return null;
}

function inList(v, list, field) {
  if (v && !list.includes(v)) return `${field} must be one of: ${list.join(', ')}`;
  return null;
}

function isNumber(v, field) {
  if (v !== undefined && v !== null && typeof v !== 'number') return `${field} must be a number`;
  return null;
}

function isLat(v) {
  if (v === undefined || v === null) return null;
  if (typeof v !== 'number') return 'lat must be a number';
  if (v < -90 || v > 90) return 'lat must be between -90 and 90';
  return null;
}

function isLng(v) {
  if (v === undefined || v === null) return null;
  if (typeof v !== 'number') return 'lng must be a number';
  if (v < -180 || v > 180) return 'lng must be between -180 and 180';
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

// ─── Create Report ──────────────────────────────────────────────────────────────

exports.validateCreateReport = (data) => {
  const errors = [];
  const titleErr = required(data.title, 'Title') || minLength(data.title, 3, 'Title') || maxLength(data.title, 200, 'Title');
  if (titleErr) errors.push(titleErr);
  const catErr = required(data.category, 'Category') || inList(data.category, Model.CATEGORIES, 'Category');
  if (catErr) errors.push(catErr);
  const sevErr = inList(data.severity, Model.SEVERITIES, 'Severity');
  if (sevErr) errors.push(sevErr);
  if (data.description) {
    const descErr = maxLength(data.description, 2000, 'Description');
    if (descErr) errors.push(descErr);
  }
  if (data.location) {
    if (typeof data.location !== 'object') errors.push('location must be an object');
    else {
      if (data.location.lat !== undefined) { const err = isLat(data.location.lat); if (err) errors.push(err); }
      if (data.location.lng !== undefined) { const err = isLng(data.location.lng); if (err) errors.push(err); }
    }
  }
  return errors;
};

// ─── Update Report ──────────────────────────────────────────────────────────────

exports.validateUpdateReport = (data) => {
  const errors = [];
  if (data.title) { const err = minLength(data.title, 3, 'Title') || maxLength(data.title, 200, 'Title'); if (err) errors.push(err); }
  if (data.category) { const err = inList(data.category, Model.CATEGORIES, 'Category'); if (err) errors.push(err); }
  if (data.severity) { const err = inList(data.severity, Model.SEVERITIES, 'Severity'); if (err) errors.push(err); }
  if (data.description) { const err = maxLength(data.description, 2000, 'Description'); if (err) errors.push(err); }
  if (data.location && typeof data.location === 'object') {
    if (data.location.lat !== undefined) { const err = isLat(data.location.lat); if (err) errors.push(err); }
    if (data.location.lng !== undefined) { const err = isLng(data.location.lng); if (err) errors.push(err); }
  }
  if (Object.keys(data).length === 0) errors.push('No fields to update');
  return errors;
};

// ─── Update Status ──────────────────────────────────────────────────────────────

exports.validateUpdateStatus = (data) => {
  return validate({
    status: [(v) => required(v, 'status'), (v) => inList(v, Model.STATUSES, 'Status')],
  }, data);
};

// ─── Evidence ────────────────────────────────────────────────────────────────────

exports.validateAddEvidence = (data) => {
  const errors = [];
  const fnErr = required(data.fileName, 'fileName');
  if (fnErr) errors.push(fnErr);
  if (data.fileType && !Model.ALLOWED_MIME_TYPES.includes(data.fileType)) {
    errors.push(`fileType must be one of: ${Model.ALLOWED_MIME_TYPES.join(', ')}`);
  }
  if (data.type) { const err = inList(data.type, Model.EVIDENCE_TYPES, 'type'); if (err) errors.push(err); }
  return errors;
};

// ─── Location Query ─────────────────────────────────────────────────────────────

exports.validateLocationQuery = (query) => {
  const errors = [];
  if (!query.lat && query.lat !== 0) errors.push('lat is required');
  if (!query.lng && query.lng !== 0) errors.push('lng is required');
  if (query.lat !== undefined && isNaN(parseFloat(query.lat))) errors.push('lat must be a valid number');
  if (query.lng !== undefined && isNaN(parseFloat(query.lng))) errors.push('lng must be a valid number');
  if (query.radius && (isNaN(parseFloat(query.radius)) || parseFloat(query.radius) <= 0)) errors.push('radius must be a positive number');
  return errors;
};

// ─── Search ─────────────────────────────────────────────────────────────────────

exports.validateSearch = (query) => {
  const errors = [];
  if (!query.q || (typeof query.q === 'string' && query.q.trim() === '')) errors.push('Search query "q" is required');
  return errors;
};

// ─── Filters ────────────────────────────────────────────────────────────────────

exports.validateFilters = (query) => {
  const errors = [];
  if (query.status && !Model.STATUSES.includes(query.status)) errors.push(`status must be one of: ${Model.STATUSES.join(', ')}`);
  if (query.category && !Model.CATEGORIES.map((c) => c.toLowerCase()).includes(query.category.toLowerCase())) {
    errors.push(`category must be one of: ${Model.CATEGORIES.join(', ')}`);
  }
  if (query.severity && !Model.SEVERITIES.includes(query.severity)) errors.push(`severity must be one of: ${Model.SEVERITIES.join(', ')}`);
  if (query.page && (isNaN(parseInt(query.page)) || parseInt(query.page) < 1)) errors.push('page must be a positive integer');
  if (query.limit && (isNaN(parseInt(query.limit)) || parseInt(query.limit) < 1)) errors.push('limit must be a positive integer');
  return errors;
};

// ─── ID ─────────────────────────────────────────────────────────────────────────

exports.validateId = (id) => {
  if (!id || (typeof id === 'string' && id.trim() === '')) return 'ID parameter is required';
  return null;
};
