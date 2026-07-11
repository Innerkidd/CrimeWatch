const crypto = require('crypto');

const ACCESS_SECRET = 'crimewatch-access-secret-k3y-2025';
const REFRESH_SECRET = 'crimewatch-refresh-secret-k3y-2025';
const ACCESS_EXPIRY = 3600;
const REFRESH_EXPIRY = 7 * 24 * 3600;

function base64url(str) {
  return Buffer.from(str).toString('base64url');
}

function decodeBase64url(str) {
  return Buffer.from(str, 'base64url').toString();
}

function signJWT(payload, secret, expiresIn) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const body = base64url(JSON.stringify({ ...payload, iat: now, exp: now + expiresIn }));
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expected = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const payload = JSON.parse(decodeBase64url(body));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

const JwtHelper = {
  generateAccessToken: (user) => {
    const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
    return signJWT(payload, ACCESS_SECRET, ACCESS_EXPIRY);
  },

  generateRefreshToken: (user) => {
    return signJWT({ id: user.id, type: 'refresh' }, REFRESH_SECRET, REFRESH_EXPIRY);
  },

  generateTokens: (user) => {
    const accessToken = JwtHelper.generateAccessToken(user);
    const refreshToken = JwtHelper.generateRefreshToken(user);
    return { accessToken, refreshToken, expiresIn: ACCESS_EXPIRY };
  },

  verifyAccessToken: (token) => {
    return verifyJWT(token, ACCESS_SECRET);
  },

  verifyRefreshToken: (token) => {
    return verifyJWT(token, REFRESH_SECRET);
  },

  extractToken,
  getTokenFromRequest: extractToken,

  decodeHeader: (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      return JSON.parse(decodeBase64url(parts[1]));
    } catch {
      return null;
    }
  },
};

module.exports = JwtHelper;
