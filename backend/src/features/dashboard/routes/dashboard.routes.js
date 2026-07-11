const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// TODO: Implement auth middleware and validation
router.get('/stats', dashboardController.getDashboardStats);
router.get('/recent-activity', dashboardController.getRecentActivity);
router.get('/crime-trends', dashboardController.getCrimeTrends);
router.get('/analytics', dashboardController.getReportAnalytics);

module.exports = router;
