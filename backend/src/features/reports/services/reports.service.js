const repo = require('../repositories/reports.repository');
const Model = require('../models/reports.model');

function notFound(msg) {
  const err = new Error(msg || 'Report not found');
  err.statusCode = 404;
  throw err;
}

function badRequest(msg) {
  const err = new Error(msg);
  err.statusCode = 400;
  throw err;
}

const VALID_STATUS_TRANSITIONS = {
  pending: ['under_review', 'rejected'],
  under_review: ['assigned', 'rejected'],
  assigned: ['investigating', 'rejected'],
  investigating: ['resolved', 'rejected'],
  resolved: [],
  rejected: [],
};

const Service = {
  // ─── Create ────────────────────────────────────────────────────────────────────
  createReport: async (data) => {
    if (!data.title) badRequest('Title is required');
    if (!data.category) badRequest('Category is required');
    if (!Model.CATEGORIES.includes(data.category)) badRequest(`Category must be one of: ${Model.CATEGORIES.join(', ')}`);
    if (data.severity && !Model.SEVERITIES.includes(data.severity)) badRequest(`Severity must be one of: ${Model.SEVERITIES.join(', ')}`);
    if (data.location) {
      if (typeof data.location.lat !== 'number' || typeof data.location.lng !== 'number') badRequest('Location must have valid lat and lng numbers');
    }
    return repo.create(data);
  },

  // ─── Get ───────────────────────────────────────────────────────────────────────
  getAllReports: async (filters) => {
    return repo.findAll(filters);
  },

  getReportById: async (reportId) => {
    const report = await repo.findById(reportId);
    if (!report) notFound('Report not found');
    return report;
  },

  getReportsByCategory: async (category, filters) => {
    if (!Model.CATEGORIES.map((c) => c.toLowerCase()).includes(category.toLowerCase())) {
      badRequest(`Category must be one of: ${Model.CATEGORIES.join(', ')}`);
    }
    return repo.findByCategory(category, filters);
  },

  // ─── Update ────────────────────────────────────────────────────────────────────
  updateReport: async (reportId, updateData) => {
    if (updateData.category && !Model.CATEGORIES.includes(updateData.category)) {
      badRequest(`Category must be one of: ${Model.CATEGORIES.join(', ')}`);
    }
    if (updateData.severity && !Model.SEVERITIES.includes(updateData.severity)) {
      badRequest(`Severity must be one of: ${Model.SEVERITIES.join(', ')}`);
    }
    const report = await repo.updateById(reportId, updateData);
    if (!report) notFound('Report not found');
    return report;
  },

  updateReportStatus: async (reportId, status, userId) => {
    if (!Model.STATUSES.includes(status)) badRequest(`Status must be one of: ${Model.STATUSES.join(', ')}`);
    const report = await repo.findById(reportId);
    if (!report) notFound('Report not found');
    const allowedNext = VALID_STATUS_TRANSITIONS[report.status];
    if (!allowedNext || !allowedNext.includes(status)) {
      badRequest(`Cannot transition from "${report.status}" to "${status}". Allowed: ${(allowedNext || []).join(', ') || 'none'}`);
    }
    const updateData = { status };
    if (status === 'assigned' && userId) updateData.assignedTo = userId;
    return repo.updateById(reportId, updateData);
  },

  // ─── Delete ────────────────────────────────────────────────────────────────────
  deleteReport: async (reportId) => {
    const deleted = await repo.deleteById(reportId);
    if (!deleted) notFound('Report not found');
    return { message: 'Report deleted successfully' };
  },

  // ─── Location ──────────────────────────────────────────────────────────────────
  getReportsByLocation: async (lat, lng, radius, filters) => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const radiusNum = parseFloat(radius) || 5;
    if (isNaN(latNum) || isNaN(lngNum)) badRequest('Valid lat and lng are required');
    if (radiusNum <= 0) badRequest('Radius must be greater than 0');
    return repo.findByLocation(latNum, lngNum, radiusNum, filters);
  },

  // ─── Evidence ──────────────────────────────────────────────────────────────────
  addEvidence: async (reportId, data) => {
    const report = await repo.findById(reportId);
    if (!report) notFound('Report not found');
    if (!data.fileName) badRequest('fileName is required');
    if (data.fileType && !Model.ALLOWED_MIME_TYPES.includes(data.fileType)) {
      badRequest(`File type not allowed. Allowed: ${Model.ALLOWED_MIME_TYPES.join(', ')}`);
    }
    if (data.type && !Model.EVIDENCE_TYPES.includes(data.type)) {
      badRequest(`Evidence type must be one of: ${Model.EVIDENCE_TYPES.join(', ')}`);
    }
    return repo.addEvidence(reportId, data);
  },

  deleteEvidence: async (evidenceId, reportId) => {
    const report = await repo.findById(reportId);
    if (!report) notFound('Report not found');
    const deleted = await repo.deleteEvidence(evidenceId);
    if (!deleted) notFound('Evidence not found');
    return { message: 'Evidence deleted successfully' };
  },

  // ─── Search ────────────────────────────────────────────────────────────────────
  searchReports: async (query) => {
    if (!query || (typeof query === 'string' && query.trim() === '')) badRequest('Search query is required');
    return repo.findAll({ search: query, limit: 50 });
  },

  // ─── Stats ────────────────────────────────────────────────────────────────────
  getStats: async () => {
    const all = await repo.findAll({ limit: 1000 });
    const byStatus = {};
    const byCategory = {};
    all.reports.forEach((r) => {
      byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      byCategory[r.category] = (byCategory[r.category] || 0) + 1;
    });
    return { total: all.total, byStatus, byCategory };
  },
};

module.exports = Service;
