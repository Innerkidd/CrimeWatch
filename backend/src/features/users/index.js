const usersController = require('./controllers/users.controller');
const usersRoutes = require('./routes/users.routes');
const usersService = require('./services/users.service');
const usersRepository = require('./repositories/users.repository');
const usersValidation = require('./validations/users.validation');
const UsersModel = require('./models/users.model');

module.exports = {
  usersController,
  usersRoutes,
  usersService,
  usersRepository,
  usersValidation,
  UsersModel,
};
