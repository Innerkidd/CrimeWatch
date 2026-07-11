const { HTTP_STATUS } = require('../constants');

function sendSuccess(res, data = null, message = 'Success', statusCode = HTTP_STATUS.OK) {
  return res.status(statusCode).json({ success: true, message, data });
}

function sendCreated(res, data = null, message = 'Created successfully') {
  return sendSuccess(res, data, message, HTTP_STATUS.CREATED);
}

function sendError(res, statusCode, errors, type = null) {
  const response = { success: false, errors: Array.isArray(errors) ? errors : [errors] };
  if (type) response.type = type;
  return res.status(statusCode).json(response);
}

function sendPaginated(res, data, pagination, message = 'Success') {
  return res.status(HTTP_STATUS.OK).json({ success: true, message, data, pagination });
}

function sendNoContent(res) {
  return res.status(HTTP_STATUS.NO_CONTENT).end();
}

module.exports = {
  success: sendSuccess, created: sendCreated, error: sendError,
  paginated: sendPaginated, noContent: sendNoContent,
  sendSuccess, sendCreated, sendError, sendPaginated, sendNoContent,
};
