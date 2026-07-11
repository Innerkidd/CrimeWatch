const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

const seededPass = hashPassword('password123');

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1-555-1001', password: seededPass, avatar: '', address: '123 Park Ave', city: 'New York', state: 'NY', pincode: '10001', role: 'citizen', status: 'active', createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-01-15') },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', phone: '+1-555-1002', password: seededPass, avatar: '', address: '456 Oak St', city: 'New York', state: 'NY', pincode: '10002', role: 'citizen', status: 'active', createdAt: new Date('2025-02-01'), updatedAt: new Date('2025-02-01') },
  { id: '3', name: 'Officer Jane Doe', email: 'jane.doe@police.gov', phone: '+1-555-2001', password: seededPass, avatar: '', address: '1 Police Plaza', city: 'New York', state: 'NY', pincode: '10038', role: 'police', status: 'active', createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-06-10') },
  { id: '4', name: 'Officer John Roe', email: 'john.roe@police.gov', phone: '+1-555-2002', password: seededPass, avatar: '', address: '2 Police Plaza', city: 'New York', state: 'NY', pincode: '10038', role: 'police', status: 'active', createdAt: new Date('2025-03-01'), updatedAt: new Date('2025-06-11') },
  { id: '5', name: 'Admin User', email: 'admin@crimewatch.com', phone: '+1-555-3001', password: seededPass, avatar: '', address: '100 Admin Blvd', city: 'New York', state: 'NY', pincode: '10001', role: 'admin', status: 'active', createdAt: new Date('2025-01-01'), updatedAt: new Date('2025-01-01') },
  { id: '6', name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1-555-1003', password: seededPass, avatar: '', address: '789 Pine Rd', city: 'Los Angeles', state: 'CA', pincode: '90001', role: 'citizen', status: 'suspended', createdAt: new Date('2025-02-15'), updatedAt: new Date('2025-03-01') },
  { id: '7', name: 'Officer Sarah Miles', email: 'sarah.miles@police.gov', phone: '+1-555-2003', password: seededPass, avatar: '', address: '100 LAPD Way', city: 'Los Angeles', state: 'CA', pincode: '90012', role: 'police', status: 'active', createdAt: new Date('2025-02-10'), updatedAt: new Date('2025-06-09') },
  { id: '8', name: 'Diana Prince', email: 'diana@example.com', phone: '+1-555-1004', password: seededPass, avatar: '', address: '321 Elm St', city: 'Chicago', state: 'IL', pincode: '60601', role: 'citizen', status: 'active', createdAt: new Date('2025-04-10'), updatedAt: new Date('2025-04-10') },
  { id: '9', name: 'Evan Wright', email: 'evan@example.com', phone: '+1-555-1005', password: seededPass, avatar: '', address: '654 Maple Ave', city: 'Chicago', state: 'IL', pincode: '60602', role: 'citizen', status: 'active', createdAt: new Date('2025-05-01'), updatedAt: new Date('2025-05-01') },
  { id: '10', name: 'Officer Mike Torres', email: 'mike.torres@police.gov', phone: '+1-555-2004', password: seededPass, avatar: '', address: '3 Police Plaza', city: 'New York', state: 'NY', pincode: '10038', role: 'police', status: 'inactive', createdAt: new Date('2025-04-01'), updatedAt: new Date('2025-05-15') },
];

function safeUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

function applySearch(data, query) {
  if (!query) return data;
  let result = [...data];
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter((u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.includes(q)) ||
      (u.city && u.city.toLowerCase().includes(q))
    );
  }
  if (query.name) result = result.filter((u) => u.name.toLowerCase().includes(query.name.toLowerCase()));
  if (query.email) result = result.filter((u) => u.email.toLowerCase() === query.email.toLowerCase());
  if (query.phone) result = result.filter((u) => u.phone && u.phone.includes(query.phone));
  if (query.city) result = result.filter((u) => u.city && u.city.toLowerCase() === query.city.toLowerCase());
  if (query.status) result = result.filter((u) => u.status === query.status);
  if (query.role) result = result.filter((u) => u.role === query.role);
  if (query.dateFrom) result = result.filter((u) => u.createdAt >= new Date(query.dateFrom));
  if (query.dateTo) result = result.filter((u) => u.createdAt <= new Date(query.dateTo));
  return result;
}

const Repository = {
  // ─── Password ──────────────────────────────────────────────────────────────────
  hashPassword: (password) => hashPassword(password),
  verifyPassword: (password, stored) => verifyPassword(password, stored),

  // ─── Profile ───────────────────────────────────────────────────────────────────
  findProfileById: async (userId) => {
    await sleep(5);
    return safeUser(users.find((u) => u.id === userId));
  },

  updateProfileById: async (userId, updateData) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    const allowed = ['name', 'email', 'phone', 'avatar', 'address', 'city', 'state', 'pincode'];
    for (const field of allowed) {
      if (updateData[field] !== undefined) user[field] = updateData[field];
    }
    user.updatedAt = new Date();
    return safeUser(user);
  },

  updatePasswordById: async (userId, hashedPassword) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.password = hashedPassword;
    user.updatedAt = new Date();
    return safeUser(user);
  },

  updateAvatarById: async (userId, avatarUrl) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.avatar = avatarUrl;
    user.updatedAt = new Date();
    return safeUser(user);
  },

  // ─── Find ──────────────────────────────────────────────────────────────────────
  findById: async (userId) => {
    await sleep(5);
    return safeUser(users.find((u) => u.id === userId));
  },

  findFullById: async (userId) => {
    await sleep(5);
    return users.find((u) => u.id === userId) || null;
  },

  findByEmail: async (email) => {
    await sleep(5);
    return users.find((u) => u.email === email.toLowerCase()) || null;
  },

  findAll: async (filters = {}) => {
    await sleep(10);
    const result = applySearch(users, filters);
    return result.map(safeUser);
  },

  // ─── Admin Management ──────────────────────────────────────────────────────────
  updateUserById: async (userId, updateData) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    const allowed = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'role'];
    for (const field of allowed) {
      if (updateData[field] !== undefined) user[field] = updateData[field];
    }
    user.updatedAt = new Date();
    return safeUser(user);
  },

  updateStatusById: async (userId, status) => {
    await sleep(5);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    user.status = status;
    user.updatedAt = new Date();
    return safeUser(user);
  },

  deleteById: async (userId) => {
    await sleep(5);
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  },

  // ─── Statistics ────────────────────────────────────────────────────────────────
  getStats: async () => {
    await sleep(8);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 'active').length;
    const inactiveUsers = users.filter((u) => u.status !== 'active').length;
    const newUsersToday = users.filter((u) => u.createdAt >= todayStart).length;
    const newUsersThisMonth = users.filter((u) => u.createdAt >= monthStart).length;
    const byRole = {};
    users.forEach((u) => { byRole[u.role] = (byRole[u.role] || 0) + 1; });
    return { totalUsers, activeUsers, inactiveUsers, newUsersToday, newUsersThisMonth, byRole };
  },

  // ─── Reports by User ───────────────────────────────────────────────────────────
  findReportsByUser: async (userId, filters = {}) => {
    await sleep(8);
    throw new Error('Reports data not available in Users module');
  },

  // ─── Email Check ───────────────────────────────────────────────────────────────
  isEmailTaken: async (email, excludeUserId) => {
    await sleep(3);
    return users.some((u) => u.email === email.toLowerCase() && u.id !== excludeUserId);
  },
};

module.exports = Repository;
