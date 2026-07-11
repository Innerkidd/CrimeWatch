const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// TODO: Implement auth middleware and validation
router.get('/profile', usersController.getProfile);
router.patch('/profile', usersController.updateProfile);
router.patch('/change-password', usersController.changePassword);
router.get('/my-reports', usersController.getMyReports);

module.exports = router;
