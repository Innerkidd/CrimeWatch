const mapController = require('./controllers/map.controller');
const mapRoutes = require('./routes/map.routes');
const mapService = require('./services/map.service');
const mapRepository = require('./repositories/map.repository');
const mapValidation = require('./validations/map.validation');
const MapModel = require('./models/map.model');

module.exports = {
  mapController,
  mapRoutes,
  mapService,
  mapRepository,
  mapValidation,
  MapModel,
};
