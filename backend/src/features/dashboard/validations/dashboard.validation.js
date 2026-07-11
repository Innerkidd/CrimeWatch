const VALID_CATEGORIES = ['Theft', 'Assault', 'Robbery', 'Cyber Crime', 'Missing Person', 'Accident', 'Drug Related', 'Other'];
const VALID_STATUSES = ['pending', 'investigating', 'resolved', 'rejected'];
const VALID_SEVERITIES = ['low', 'medium', 'high', 'critical'];
const VALID_CITIES = ['New York', 'Los Angeles', 'Chicago'];

function isOptionalString(v) {
  if (v !== undefined && typeof v !== 'string') return 'must be a string';
  return null;
}

function isOptionalDate(v, name) {
  if (!v) return null;
  const d = new Date(v);
  if (isNaN(d.getTime())) return `${name} must be a valid date`;
  return null;
}

function isOptionalPositiveInt(v, name) {
  if (v === undefined || v === '') return null;
  const n = parseInt(v, 10);
  if (isNaN(n) || n < 1) return `${name} must be a positive integer`;
  return null;
}

function isOptionalPositiveFloat(v, name) {
  if (v === undefined || v === '') return null;
  const n = parseFloat(v);
  if (isNaN(n) || n <= 0) return `${name} must be a positive number`;
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

// ─── Dashboard Filters ──────────────────────────────────────────────────────────

exports.validateDashboardQuery = (query) => {
  const errors = [];
  if (query.category && !VALID_CATEGORIES.includes(query.category)) {
    errors.push(`category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }
  if (query.status && !VALID_STATUSES.includes(query.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  if (query.severity && !VALID_SEVERITIES.includes(query.severity)) {
    errors.push(`severity must be one of: ${VALID_SEVERITIES.join(', ')}`);
  }
  if (query.city && !VALID_CITIES.includes(query.city)) {
    errors.push(`city must be one of: ${VALID_CITIES.join(', ')}`);
  }
  const dateErrFrom = isOptionalDate(query.dateFrom, 'dateFrom');
  if (dateErrFrom) errors.push(dateErrFrom);
  const dateErrTo = isOptionalDate(query.dateTo, 'dateTo');
  if (dateErrTo) errors.push(dateErrTo);
  if (query.limit) {
    const err = isOptionalPositiveInt(query.limit, 'limit');
    if (err) errors.push(err);
  }
  if (query.topAreasLimit) {
    const err = isOptionalPositiveInt(query.topAreasLimit, 'topAreasLimit');
    if (err) errors.push(err);
  }
  if (query.gridSize) {
    const err = isOptionalPositiveFloat(query.gridSize, 'gridSize');
    if (err) errors.push(err);
  }
  return errors;
};
