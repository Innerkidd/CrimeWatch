const { HTTP_STATUS, ERROR_TYPES } = require('../constants');
const { sendError } = require('./response.helper');
const LoggerService = require('../services/logger.service');

function createAppError(statusCode, message, type, details = null) {
  const error = new Error(Array.isArray(message) ? message.join(', ') : message);
  error.statusCode = statusCode;
  error.type = type;
  error.details = details;
  error.isOperational = true;
  return error;
}

function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const type = err.type || ERROR_TYPES.INTERNAL;
  const messages = err.details || err.message || 'Internal server error';
  const isServerError = statusCode >= 500;

  if (isServerError) {
    LoggerService.error(`${err.message}`, {
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      userId: req.user?.id,
    });
  }

  if (err.name === 'ValidationError' || err.name === 'SyntaxError') {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, err.message, ERROR_TYPES.VALIDATION);
  }

  if (err.code === '23505') {
    return sendError(res, HTTP_STATUS.CONFLICT, 'Resource already exists', ERROR_TYPES.CONFLICT);
  }
  if (err.code === '23503') {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Referenced resource not found', ERROR_TYPES.VALIDATION);
  }
  if (err.code === '22P02') {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Invalid input format', ERROR_TYPES.VALIDATION);
  }

  if (err.type === 'entity.too.large') {
    return sendError(res, HTTP_STATUS.UNPROCESSABLE, 'Request entity too large', ERROR_TYPES.VALIDATION);
  }

  if (!err.isOperational || isServerError) {
    if (process.env.NODE_ENV !== 'production') {
      return sendError(res, statusCode, messages, type);
    }
    return sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error', ERROR_TYPES.INTERNAL);
  }

  return sendError(res, statusCode, messages, type);
}

function notFoundHandler(req, res, _next) {
  return sendError(res, HTTP_STATUS.NOT_FOUND, `Route ${req.method} ${req.originalUrl} not found`, ERROR_TYPES.NOT_FOUND);
}

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  createAppError,
};
