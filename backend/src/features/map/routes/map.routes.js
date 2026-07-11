const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');

// TODO: Implement auth middleware and validation
router.get('/heatmap', mapController.getHeatmapData);
router.get('/clusters', mapController.getCrimeClusters);
router.get('/filters', mapController.getMapFilters);
router.get('/nearby', mapController.getNearbyReports);

module.exports = router;
