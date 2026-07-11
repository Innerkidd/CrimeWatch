const service = require('../services/users.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── Profile ────────────────────────────────────────────────────────────────────

exports.getProfile = async (req, res, next) => {
  const userId = req.user?.id || req.params.userId;
  await ok(() => service.getProfile(userId), req, res, next);
};

exports.updateProfile = async (req, res, next) => {
  const userId = req.user?.id || req.params.userId;
  await ok(() => service.updateProfile(userId, req.body), req, res, next);
};

exports.changePassword = async (req, res, next) => {
  const userId = req.user?.id || req.params.userId;
  const { currentPassword, newPassword } = req.body;
  await ok(() => service.changePassword(userId, currentPassword, newPassword), req, res, next);
};

exports.updateAvatar = async (req, res, next) => {
  const userId = req.user?.id || req.params.userId;
  await ok(() => service.updateAvatar(userId, req.body.avatarUrl), req, res, next);
};

// ─── Citizen Management ─────────────────────────────────────────────────────────

exports.getAllUsers = async (req, res, next) => {
  await ok(() => service.getAllUsers(req.query), req, res, next);
};

exports.getUserById = async (req, res, next) => {
  await ok(() => service.getUserById(req.params.id), req, res, next);
};

exports.updateUser = async (req, res, next) => {
  await ok(() => service.updateUser(req.params.id, req.body), req, res, next);
};

exports.deleteUser = async (req, res, next) => {
  await ok(() => service.deleteUser(req.params.id), req, res, next);
};

exports.activateUser = async (req, res, next) => {
  await ok(() => service.activateUser(req.params.id), req, res, next);
};

exports.deactivateUser = async (req, res, next) => {
  await ok(() => service.deactivateUser(req.params.id), req, res, next);
};

// ─── Statistics ─────────────────────────────────────────────────────────────────

exports.getStats = async (req, res, next) => {
  await ok(() => service.getStats(), req, res, next);
};

// ─── Search ─────────────────────────────────────────────────────────────────────

exports.searchUsers = async (req, res, next) => {
  await ok(() => service.searchUsers(req.query.q), req, res, next);
};
