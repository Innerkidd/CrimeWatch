const crypto = require('crypto');
const repo = require('../repositories/auth.repository');

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

function badRequest(msg) {
  const err = new Error(msg);
  err.statusCode = 400;
  throw err;
}

function unauthorized(msg) {
  const err = new Error(msg || 'Unauthorized');
  err.statusCode = 401;
  throw err;
}

function forbidden(msg) {
  const err = new Error(msg || 'Forbidden');
  err.statusCode = 403;
  throw err;
}

const Service = {
  // ─── Token Helpers ─────────────────────────────────────────────────────────────
  generateTokens: (user) => {
    const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
    const accessToken = signJWT(payload, ACCESS_SECRET, ACCESS_EXPIRY);
    const refreshToken = signJWT({ id: user.id, type: 'refresh' }, REFRESH_SECRET, REFRESH_EXPIRY);
    return { accessToken, refreshToken, expiresIn: ACCESS_EXPIRY };
  },

  verifyAccessToken: (token) => {
    return verifyJWT(token, ACCESS_SECRET);
  },

  verifyRefreshToken: (token) => {
    return verifyJWT(token, REFRESH_SECRET);
  },

  // ─── Register ──────────────────────────────────────────────────────────────────
  register: async (userData) => {
    const { name, email, password, role } = userData;
    if (!name || !email || !password) badRequest('Name, email, and password are required');
    const exists = await repo.isEmailTaken(email);
    if (exists) {
      const err = new Error('Email already registered');
      err.statusCode = 409;
      throw err;
    }
    const user = await repo.createUser({ name, email, password, role: role || 'citizen' });
    const tokens = Service.generateTokens(user);
    await repo.updateRefreshToken(user.id, tokens.refreshToken);
    return { user, ...tokens };
  },

  // ─── Login ─────────────────────────────────────────────────────────────────────
  login: async (credentials) => {
    const { email, password } = credentials;
    if (!email || !password) badRequest('Email and password are required');
    const user = await repo.findUserByEmail(email);
    if (!user) unauthorized('Invalid email or password');
    if (user.status === 'suspended') forbidden('Account is suspended. Contact an administrator.');
    const valid = repo.verifyPassword(password, user.password);
    if (!valid) unauthorized('Invalid email or password');
    const tokens = Service.generateTokens(user);
    await repo.updateRefreshToken(user.id, tokens.refreshToken);
    const { password: _, refreshToken: _r, ...safeUser } = user;
    return { user: safeUser, ...tokens };
  },

  // ─── Logout ────────────────────────────────────────────────────────────────────
  logout: async (userId) => {
    await repo.revokeRefreshToken(userId);
    return { message: 'Logged out successfully' };
  },

  // ─── Refresh Token ─────────────────────────────────────────────────────────────
  refreshToken: async (refreshToken) => {
    if (!refreshToken) badRequest('Refresh token is required');
    const payload = Service.verifyRefreshToken(refreshToken);
    if (!payload) unauthorized('Invalid or expired refresh token');
    const user = await repo.findUserById(payload.id);
    if (!user) unauthorized('User not found');
    if (user.status === 'suspended') forbidden('Account is suspended');
    if (user.refreshToken !== refreshToken) unauthorized('Refresh token has been revoked');
    const tokens = Service.generateTokens(user);
    await repo.updateRefreshToken(user.id, tokens.refreshToken);
    const { password: _, refreshToken: _r, ...safeUser } = user;
    return { user: safeUser, ...tokens };
  },

  // ─── Forgot Password ───────────────────────────────────────────────────────────
  forgotPassword: async (email) => {
    if (!email) badRequest('Email is required');
    const user = await repo.findUserByEmail(email);
    if (!user) return { message: 'If the email is registered, a reset link has been sent.' };
    const resetEntry = await repo.createResetToken(user.id);
    return { message: 'If the email is registered, a reset link has been sent.', resetToken: resetEntry.token };
  },

  // ─── Reset Password ────────────────────────────────────────────────────────────
  resetPassword: async (token, newPassword) => {
    if (!token || !newPassword) badRequest('Token and new password are required');
    if (newPassword.length < 6) badRequest('Password must be at least 6 characters');
    const resetEntry = await repo.findResetToken(token);
    if (!resetEntry) badRequest('Invalid or expired reset token');
    await repo.updatePassword(resetEntry.userId, newPassword);
    await repo.markResetTokenUsed(resetEntry.id);
    return { message: 'Password reset successfully' };
  },

  // ─── Profile ───────────────────────────────────────────────────────────────────
  getProfile: async (userId) => {
    const user = await repo.findUserByIdSafe(userId);
    if (!user) unauthorized('User not found');
    return user;
  },
};

module.exports = Service;
