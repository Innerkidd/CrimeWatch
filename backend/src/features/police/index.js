const policeController = require('./controllers/police.controller');
const policeRoutes = require('./routes/police.routes');
const policeService = require('./services/police.service');
const policeRepository = require('./repositories/police.repository');
const policeValidation = require('./validations/police.validation');
const PoliceModel = require('./models/police.model');

module.exports = {
  policeController,
  policeRoutes,
  policeService,
  policeRepository,
  policeValidation,
  PoliceModel,
};
