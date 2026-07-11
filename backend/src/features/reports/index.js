const reportsController = require('./controllers/reports.controller');
const reportsRoutes = require('./routes/reports.routes');
const reportsService = require('./services/reports.service');
const reportsRepository = require('./repositories/reports.repository');
const reportsValidation = require('./validations/reports.validation');
const ReportsModel = require('./models/reports.model');

module.exports = {
  reportsController,
  reportsRoutes,
  reportsService,
  reportsRepository,
  reportsValidation,
  ReportsModel,
};
