const repo = require('../repositories/users.repository');

function notFound(msg) {
  const err = new Error(msg || 'User not found');
  err.statusCode = 404;
  throw err;
}

function badRequest(msg) {
  const err = new Error(msg);
  err.statusCode = 400;
  throw err;
}

function forbidden(msg) {
  const err = new Error(msg);
  err.statusCode = 403;
  throw err;
}

const Service = {
  // ─── Profile ───────────────────────────────────────────────────────────────────
  getProfile: async (userId) => {
    const user = await repo.findProfileById(userId);
    if (!user) notFound('User not found');
    return user;
  },

  updateProfile: async (userId, updateData) => {
    if (updateData.email) {
      const taken = await repo.isEmailTaken(updateData.email, userId);
      if (taken) {
        const err = new Error('Email already in use');
        err.statusCode = 409;
        throw err;
      }
    }
    const user = await repo.updateProfileById(userId, updateData);
    if (!user) notFound('User not found');
    return user;
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    if (!currentPassword || !newPassword) badRequest('Current password and new password are required');
    if (newPassword.length < 6) badRequest('New password must be at least 6 characters');
    const full = await repo.findFullById(userId);
    if (!full) notFound('User not found');
    const valid = repo.verifyPassword(currentPassword, full.password);
    if (!valid) badRequest('Current password is incorrect');
    const hashed = repo.hashPassword(newPassword);
    return repo.updatePasswordById(userId, hashed);
  },

  updateAvatar: async (userId, avatarUrl) => {
    if (!avatarUrl) badRequest('Avatar URL is required');
    const user = await repo.updateAvatarById(userId, avatarUrl);
    if (!user) notFound('User not found');
    return user;
  },

  // ─── Citizen Management ────────────────────────────────────────────────────────
  getUserById: async (userId) => {
    const user = await repo.findById(userId);
    if (!user) notFound('User not found');
    return user;
  },

  getAllUsers: async (filters) => {
    return repo.findAll(filters);
  },

  updateUser: async (userId, updateData) => {
    if (updateData.email) {
      const taken = await repo.isEmailTaken(updateData.email, userId);
      if (taken) {
        const err = new Error('Email already in use');
        err.statusCode = 409;
        throw err;
      }
    }
    const user = await repo.updateUserById(userId, updateData);
    if (!user) notFound('User not found');
    return user;
  },

  deleteUser: async (userId) => {
    const deleted = await repo.deleteById(userId);
    if (!deleted) notFound('User not found');
    return { message: 'User deleted successfully' };
  },

  activateUser: async (userId) => {
    const user = await repo.updateStatusById(userId, 'active');
    if (!user) notFound('User not found');
    return user;
  },

  deactivateUser: async (userId) => {
    const user = await repo.updateStatusById(userId, 'suspended');
    if (!user) notFound('User not found');
    return user;
  },

  // ─── Statistics ────────────────────────────────────────────────────────────────
  getStats: async () => {
    return repo.getStats();
  },

  // ─── Search ────────────────────────────────────────────────────────────────────
  searchUsers: async (query) => {
    if (!query || (typeof query === 'string' && query.trim() === '')) {
      badRequest('Search query is required');
    }
    return repo.findAll({ search: query });
  },
};

module.exports = Service;
