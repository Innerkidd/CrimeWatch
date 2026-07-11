const { RATE_LIMITS, HTTP_STATUS } = require('../constants');
const { sendError } = require('./response.helper');

const stores = new Map();

function createStore(windowMs) {
  const hits = new Map();
  const interval = setInterval(() => {
    const now = Date.now();
    for (const [key, expiry] of hits.entries()) {
      if (expiry < now) hits.delete(key);
    }
  }, windowMs);
  if (interval.unref) interval.unref();
  return { hits, interval };
}

function rateLimiter(options = {}) {
  const config = {
    windowMs: options.windowMs || RATE_LIMITS.GENERAL.windowMs,
    max: options.max || RATE_LIMITS.GENERAL.max,
    message: options.message || 'Too many requests, please try again later',
    keyGenerator: options.keyGenerator || ((req) => req.ip || req.connection?.remoteAddress || 'unknown'),
  };

  const store = createStore(config.windowMs);

  return (req, res, next) => {
    const key = config.keyGenerator(req);
    const now = Date.now();
    const record = store.hits.get(key);

    if (!record || record.expiry < now) {
      store.hits.set(key, { count: 1, expiry: now + config.windowMs, start: now });
      res.setHeader('X-RateLimit-Limit', config.max);
      res.setHeader('X-RateLimit-Remaining', config.max - 1);
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + config.windowMs) / 1000));
      return next();
    }

    record.count += 1;
    res.setHeader('X-RateLimit-Limit', config.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, config.max - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.expiry / 1000));

    if (record.count > config.max) {
      const retryAfter = Math.ceil((record.expiry - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return sendError(res, HTTP_STATUS.TOO_MANY_REQUESTS, config.message, 'RateLimitError');
    }

    next();
  };
}

const rateLimiters = Object.freeze({
  login: rateLimiter({ windowMs: RATE_LIMITS.LOGIN.windowMs, max: RATE_LIMITS.LOGIN.max, message: 'Too many login attempts. Try again in 15 minutes.' }),
  register: rateLimiter({ windowMs: RATE_LIMITS.REGISTER.windowMs, max: RATE_LIMITS.REGISTER.max, message: 'Too many registration attempts. Try again in 1 hour.' }),
  reportCreate: rateLimiter({ windowMs: RATE_LIMITS.REPORT_CREATE.windowMs, max: RATE_LIMITS.REPORT_CREATE.max, message: 'Too many reports. Try again in 1 hour.' }),
  notification: rateLimiter({ windowMs: RATE_LIMITS.NOTIFICATION.windowMs, max: RATE_LIMITS.NOTIFICATION.max, message: 'Too many requests. Slow down.' }),
  admin: rateLimiter({ windowMs: RATE_LIMITS.ADMIN.windowMs, max: RATE_LIMITS.ADMIN.max }),
  general: rateLimiter(),
});

module.exports = { rateLimiter, rateLimiters };
