const VALID_REPORT_STATUSES = ['pending', 'assigned', 'investigating', 'resolved', 'rejected'];
const VALID_PRIORITIES = ['low', 'normal', 'high'];
const VALID_INVESTIGATION_STATUSES = ['assigned', 'in_progress', 'closed'];

function required(v, field) {
  if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
    return `${field} is required`;
  }
  return null;
}

function isBoolean(v, field) {
  if (typeof v !== 'boolean') return `${field} must be a boolean`;
  return null;
}

function inList(v, list, field) {
  if (!list.includes(v)) return `${field} must be one of: ${list.join(', ')}`;
  return null;
}

function isString(v, field) {
  if (v !== undefined && v !== null && typeof v !== 'string') return `${field} must be a string`;
  return null;
}

function isNumber(v, field) {
  if (v === undefined || v === null) return null;
  if (typeof v === 'string' && v.trim() === '') return null;
  const n = parseFloat(v);
  if (isNaN(n)) return `${field} must be a number`;
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

// ─── Profile ────────────────────────────────────────────────────────────────────

exports.validateUpdateProfile = (data) => {
  return validate({
    name: [(v) => isString(v, 'Name')],
    email: [(v) => isString(v, 'Email')],
    phone: [(v) => isString(v, 'Phone')],
    department: [(v) => isString(v, 'Department')],
    rank: [(v) => isString(v, 'Rank')],
  }, data);
};

exports.validateAvailability = (data) => {
  return validate({
    isAvailable: [(v) => required(v, 'isAvailable'), (v) => isBoolean(v, 'isAvailable')],
  }, data);
};

exports.validateLocation = (data) => {
  const errors = [];
  if (!data.location) return ['location is required'];
  const loc = data.location;
  if (typeof loc.lat !== 'number') errors.push('location.lat must be a number');
  if (typeof loc.lng !== 'number') errors.push('location.lng must be a number');
  return errors;
};

// ─── Reports ─────────────────────────────────────────────────────────────────────

exports.validateUpdateReportStatus = (data) => {
  return validate({
    status: [(v) => required(v, 'Status'), (v) => inList(v, VALID_REPORT_STATUSES, 'Status')],
  }, data);
};

// ─── Investigations ──────────────────────────────────────────────────────────────

exports.validateStartInvestigation = (data) => {
  return validate({
    notes: [(v) => isString(v, 'Notes')],
  }, data);
};

exports.validateUpdateNotes = (data) => {
  return validate({
    notes: [(v) => required(v, 'Notes'), (v) => isString(v, 'Notes')],
  }, data);
};

exports.validateCloseInvestigation = (data) => {
  return validate({
    findings: [(v) => required(v, 'Findings'), (v) => isString(v, 'Findings')],
  }, data);
};

// ─── Evidence ────────────────────────────────────────────────────────────────────

exports.validateUploadEvidence = (data) => {
  return validate({
    fileName: [(v) => required(v, 'fileName')],
    fileType: [(v) => isString(v, 'fileType')],
    description: [(v) => isString(v, 'description')],
  }, data);
};

// ─── Nearby Crimes ───────────────────────────────────────────────────────────────

exports.validateNearbyCrimes = (query) => {
  const errors = [];
  if (!query.lat && query.lat !== 0) errors.push('lat is required');
  if (!query.lng && query.lng !== 0) errors.push('lng is required');
  if (query.lat && isNaN(parseFloat(query.lat))) errors.push('lat must be a valid number');
  if (query.lng && isNaN(parseFloat(query.lng))) errors.push('lng must be a valid number');
  return errors;
};

// ─── Generic ─────────────────────────────────────────────────────────────────────

exports.validateId = (id) => {
  if (!id || (typeof id === 'string' && id.trim() === '')) return 'ID parameter is required';
  return null;
};

exports.VALID_STATUSES = VALID_REPORT_STATUSES;
