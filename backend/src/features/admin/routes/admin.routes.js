const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// TODO: Implement auth middleware and validation
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.patch('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);
router.get('/stats', adminController.getSystemStats);

module.exports = router;
