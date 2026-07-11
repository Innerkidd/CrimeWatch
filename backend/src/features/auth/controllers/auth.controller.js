const service = require('../services/auth.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

exports.register = async (req, res, next) => {
  await ok(() => service.register(req.body), req, res, next);
};

exports.login = async (req, res, next) => {
  await ok(() => service.login(req.body), req, res, next);
};

exports.logout = async (req, res, next) => {
  const userId = req.body.userId || req.user?.id;
  await ok(() => service.logout(userId), req, res, next);
};

exports.refreshToken = async (req, res, next) => {
  await ok(() => service.refreshToken(req.body.refreshToken), req, res, next);
};

exports.forgotPassword = async (req, res, next) => {
  await ok(() => service.forgotPassword(req.body.email), req, res, next);
};

exports.resetPassword = async (req, res, next) => {
  await ok(() => service.resetPassword(req.body.token, req.body.password), req, res, next);
};

exports.getProfile = async (req, res, next) => {
  const userId = req.user?.id || req.params.userId;
  await ok(() => service.getProfile(userId), req, res, next);
};
