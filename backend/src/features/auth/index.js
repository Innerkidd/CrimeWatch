const authController = require('./controllers/auth.controller');
const authRoutes = require('./routes/auth.routes');
const authService = require('./services/auth.service');
const authRepository = require('./repositories/auth.repository');
const authValidation = require('./validations/auth.validation');
const AuthModel = require('./models/auth.model');

module.exports = {
  authController,
  authRoutes,
  authService,
  authRepository,
  authValidation,
  AuthModel,
};
