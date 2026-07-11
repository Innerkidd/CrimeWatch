const { HTTP_STATUS } = require('../constants');

function corsMiddleware(options = {}) {
  const allowedOrigins = options.allowedOrigins || getDefaultOrigins();
  const allowedMethods = options.allowedMethods || ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
  const allowedHeaders = options.allowedHeaders || ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'];
  const exposedHeaders = options.exposedHeaders || ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'];
  const maxAge = options.maxAge || 86400;
  const credentials = options.credentials !== false;
  const originSet = new Set(allowedOrigins.map((o) => o.toLowerCase()));

  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      const lower = origin.toLowerCase();
      if (originSet.has('*')) res.setHeader('Access-Control-Allow-Origin', '*');
      else if (originSet.has(lower)) res.setHeader('Access-Control-Allow-Origin', origin);
      else {
        const matched = [...originSet].some((a) => a.startsWith('*.') && lower.endsWith(a.slice(1)));
        if (matched) res.setHeader('Access-Control-Allow-Origin', origin);
      }
    }
    if (credentials) res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
    res.setHeader('Access-Control-Expose-Headers', exposedHeaders.join(', '));
    res.setHeader('Access-Control-Max-Age', maxAge.toString());
    if (req.method === 'OPTIONS') return res.status(HTTP_STATUS.NO_CONTENT).end();
    next();
  };
}

function getDefaultOrigins() {
  if (process.env.CORS_ORIGINS) return process.env.CORS_ORIGINS.split(',').map((o) => o.trim());
  return ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'];
}

module.exports = corsMiddleware;
