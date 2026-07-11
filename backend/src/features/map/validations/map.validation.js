function isLat(v) {
  const n = parseFloat(v);
  if (isNaN(n)) return 'lat must be a valid number';
  if (n < -90 || n > 90) return 'lat must be between -90 and 90';
  return null;
}

function isLng(v) {
  const n = parseFloat(v);
  if (isNaN(n)) return 'lng must be a valid number';
  if (n < -180 || n > 180) return 'lng must be between -180 and 180';
  return null;
}

function isPositiveNum(v, name) {
  const n = parseFloat(v);
  if (isNaN(n) || n <= 0) return `${name} must be a positive number`;
  return null;
}

function isOptionalNum(v) {
  if (v === undefined || v === null || v === '') return null;
  if (isNaN(parseFloat(v))) return 'must be a valid number';
  return null;
}

function validate(schema, data) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const err = rule(data[field]);
      if (err) { errors.push(err); break; }
    }
  }
  return errors;
}

// ─── Nearby ─────────────────────────────────────────────────────────────────────

exports.validateNearby = (query) => {
  return validate({
    lat: [(v) => { if (v === undefined || v === '') return 'lat is required'; return isLat(v); }],
    lng: [(v) => { if (v === undefined || v === '') return 'lng is required'; return isLng(v); }],
    radius: [(v) => { if (v !== undefined && v !== '') return isPositiveNum(v, 'radius'); return null; }],
  }, query);
};

// ─── Heatmap ────────────────────────────────────────────────────────────────────

exports.validateHeatmap = (query) => {
  const errors = [];
  if (query.groupBy && !['city', 'grid'].includes(query.groupBy)) {
    errors.push('groupBy must be "city" or "grid"');
  }
  if (query.gridSize) {
    const err = isPositiveNum(query.gridSize, 'gridSize');
    if (err) errors.push(err);
  }
  return errors;
};

// ─── Clusters ───────────────────────────────────────────────────────────────────

exports.validateClusters = (query) => {
  const errors = [];
  const hasAny = ['north', 'south', 'east', 'west'].some((k) => query[k] !== undefined && query[k] !== '');
  if (hasAny) {
    const allProvided = ['north', 'south', 'east', 'west'].every((k) => query[k] !== undefined && query[k] !== '');
    if (!allProvided) {
      errors.push('All bounds (north, south, east, west) must be provided together');
    } else {
      const n = parseFloat(query.north);
      const s = parseFloat(query.south);
      const e = parseFloat(query.east);
      const w = parseFloat(query.west);
      if (isNaN(n)) errors.push('north must be a valid number');
      if (isNaN(s)) errors.push('south must be a valid number');
      if (isNaN(e)) errors.push('east must be a valid number');
      if (isNaN(w)) errors.push('west must be a valid number');
      if (!isNaN(n) && !isNaN(s) && n < s) errors.push('north must be greater than south');
      if (!isNaN(e) && !isNaN(w) && e < w) errors.push('east must be greater than west');
    }
  }
  if (query.gridSize) {
    const err = isPositiveNum(query.gridSize, 'gridSize');
    if (err) errors.push(err);
  }
  return errors;
};

// ─── Search ─────────────────────────────────────────────────────────────────────

exports.validateSearch = (query) => {
  const errors = [];
  if (!query.q || (typeof query.q === 'string' && query.q.trim() === '')) {
    errors.push('Search query "q" is required');
  }
  return errors;
};

// ─── ID param ───────────────────────────────────────────────────────────────────

exports.validateId = (id) => {
  if (!id || (typeof id === 'string' && id.trim() === '')) return 'ID parameter is required';
  return null;
};
