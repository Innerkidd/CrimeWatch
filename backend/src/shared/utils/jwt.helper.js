const crypto = require('crypto');

const ACCESS_SECRET = 'crimewatch-access-secret-k3y-2025';
const REFRESH_SECRET = 'crimewatch-refresh-secret-k3y-2025';
const ACCESS_EXPIRY = 3600;
const REFRESH_EXPIRY = 7 * 24 * 3600;

function b64(s) { return Buffer.from(s).toString('base64url'); }
function d64(s) { return Buffer.from(s, 'base64url').toString(); }

function sign(payload, secret, expiresIn) {
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const body = b64(JSON.stringify({ ...payload, iat: now, exp: now + expiresIn }));
  const sig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function verify(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [h, b, sig] = parts;
    const expected = crypto.createHmac('sha256', secret).update(`${h}.${b}`).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const payload = JSON.parse(d64(b));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

const JwtHelper = {
  generateAccessToken: (user) => sign({ id: user.id, email: user.email, role: user.role, name: user.name }, ACCESS_SECRET, ACCESS_EXPIRY),
  generateRefreshToken: (user) => sign({ id: user.id, type: 'refresh' }, REFRESH_SECRET, REFRESH_EXPIRY),
  generateTokens: (user) => ({
    accessToken: JwtHelper.generateAccessToken(user),
    refreshToken: JwtHelper.generateRefreshToken(user),
    expiresIn: ACCESS_EXPIRY,
  }),
  verifyAccessToken: (token) => verify(token, ACCESS_SECRET),
  verifyRefreshToken: (token) => verify(token, REFRESH_SECRET),
  extractToken: (req) => {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer ')) return null;
    return h.split(' ')[1];
  },
};

module.exports = JwtHelper;
