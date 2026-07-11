const LoggerService = require('../services/logger.service');

function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.requestId = requestId;

  res.on('finish', () => {
    const data = {
      requestId, method: req.method, url: req.originalUrl || req.url,
      status: res.statusCode, duration: `${Date.now() - start}ms`,
      ip: req.ip || req.connection?.remoteAddress || '-',
      userId: req.user?.id || '-', userAgent: req.headers['user-agent'] || '-',
    };
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    LoggerService[level](`${data.method} ${data.url} ${data.status} ${data.duration}`, data);
  });
  next();
}

module.exports = { requestLogger };
