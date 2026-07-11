const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let idCounter = 100;
const generateId = () => String(idCounter++);

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${key}`;
}

function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  const hash = scryptSync(password, salt, 64).toString('hex');
  if (hash.length !== key.length) return false;
  return timingSafeEqual(Buffer.from(hash), Buffer.from(key));
}

const seededPassword = hashPassword('password123');

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', password: seededPassword, role: 'citizen', status: 'active', refreshToken: null, createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-01-15') },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', password: seededPassword, role: 'citizen', status: 'active', refreshToken: null, createdAt: new Date('2025-02-01'), updatedAt: new Date('2025-02-01') },
  { id: '3', name: 'Officer Jane Doe', email: 'jane.doe@police.gov', password: seededPassword, role: 'police', status: 'active', refreshToken: null, createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-20') },
  { id: '4', name: 'Officer John Roe', email: 'john.roe@police.gov', password: seededPassword, role: 'police', status: 'active', refreshToken: null, createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-03-01') },
  { id: '5', name: 'Admin User', email: 'admin@crimewatch.com', password: seededPassword, role: 'admin', status: 'active', refreshToken: null, createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '6', name: 'Charlie Brown', email: 'charlie@example.com', password: seededPassword, role: 'citizen', status: 'suspended', refreshToken: null, createdAt: new Date('2025-02-15'), updatedAt: new Date('2025-03-01') },
];

const resetTokens = [];

function sanitizeUser(user) {
  if (!user) return null;
  const { password, refreshToken, ...safe } = user;
  return safe;
}

const Repository = {
  // ─── Password Helpers ──────────────────────────────────────────────────────────
  hashPassword: (password) => hashPassword(password),
  verifyPassword: (password, stored) => verifyPassword(password, stored),

  // ─── User CRUD ─────────────────────────────────────────────────────────────────
  createUser: async (userData) => {
    await sleep(8);
    const hashed = hashPassword(userData.password);
    const user = {
      id: generateId(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: hashed,
      role: userData.role || 'citizen',
      status: 'active',
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(user);
    return sanitizeUser(user);
  },

  findUserByEmail: async (email) => {
    await sleep(5);
    return users.find((u) => u.email === email.toLowerCase()) || null;
  },

  findUserById: async (userId) => {
    await sleep(5);
    return users.find((u) => u.id === userId) || null;
  },

  findUserByIdSafe: async (userId) => {
    await sleep(5);
    return sanitizeUser(users.find((u) => u.id === userId));
  },

  updateUser: async (userId, updates) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    Object.assign(user, updates, { updatedAt: new Date() });
    return sanitizeUser(user);
  },

  updateRefreshToken: async (userId, refreshToken) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.refreshToken = refreshToken;
    user.updatedAt = new Date();
    return sanitizeUser(user);
  },

  revokeRefreshToken: async (userId) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.refreshToken = null;
    user.updatedAt = new Date();
    return sanitizeUser(user);
  },

  // ─── Password Reset ────────────────────────────────────────────────────────────
  createResetToken: async (userId) => {
    await sleep(5);
    const token = randomBytes(32).toString('hex');
    const entry = {
      id: generateId(),
      userId,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      used: false,
      createdAt: new Date(),
    };
    resetTokens.push(entry);
    return entry;
  },

  findResetToken: async (token) => {
    await sleep(5);
    return resetTokens.find((t) => t.token === token && !t.used && t.expiresAt > new Date()) || null;
  },

  markResetTokenUsed: async (tokenId) => {
    await sleep(5);
    const entry = resetTokens.find((t) => t.id === tokenId);
    if (!entry) return false;
    entry.used = true;
    return true;
  },

  updatePassword: async (userId, newPassword) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.password = hashPassword(newPassword);
    user.refreshToken = null;
    user.updatedAt = new Date();
    return sanitizeUser(user);
  },

  // ─── Check ─────────────────────────────────────────────────────────────────────
  isEmailTaken: async (email) => {
    await sleep(3);
    return users.some((u) => u.email === email.toLowerCase());
  },
};

module.exports = Repository;
