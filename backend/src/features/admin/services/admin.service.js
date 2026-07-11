const repo = require('../repositories/admin.repository');

function formatUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status, createdAt: user.createdAt, updatedAt: user.updatedAt };
}

function formatReport(report) {
  return { id: report.id, title: report.title, description: report.description, category: report.category, location: report.location, city: report.city, status: report.status, reportedBy: report.reportedBy, reportedByName: report.reportedByName, assignedTo: report.assignedTo, assignedToName: report.assignedToName, createdAt: report.createdAt, updatedAt: report.updatedAt };
}

const Service = {
  // ─── Dashboard ──────────────────────────────────────────────────────────────────
  getDashboardStats: async () => {
    return repo.getDashboardStats();
  },

  // ─── Users ──────────────────────────────────────────────────────────────────────
  getAllUsers: async (filters) => {
    const users = await repo.findAllUsers(filters);
    return users.map(formatUser);
  },

  getUserById: async (userId) => {
    const user = await repo.findUserById(userId);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    return formatUser(user);
  },

  updateUserStatus: async (userId, status) => {
    if (!['active', 'suspended'].includes(status)) {
      const err = new Error('Status must be "active" or "suspended"');
      err.statusCode = 400;
      throw err;
    }
    const user = await repo.updateUserStatus(userId, status);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    return formatUser(user);
  },

  deleteUser: async (userId) => {
    const deleted = await repo.deleteUserById(userId);
    if (!deleted) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
  },

  // ─── Police Officers ────────────────────────────────────────────────────────────
  getAllOfficers: async (filters) => {
    return repo.findAllOfficers(filters);
  },

  getOfficerById: async (officerId) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) {
      const err = new Error('Police officer not found');
      err.statusCode = 404;
      throw err;
    }
    return officer;
  },

  createOfficer: async (data) => {
    const existing = await repo.findAllOfficers();
    const duplicateBadge = existing.find((o) => o.badgeNumber === data.badgeNumber);
    if (duplicateBadge) {
      const err = new Error('Badge number already exists');
      err.statusCode = 409;
      throw err;
    }
    const duplicateEmail = existing.find((o) => o.email === data.email);
    if (duplicateEmail) {
      const err = new Error('Email already exists');
      err.statusCode = 409;
      throw err;
    }
    return repo.createOfficer(data);
  },

  updateOfficer: async (officerId, data) => {
    const officer = await repo.updateOfficer(officerId, data);
    if (!officer) {
      const err = new Error('Police officer not found');
      err.statusCode = 404;
      throw err;
    }
    return officer;
  },

  toggleOfficerStatus: async (officerId, status) => {
    if (!['active', 'inactive'].includes(status)) {
      const err = new Error('Status must be "active" or "inactive"');
      err.statusCode = 400;
      throw err;
    }
    const officer = await repo.toggleOfficerStatus(officerId, status);
    if (!officer) {
      const err = new Error('Police officer not found');
      err.statusCode = 404;
      throw err;
    }
    return officer;
  },

  deleteOfficer: async (officerId) => {
    const deleted = await repo.deleteOfficerById(officerId);
    if (!deleted) {
      const err = new Error('Police officer not found');
      err.statusCode = 404;
      throw err;
    }
  },

  // ─── Crime Categories ───────────────────────────────────────────────────────────
  getAllCategories: async () => {
    return repo.findAllCategories();
  },

  getCategoryById: async (categoryId) => {
    const category = await repo.findCategoryById(categoryId);
    if (!category) {
      const err = new Error('Category not found');
      err.statusCode = 404;
      throw err;
    }
    return category;
  },

  createCategory: async (data) => {
    const existing = await repo.findAllCategories();
    const duplicate = existing.find((c) => c.name.toLowerCase() === data.name.toLowerCase());
    if (duplicate) {
      const err = new Error('Category name already exists');
      err.statusCode = 409;
      throw err;
    }
    return repo.createCategory(data);
  },

  updateCategory: async (categoryId, data) => {
    if (data.name) {
      const existing = await repo.findAllCategories();
      const duplicate = existing.find((c) => c.id !== categoryId && c.name.toLowerCase() === data.name.toLowerCase());
      if (duplicate) {
        const err = new Error('Category name already exists');
        err.statusCode = 409;
        throw err;
      }
    }
    const category = await repo.updateCategory(categoryId, data);
    if (!category) {
      const err = new Error('Category not found');
      err.statusCode = 404;
      throw err;
    }
    return category;
  },

  deleteCategory: async (categoryId) => {
    const deleted = await repo.deleteCategoryById(categoryId);
    if (!deleted) {
      const err = new Error('Category not found');
      err.statusCode = 404;
      throw err;
    }
  },

  // ─── Reports ────────────────────────────────────────────────────────────────────
  getAllReports: async (filters) => {
    const result = await repo.findAllReports(filters);
    return result.map(formatReport);
  },

  getReportById: async (reportId) => {
    const report = await repo.findReportById(reportId);
    if (!report) {
      const err = new Error('Report not found');
      err.statusCode = 404;
      throw err;
    }
    return formatReport(report);
  },

  updateReport: async (reportId, data) => {
    const report = await repo.updateReport(reportId, data);
    if (!report) {
      const err = new Error('Report not found');
      err.statusCode = 404;
      throw err;
    }
    return formatReport(report);
  },

  assignPolice: async (reportId, officerId) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) {
      const err = new Error('Police officer not found');
      err.statusCode = 404;
      throw err;
    }
    if (officer.status !== 'active') {
      const err = new Error('Cannot assign an inactive officer');
      err.statusCode = 400;
      throw err;
    }
    const report = await repo.assignReportToOfficer(reportId, officerId);
    if (!report) {
      const err = new Error('Report not found');
      err.statusCode = 404;
      throw err;
    }
    return formatReport(report);
  },

  deleteReport: async (reportId) => {
    const deleted = await repo.deleteReportById(reportId);
    if (!deleted) {
      const err = new Error('Report not found');
      err.statusCode = 404;
      throw err;
    }
  },

  // ─── Analytics ──────────────────────────────────────────────────────────────────
  getCrimesByCategory: async () => {
    return repo.getCrimesByCategory();
  },

  getCrimesByCity: async () => {
    return repo.getCrimesByCity();
  },

  getMonthlyReports: async () => {
    return repo.getMonthlyReports();
  },

  getCrimeTrend: async () => {
    return repo.getCrimeTrend();
  },

  getTopLocations: async (limit) => {
    return repo.getTopLocations(limit);
  },

  // ─── Audit Logs ─────────────────────────────────────────────────────────────────
  getAuditLogs: async (filters) => {
    return repo.findAllAuditLogs(filters);
  },

  createAuditLog: async (entry) => {
    return repo.createAuditLog(entry);
  },
};

module.exports = Service;
