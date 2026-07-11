const authMiddleware = require('./auth.middleware');
const validateMiddleware = require('./validate.middleware');
const errorMiddleware = require('./error.middleware');
const rateLimiterMiddleware = require('./rateLimiter.middleware');
const loggerMiddleware = require('./logger.middleware');
const corsMiddleware = require('./cors.middleware');
const uploadMiddleware = require('./upload.middleware');
const responseHelper = require('./response.helper');

module.exports = {
  auth: authMiddleware,
  validate: validateMiddleware,
  error: errorMiddleware,
  rateLimiter: rateLimiterMiddleware,
  logger: loggerMiddleware,
  cors: corsMiddleware,
  upload: uploadMiddleware,
  response: responseHelper,
};
