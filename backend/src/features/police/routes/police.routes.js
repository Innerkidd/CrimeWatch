const express = require('express');
const router = express.Router();
const policeController = require('../controllers/police.controller');

// TODO: Implement auth middleware and validation
router.get('/officers', policeController.getAllOfficers);
router.get('/officers/:id', policeController.getOfficerById);
router.post('/reports/:id/assign', policeController.assignReport);
router.patch('/reports/:id/status', policeController.updateReportStatus);

module.exports = router;
