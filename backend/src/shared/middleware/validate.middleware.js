const { HTTP_STATUS } = require('../constants');
const { sendError } = require('./response.helper');

function body(validationFn) {
  return (req, res, next) => {
    const errors = validationFn(req.body);
    if (errors.length > 0) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, errors, 'ValidationError');
    }
    next();
  };
}

function query(validationFn) {
  return (req, res, next) => {
    const errors = validationFn(req.query);
    if (errors.length > 0) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, errors, 'ValidationError');
    }
    next();
  };
}

function param(validationFn, name) {
  return (req, res, next) => {
    const error = validationFn(req.params[name]);
    if (error) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, [error], 'ValidationError');
    }
    next();
  };
}

function validate(schema) {
  return (req, res, next) => {
    const errors = [];
    if (schema.body) {
      const bodyErrors = schema.body(req.body);
      if (bodyErrors.length > 0) errors.push(...bodyErrors);
    }
    if (schema.query) {
      const queryErrors = schema.query(req.query);
      if (queryErrors.length > 0) errors.push(...queryErrors);
    }
    if (schema.params) {
      for (const [key, fn] of Object.entries(schema.params)) {
        const error = fn(req.params[key]);
        if (error) errors.push(error);
      }
    }
    if (errors.length > 0) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, errors, 'ValidationError');
    }
    next();
  };
}

module.exports = {
  body,
  query,
  param,
  validate,
};
