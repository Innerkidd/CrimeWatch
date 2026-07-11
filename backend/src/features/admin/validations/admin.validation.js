function validateRequired(value, fieldName) {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
}

function validateEmail(value) {
  if (!value) return null;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value) ? null : 'Invalid email format';
}

function validateStringLength(value, min, max, fieldName) {
  if (!value) return null;
  if (value.length < min || value.length > max) {
    return `${fieldName} must be between ${min} and ${max} characters`;
  }
  return null;
}

const VALID_REPORT_STATUSES = ['pending', 'investigating', 'closed'];
const VALID_USER_STATUSES = ['active', 'suspended'];
const VALID_OFFICER_STATUSES = ['active', 'inactive'];
const VALID_ROLES = ['citizen', 'police', 'admin'];

// ─── Generic validation builder ─────────────────────────────────────────────────

function validate(schema, data) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    for (const rule of rules) {
      const error = rule(value, data);
      if (error) {
        errors.push(error);
        break;
      }
    }
  }
  return errors;
}

// ─── Police Officer ─────────────────────────────────────────────────────────────

exports.validateCreateOfficer = (data) => {
  const schema = {
    name: [
      (v) => validateRequired(v, 'Name'),
      (v) => validateStringLength(v, 2, 100, 'Name'),
    ],
    badgeNumber: [(v) => validateRequired(v, 'Badge number')],
    email: [
      (v) => validateRequired(v, 'Email'),
      (v) => validateEmail(v),
    ],
    department: [(v) => validateRequired(v, 'Department')],
    rank: [(v) => validateRequired(v, 'Rank')],
  };
  return validate(schema, data);
};

exports.validateUpdateOfficer = (data) => {
  const errors = [];
  if (data.email && validateEmail(data.email)) errors.push(validateEmail(data.email));
  if (data.name && validateStringLength(data.name, 2, 100, 'Name')) errors.push(validateStringLength(data.name, 2, 100, 'Name'));
  if (data.status && !VALID_OFFICER_STATUSES.includes(data.status)) errors.push('Status must be "active" or "inactive"');
  return errors;
};

exports.validateOfficerStatus = (data) => {
  const errors = [];
  const err = validateRequired(data.status, 'Status');
  if (err) errors.push(err);
  else if (!VALID_OFFICER_STATUSES.includes(data.status)) errors.push('Status must be "active" or "inactive"');
  return errors;
};

// ─── Crime Category ─────────────────────────────────────────────────────────────

exports.validateCreateCategory = (data) => {
  const schema = {
    name: [
      (v) => validateRequired(v, 'Category name'),
      (v) => validateStringLength(v, 2, 100, 'Category name'),
    ],
  };
  return validate(schema, data);
};

exports.validateUpdateCategory = (data) => {
  const errors = [];
  if (data.name && validateStringLength(data.name, 2, 100, 'Category name')) errors.push(validateStringLength(data.name, 2, 100, 'Category name'));
  if (Object.keys(data).length === 0) errors.push('No fields to update');
  return errors;
};

// ─── Users ──────────────────────────────────────────────────────────────────────

exports.validateUserStatus = (data) => {
  const errors = [];
  const err = validateRequired(data.status, 'Status');
  if (err) errors.push(err);
  else if (!VALID_USER_STATUSES.includes(data.status)) errors.push('Status must be "active" or "suspended"');
  return errors;
};

// ─── Reports ────────────────────────────────────────────────────────────────────

exports.validateUpdateReport = (data) => {
  const errors = [];
  if (data.status && !VALID_REPORT_STATUSES.includes(data.status)) {
    errors.push('Status must be one of: pending, investigating, closed');
  }
  if (Object.keys(data).length === 0) errors.push('No fields to update');
  return errors;
};

exports.validateAssignPolice = (data) => {
  const errors = [];
  const err = validateRequired(data.officerId, 'Officer ID');
  if (err) errors.push(err);
  return errors;
};

// ─── Generic ────────────────────────────────────────────────────────────────────

exports.validateId = (id) => {
  if (!id || (typeof id === 'string' && id.trim() === '')) {
    return 'ID parameter is required';
  }
  return null;
};
