const { HTTP_STATUS } = require('../constants');

function sendSuccess(res, data = null, message = 'Success', statusCode = HTTP_STATUS.OK) {
  const response = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
}

function sendCreated(res, data = null, message = 'Created successfully') {
  return sendSuccess(res, data, message, HTTP_STATUS.CREATED);
}

function sendError(res, statusCode, errors, type = null) {
  const errorMessages = Array.isArray(errors) ? errors : [errors];
  const response = {
    success: false,
    errors: errorMessages,
  };
  if (type) response.type = type;
  return res.status(statusCode).json(response);
}

function sendPaginated(res, data, pagination, message = 'Success') {
  const response = {
    success: true,
    message,
    data,
    pagination,
  };
  return res.status(HTTP_STATUS.OK).json(response);
}

function sendNoContent(res) {
  return res.status(HTTP_STATUS.NO_CONTENT).end();
}

function sendAccepted(res, data = null, message = 'Accepted') {
  return sendSuccess(res, data, message, HTTP_STATUS.ACCEPTED);
}

const ResponseHelper = {
  success: sendSuccess,
  created: sendCreated,
  error: sendError,
  paginated: sendPaginated,
  noContent: sendNoContent,
  accepted: sendAccepted,
  sendSuccess,
  sendCreated,
  sendError,
  sendPaginated,
  sendNoContent,
  sendAccepted,
};

module.exports = ResponseHelper;
