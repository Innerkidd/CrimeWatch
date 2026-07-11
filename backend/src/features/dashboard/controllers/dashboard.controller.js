const service = require('../services/dashboard.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── Overview ───────────────────────────────────────────────────────────────────

exports.getOverview = async (req, res, next) => {
  await ok(() => service.getOverview(req.query), req, res, next);
};

// ─── Crime Statistics ───────────────────────────────────────────────────────────

exports.getCrimeStatistics = async (req, res, next) => {
  await ok(() => service.getCrimeStatistics(req.query), req, res, next);
};

// ─── Charts ─────────────────────────────────────────────────────────────────────

exports.getCharts = async (req, res, next) => {
  await ok(() => service.getCharts(req.query), req, res, next);
};

// ─── Recent Activity ────────────────────────────────────────────────────────────

exports.getRecentActivity = async (req, res, next) => {
  await ok(() => service.getRecentActivity(req.query), req, res, next);
};

// ─── Heatmap Analytics ──────────────────────────────────────────────────────────

exports.getHeatmapAnalytics = async (req, res, next) => {
  await ok(() => service.getHeatmapAnalytics(req.query), req, res, next);
};

// ─── Police Analytics ───────────────────────────────────────────────────────────

exports.getPoliceAnalytics = async (req, res, next) => {
  await ok(() => service.getPoliceAnalytics(req.query), req, res, next);
};

// ─── System Analytics ───────────────────────────────────────────────────────────

exports.getSystemAnalytics = async (req, res, next) => {
  await ok(() => service.getSystemAnalytics(), req, res, next);
};
