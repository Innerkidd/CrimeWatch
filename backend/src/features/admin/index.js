const adminController = require('./controllers/admin.controller');
const adminRoutes = require('./routes/admin.routes');
const adminService = require('./services/admin.service');
const adminRepository = require('./repositories/admin.repository');
const adminValidation = require('./validations/admin.validation');
const AdminModel = require('./models/admin.model');

module.exports = {
  adminController,
  adminRoutes,
  adminService,
  adminRepository,
  adminValidation,
  AdminModel,
};
