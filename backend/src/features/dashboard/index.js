const dashboardController = require('./controllers/dashboard.controller');
const dashboardRoutes = require('./routes/dashboard.routes');
const dashboardService = require('./services/dashboard.service');
const dashboardRepository = require('./repositories/dashboard.repository');
const dashboardValidation = require('./validations/dashboard.validation');
const DashboardModel = require('./models/dashboard.model');

module.exports = {
  dashboardController,
  dashboardRoutes,
  dashboardService,
  dashboardRepository,
  dashboardValidation,
  DashboardModel,
};
