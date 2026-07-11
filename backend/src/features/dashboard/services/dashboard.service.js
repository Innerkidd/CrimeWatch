const repo = require('../repositories/dashboard.repository');

function parseNum(v, fallback) {
  const n = parseInt(v, 10);
  return isNaN(n) ? fallback : n;
}

function extractFilters(query) {
  const filters = {};
  if (query.city) filters.city = query.city;
  if (query.category) filters.category = query.category;
  if (query.status) filters.status = query.status;
  if (query.severity) filters.severity = query.severity;
  if (query.dateFrom) filters.dateFrom = query.dateFrom;
  if (query.dateTo) filters.dateTo = query.dateTo;
  return filters;
}

const Service = {
  // ─── 1. Overview ──────────────────────────────────────────────────────────────
  getOverview: async (query) => {
    return repo.getOverview(extractFilters(query));
  },

  // ─── 2. Crime Statistics ──────────────────────────────────────────────────────
  getCrimeStatistics: async (query) => {
    return repo.getCrimeStatistics(extractFilters(query));
  },

  // ─── 3. Charts ────────────────────────────────────────────────────────────────
  getCharts: async (query) => {
    const filters = extractFilters(query);
    const [monthlyTrend, dailyTrend, weeklyTrend, categoryDistribution, statusDistribution] = await Promise.all([
      repo.getMonthlyTrend(filters),
      repo.getDailyTrend(filters),
      repo.getWeeklyTrend(filters),
      repo.getCategoryDistribution(filters),
      repo.getStatusDistribution(filters),
    ]);
    return { monthlyTrend, dailyTrend, weeklyTrend, categoryDistribution, statusDistribution };
  },

  // ─── 4. Recent Activity ───────────────────────────────────────────────────────
  getRecentActivity: async (query) => {
    const limit = parseNum(query.limit, 10);
    return repo.getRecentActivity(limit, extractFilters(query));
  },

  // ─── 5. Heatmap Analytics ─────────────────────────────────────────────────────
  getHeatmapAnalytics: async (query) => {
    const filters = extractFilters(query);
    const limit = parseNum(query.topAreasLimit, 10);
    const gridSize = parseFloat(query.gridSize) || 0.1;
    const [topCrimeAreas, highRiskZones, crimeDensity] = await Promise.all([
      repo.getTopCrimeAreas(limit, filters),
      repo.getHighRiskZones(filters),
      repo.getCrimeDensity(gridSize, filters),
    ]);
    return { topCrimeAreas, highRiskZones, crimeDensity };
  },

  // ─── 6. Police Analytics ──────────────────────────────────────────────────────
  getPoliceAnalytics: async (query) => {
    return repo.getPoliceAnalytics(extractFilters(query));
  },

  // ─── 7. System Analytics ──────────────────────────────────────────────────────
  getSystemAnalytics: async () => {
    return repo.getSystemAnalytics();
  },
};

module.exports = Service;
