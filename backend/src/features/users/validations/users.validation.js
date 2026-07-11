const ROLES = ['citizen', 'police', 'admin'];
const STATUSES = ['active', 'suspended', 'inactive'];

function required(v, field) {
  if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) return `${field} is required`;
  return null;
}

function isString(v, field) {
  if (v !== undefined && v !== null && typeof v !== 'string') return `${field} must be a string`;
  return null;
}

function isEmail(v) {
  if (!v) return null;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(v) ? null : 'Invalid email format';
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

function isOptionalPhone(v) {
  if (!v) return null;
  const re = /^[\d\s\+\-\(\)]{7,20}$/;
  return re.test(v) ? null : 'Invalid phone format';
}

function isOptionalPincode(v) {
  if (!v) return null;
  const re = /^\d{5,10}$/;
  return re.test(v) ? null : 'Pincode must be 5-10 digits';
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

// ─── Update Profile ─────────────────────────────────────────────────────────────

exports.validateUpdateProfile = (data) => {
  return validate({
    name: [(v) => isString(v, 'Name'), (v) => minLength(v, 2, 'Name'), (v) => maxLength(v, 100, 'Name')],
    email: [(v) => isString(v, 'Email'), (v) => isEmail(v)],
    phone: [(v) => isString(v, 'Phone'), (v) => isOptionalPhone(v)],
    address: [(v) => isString(v, 'Address'), (v) => maxLength(v, 500, 'Address')],
    city: [(v) => isString(v, 'City'), (v) => maxLength(v, 100, 'City')],
    state: [(v) => isString(v, 'State'), (v) => maxLength(v, 100, 'State')],
    pincode: [(v) => isString(v, 'Pincode'), (v) => isOptionalPincode(v)],
  }, data);
};

// ─── Change Password ────────────────────────────────────────────────────────────

exports.validateChangePassword = (data) => {
  return validate({
    currentPassword: [(v) => required(v, 'currentPassword')],
    newPassword: [(v) => required(v, 'newPassword'), (v) => minLength(v, 6, 'newPassword')],
  }, data);
};

// ─── Update User (Admin) ────────────────────────────────────────────────────────

exports.validateUpdateUser = (data) => {
  return validate({
    name: [(v) => isString(v, 'Name'), (v) => minLength(v, 2, 'Name'), (v) => maxLength(v, 100, 'Name')],
    email: [(v) => isString(v, 'Email'), (v) => isEmail(v)],
    phone: [(v) => isString(v, 'Phone'), (v) => isOptionalPhone(v)],
    role: [(v) => inList(v, ROLES, 'Role')],
    address: [(v) => isString(v, 'Address')],
    city: [(v) => isString(v, 'City')],
    state: [(v) => isString(v, 'State')],
    pincode: [(v) => isString(v, 'Pincode'), (v) => isOptionalPincode(v)],
  }, data);
};

// ─── Status ─────────────────────────────────────────────────────────────────────

exports.validateStatus = (data) => {
  return validate({
    status: [(v) => required(v, 'status'), (v) => inList(v, STATUSES, 'Status')],
  }, data);
};

// ─── Avatar ──────────────────────────────────────────────────────────────────────

exports.validateAvatar = (data) => {
  return validate({
    avatarUrl: [(v) => required(v, 'avatarUrl'), (v) => isString(v, 'avatarUrl')],
  }, data);
};

// ─── Search ─────────────────────────────────────────────────────────────────────

exports.validateSearch = (query) => {
  const errors = [];
  if (!query.q || (typeof query.q === 'string' && query.q.trim() === '')) {
    errors.push('Search query "q" is required');
  }
  return errors;
};

// ─── Filters ────────────────────────────────────────────────────────────────────

exports.validateFilters = (query) => {
  const errors = [];
  if (query.status && !STATUSES.includes(query.status)) errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  if (query.role && !ROLES.includes(query.role)) errors.push(`role must be one of: ${ROLES.join(', ')}`);
  if (query.dateFrom && isNaN(new Date(query.dateFrom).getTime())) errors.push('dateFrom must be a valid date');
  if (query.dateTo && isNaN(new Date(query.dateTo).getTime())) errors.push('dateTo must be a valid date');
  return errors;
};

// ─── ID ─────────────────────────────────────────────────────────────────────────

exports.validateId = (id) => {
  if (!id || (typeof id === 'string' && id.trim() === '')) return 'ID parameter is required';
  return null;
};
