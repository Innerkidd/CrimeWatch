const notificationsController = require('./controllers/notifications.controller');
const notificationsRoutes = require('./routes/notifications.routes');
const notificationsService = require('./services/notifications.service');
const notificationsRepository = require('./repositories/notifications.repository');
const notificationsValidation = require('./validations/notifications.validation');
const NotificationsModel = require('./models/notifications.model');

module.exports = {
  notificationsController,
  notificationsRoutes,
  notificationsService,
  notificationsRepository,
  notificationsValidation,
  NotificationsModel,
};
