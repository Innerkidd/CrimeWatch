const service = require('../services/admin.service');

async function handleResponse(fn, req, res, next) {
  try {
    const result = await fn();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────

exports.getDashboardStats = async (req, res, next) => {
  await handleResponse(() => service.getDashboardStats(), req, res, next);
};

// ─── Users ──────────────────────────────────────────────────────────────────────

exports.getAllUsers = async (req, res, next) => {
  await handleResponse(() => service.getAllUsers(req.query), req, res, next);
};

exports.getUserById = async (req, res, next) => {
  await handleResponse(() => service.getUserById(req.params.id), req, res, next);
};

exports.updateUserStatus = async (req, res, next) => {
  await handleResponse(() => service.updateUserStatus(req.params.id, req.body.status), req, res, next);
};

exports.deleteUser = async (req, res, next) => {
  await handleResponse(async () => {
    await service.deleteUser(req.params.id);
    return { message: 'User deleted successfully' };
  }, req, res, next);
};

// ─── Police Officers ────────────────────────────────────────────────────────────

exports.getAllOfficers = async (req, res, next) => {
  await handleResponse(() => service.getAllOfficers(req.query), req, res, next);
};

exports.getOfficerById = async (req, res, next) => {
  await handleResponse(() => service.getOfficerById(req.params.id), req, res, next);
};

exports.createOfficer = async (req, res, next) => {
  await handleResponse(() => service.createOfficer(req.body), req, res, next);
};

exports.updateOfficer = async (req, res, next) => {
  await handleResponse(() => service.updateOfficer(req.params.id, req.body), req, res, next);
};

exports.toggleOfficerStatus = async (req, res, next) => {
  await handleResponse(() => service.toggleOfficerStatus(req.params.id, req.body.status), req, res, next);
};

exports.deleteOfficer = async (req, res, next) => {
  await handleResponse(async () => {
    await service.deleteOfficer(req.params.id);
    return { message: 'Officer deleted successfully' };
  }, req, res, next);
};

// ─── Crime Categories ───────────────────────────────────────────────────────────

exports.getAllCategories = async (req, res, next) => {
  await handleResponse(() => service.getAllCategories(), req, res, next);
};

exports.getCategoryById = async (req, res, next) => {
  await handleResponse(() => service.getCategoryById(req.params.id), req, res, next);
};

exports.createCategory = async (req, res, next) => {
  await handleResponse(() => service.createCategory(req.body), req, res, next);
};

exports.updateCategory = async (req, res, next) => {
  await handleResponse(() => service.updateCategory(req.params.id, req.body), req, res, next);
};

exports.deleteCategory = async (req, res, next) => {
  await handleResponse(async () => {
    await service.deleteCategory(req.params.id);
    return { message: 'Category deleted successfully' };
  }, req, res, next);
};

// ─── Reports ────────────────────────────────────────────────────────────────────

exports.getAllReports = async (req, res, next) => {
  await handleResponse(() => service.getAllReports(req.query), req, res, next);
};

exports.getReportById = async (req, res, next) => {
  await handleResponse(() => service.getReportById(req.params.id), req, res, next);
};

exports.updateReport = async (req, res, next) => {
  await handleResponse(() => service.updateReport(req.params.id, req.body), req, res, next);
};

exports.assignPolice = async (req, res, next) => {
  await handleResponse(() => service.assignPolice(req.params.id, req.body.officerId), req, res, next);
};

exports.deleteReport = async (req, res, next) => {
  await handleResponse(async () => {
    await service.deleteReport(req.params.id);
    return { message: 'Report deleted successfully' };
  }, req, res, next);
};

// ─── Analytics ──────────────────────────────────────────────────────────────────

exports.getCrimesByCategory = async (req, res, next) => {
  await handleResponse(() => service.getCrimesByCategory(), req, res, next);
};

exports.getCrimesByCity = async (req, res, next) => {
  await handleResponse(() => service.getCrimesByCity(), req, res, next);
};

exports.getMonthlyReports = async (req, res, next) => {
  await handleResponse(() => service.getMonthlyReports(), req, res, next);
};

exports.getCrimeTrend = async (req, res, next) => {
  await handleResponse(() => service.getCrimeTrend(), req, res, next);
};

exports.getTopLocations = async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  await handleResponse(() => service.getTopLocations(limit), req, res, next);
};

// ─── Audit Logs ─────────────────────────────────────────────────────────────────

exports.getAuditLogs = async (req, res, next) => {
  await handleResponse(() => service.getAuditLogs(req.query), req, res, next);
};
