const LoggerService = require('../services/logger.service');

function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.requestId = requestId;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection?.remoteAddress || '-',
      userId: req.user?.id || '-',
      userAgent: req.headers['user-agent'] || '-',
      referer: req.headers.referer || '-',
    };

    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    LoggerService[level](`${logData.method} ${logData.url} ${logData.status} ${logData.duration}`, logData);
  });

  next();
}

function requestLoggerCompact(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const line = `${req.method} ${req.originalUrl || req.url} ${res.statusCode} ${duration}ms`;
    if (res.statusCode >= 500) {
      console.error(`[REQ] ${line}`);
    } else if (res.statusCode >= 400) {
      console.warn(`[REQ] ${line}`);
    } else {
      console.log(`[REQ] ${line}`);
    }
  });
  next();
}

module.exports = { requestLogger, requestLoggerCompact };
