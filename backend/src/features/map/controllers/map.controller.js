const service = require('../services/map.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── All Reports ────────────────────────────────────────────────────────────────

exports.getAllReports = async (req, res, next) => {
  await ok(() => service.getAllReports(req.query), req, res, next);
};

exports.getReportById = async (req, res, next) => {
  await ok(() => service.getReportById(req.params.id), req, res, next);
};

// ─── Markers ────────────────────────────────────────────────────────────────────

exports.getMarkers = async (req, res, next) => {
  await ok(() => service.getMarkers(req.query), req, res, next);
};

// ─── Nearby ─────────────────────────────────────────────────────────────────────

exports.getNearby = async (req, res, next) => {
  const { lat, lng, radius, category, status, severity } = req.query;
  await ok(() => service.getNearby(lat, lng, radius, { category, status, severity }), req, res, next);
};

// ─── Heatmap ────────────────────────────────────────────────────────────────────

exports.getHeatmap = async (req, res, next) => {
  const groupBy = req.query.groupBy || 'grid';
  await ok(() => service.getHeatmap(groupBy, req.query), req, res, next);
};

// ─── Clusters ───────────────────────────────────────────────────────────────────

exports.getClusters = async (req, res, next) => {
  const bounds = {};
  if (req.query.north) bounds.north = parseFloat(req.query.north);
  if (req.query.south) bounds.south = parseFloat(req.query.south);
  if (req.query.east) bounds.east = parseFloat(req.query.east);
  if (req.query.west) bounds.west = parseFloat(req.query.west);
  const hasBounds = bounds.north !== undefined && bounds.south !== undefined && bounds.east !== undefined && bounds.west !== undefined;
  await ok(() => service.getClusters(hasBounds ? bounds : null, req.query), req, res, next);
};

// ─── Search ─────────────────────────────────────────────────────────────────────

exports.search = async (req, res, next) => {
  const { q, category, status, city } = req.query;
  await ok(() => service.search(q, { category, status, city }), req, res, next);
};

// ─── Filters ────────────────────────────────────────────────────────────────────

exports.getFilters = async (req, res, next) => {
  await ok(() => service.getFilterOptions(), req, res, next);
};
