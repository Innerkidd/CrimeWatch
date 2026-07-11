const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboard.controller');
const validate = require('../validations/dashboard.validation');

function query(fn) {
  return (req, res, next) => {
    const errors = fn(req.query);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });
    next();
  };
}

// ─── Overview ───────────────────────────────────────────────────────────────────

router.get('/overview', query(validate.validateDashboardQuery), ctrl.getOverview);

// ─── Crime Statistics ───────────────────────────────────────────────────────────

router.get('/statistics', query(validate.validateDashboardQuery), ctrl.getCrimeStatistics);

// ─── Charts ─────────────────────────────────────────────────────────────────────

router.get('/charts', query(validate.validateDashboardQuery), ctrl.getCharts);

// ─── Recent Activity ────────────────────────────────────────────────────────────

router.get('/activity', query(validate.validateDashboardQuery), ctrl.getRecentActivity);

// ─── Heatmap Analytics ──────────────────────────────────────────────────────────

router.get('/heatmap', query(validate.validateDashboardQuery), ctrl.getHeatmapAnalytics);

// ─── Police Analytics ───────────────────────────────────────────────────────────

router.get('/police', query(validate.validateDashboardQuery), ctrl.getPoliceAnalytics);

// ─── System Analytics ───────────────────────────────────────────────────────────

router.get('/system', ctrl.getSystemAnalytics);

// ─── Root (all-in-one) ─────────────────────────────────────────────────────────

router.get('/', query(validate.validateDashboardQuery), ctrl.getOverview);

module.exports = router;
