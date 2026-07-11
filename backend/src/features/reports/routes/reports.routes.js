const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');

// TODO: Implement auth middleware and validation
router.post('/', reportsController.createReport);
router.get('/', reportsController.getAllReports);
router.get('/nearby', reportsController.getReportsByLocation);
router.get('/:id', reportsController.getReportById);
router.patch('/:id', reportsController.updateReport);
router.delete('/:id', reportsController.deleteReport);

module.exports = router;
