const repo = require('../repositories/map.repository');

function badRequest(msg) {
  const err = new Error(msg);
  err.statusCode = 400;
  throw err;
}

function notFound(msg) {
  const err = new Error(msg || 'Resource not found');
  err.statusCode = 404;
  throw err;
}

function parseNum(v, fallback) {
  const n = parseFloat(v);
  return isNaN(n) ? fallback : n;
}

const Service = {
  // ─── All Crime Reports ─────────────────────────────────────────────────────────
  getAllReports: async (filters) => {
    const data = await repo.findAll(filters);
    return data.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      severity: r.severity,
      location: r.location,
      city: r.city,
      district: r.district,
      state: r.state,
      status: r.status,
      reportedByName: r.reportedByName,
      assignedToName: r.assignedToName,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  },

  getReportById: async (reportId) => {
    const report = await repo.findById(reportId);
    if (!report) notFound('Crime report not found');
    return report;
  },

  // ─── Markers ────────────────────────────────────────────────────────────────────
  getMarkers: async (filters) => {
    return repo.findMarkers(filters);
  },

  // ─── Nearby ─────────────────────────────────────────────────────────────────────
  getNearby: async (lat, lng, radius, filters) => {
    const latNum = parseNum(lat, null);
    const lngNum = parseNum(lng, null);
    const radiusNum = parseNum(radius, 5);
    if (latNum === null || lngNum === null) badRequest('Valid lat and lng are required');
    if (radiusNum <= 0) badRequest('Radius must be greater than 0');
    const results = await repo.findNearby(latNum, lngNum, radiusNum, filters);
    return results.map((r) => ({
      ...r,
      distance: parseFloat(haversine(latNum, lngNum, r.location.lat, r.location.lng).toFixed(2)),
    }));
  },

  // ─── Heatmap ────────────────────────────────────────────────────────────────────
  getHeatmap: async (groupBy, filters) => {
    if (groupBy === 'city') return repo.getHeatmapByCity(filters);
    const gridSize = parseNum(filters.gridSize, 0.05);
    return repo.getHeatmapByGrid(gridSize, filters);
  },

  // ─── Clusters ───────────────────────────────────────────────────────────────────
  getClusters: async (bounds, filters) => {
    const gridSize = parseNum(filters.gridSize, 0.1);
    return repo.getClusters(bounds, gridSize, filters);
  },

  // ─── Search ─────────────────────────────────────────────────────────────────────
  search: async (query, filters) => {
    if (!query || (typeof query === 'string' && query.trim() === '')) badRequest('Search query is required');
    return repo.search(query, filters);
  },

  // ─── Filters ────────────────────────────────────────────────────────────────────
  getFilterOptions: async () => {
    return repo.getFilterOptions();
  },
};

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

module.exports = Service;
