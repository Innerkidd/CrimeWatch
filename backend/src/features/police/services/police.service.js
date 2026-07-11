const repo = require('../repositories/police.repository');

function notFound(entity) {
  const err = new Error(`${entity} not found`);
  err.statusCode = 404;
  throw err;
}

function badRequest(msg) {
  const err = new Error(msg);
  err.statusCode = 400;
  throw err;
}

function formatReport(r) {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    category: r.category,
    location: r.location,
    city: r.city,
    status: r.status,
    priority: r.priority,
    reportedBy: r.reportedBy,
    reportedByName: r.reportedByName,
    assignedTo: r.assignedTo,
    assignedToName: r.assignedToName,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

const VALID_STATUSES = ['pending', 'assigned', 'investigating', 'resolved', 'rejected'];

const Service = {
  // ─── Dashboard ──────────────────────────────────────────────────────────────────
  getDashboard: async (officerId) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) notFound('Police officer');
    return repo.getDashboard(officerId);
  },

  // ─── Profile ────────────────────────────────────────────────────────────────────
  getProfile: async (officerId) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) notFound('Police officer');
    return officer;
  },

  updateProfile: async (officerId, data) => {
    const officer = await repo.updateOfficerProfile(officerId, data);
    if (!officer) notFound('Police officer');
    return officer;
  },

  updateAvailability: async (officerId, isAvailable) => {
    const officer = await repo.updateAvailability(officerId, isAvailable);
    if (!officer) notFound('Police officer');
    return officer;
  },

  updateCurrentLocation: async (officerId, location) => {
    if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      badRequest('Location must include lat and lng as numbers');
    }
    const officer = await repo.updateCurrentLocation(officerId, location);
    if (!officer) notFound('Police officer');
    return officer;
  },

  // ─── Assigned Reports ───────────────────────────────────────────────────────────
  getAssignedReports: async (officerId, filters) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) notFound('Police officer');
    return repo.findAssignedReports(officerId, filters);
  },

  getReportDetail: async (reportId) => {
    const report = await repo.findReportById(reportId);
    if (!report) notFound('Report');
    const investigation = await repo.findInvestigationByReport(reportId);
    const evidence = investigation ? await repo.findEvidenceByInvestigation(investigation.id) : [];
    return { report, investigation, evidence };
  },

  updateReportStatus: async (reportId, status) => {
    if (!VALID_STATUSES.includes(status)) {
      badRequest(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    const report = await repo.updateReportStatus(reportId, status);
    if (!report) notFound('Report');
    return formatReport(report);
  },

  // ─── Investigations ─────────────────────────────────────────────────────────────
  getInvestigations: async (officerId, filters) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) notFound('Police officer');
    const invs = await repo.findInvestigationsByOfficer(officerId, filters);
    const result = [];
    for (const inv of invs) {
      const report = await repo.findReportById(inv.reportId);
      const evidence = await repo.findEvidenceByInvestigation(inv.id);
      result.push({ investigation: inv, report: report || null, evidence });
    }
    return result;
  },

  acceptInvestigation: async (investigationId, officerId) => {
    let inv = await repo.findInvestigationById(investigationId);
    if (!inv) notFound('Investigation');
    if (inv.officerId !== officerId) badRequest('This investigation is not assigned to you');
    if (inv.status !== 'assigned') badRequest('Investigation is already in progress or closed');
    inv = await repo.startInvestigation(investigationId, 'Investigation accepted');
    await repo.updateReportStatus(inv.reportId, 'investigating');
    return inv;
  },

  startInvestigation: async (investigationId, officerId, notes) => {
    let inv = await repo.findInvestigationById(investigationId);
    if (!inv) notFound('Investigation');
    if (inv.officerId !== officerId) badRequest('This investigation is not assigned to you');
    if (inv.status !== 'assigned') badRequest('Investigation is already in progress or closed');
    inv = await repo.startInvestigation(investigationId, notes || 'Investigation started');
    await repo.updateReportStatus(inv.reportId, 'investigating');
    return inv;
  },

  updateInvestigationNotes: async (investigationId, officerId, notes) => {
    const inv = await repo.findInvestigationById(investigationId);
    if (!inv) notFound('Investigation');
    if (inv.officerId !== officerId) badRequest('This investigation is not assigned to you');
    if (inv.status === 'closed') badRequest('Cannot update notes on a closed investigation');
    return repo.updateInvestigationNotes(investigationId, notes);
  },

  closeInvestigation: async (investigationId, officerId, findings) => {
    let inv = await repo.findInvestigationById(investigationId);
    if (!inv) notFound('Investigation');
    if (inv.officerId !== officerId) badRequest('This investigation is not assigned to you');
    if (inv.status === 'closed') badRequest('Investigation is already closed');
    inv = await repo.closeInvestigation(investigationId, findings);
    await repo.updateReportStatus(inv.reportId, 'resolved');
    return inv;
  },

  uploadEvidence: async (investigationId, officerId, data) => {
    const inv = await repo.findInvestigationById(investigationId);
    if (!inv) notFound('Investigation');
    if (inv.officerId !== officerId) badRequest('This investigation is not assigned to you');
    if (!data.fileName) badRequest('fileName is required');
    data.investigationId = investigationId;
    return repo.createEvidence(data);
  },

  deleteEvidence: async (evidenceId, officerId) => {
    const evidence = await repo.deleteEvidence(evidenceId);
    if (!evidence) notFound('Evidence');
    return true;
  },

  // ─── Nearby Crimes ──────────────────────────────────────────────────────────────
  getNearbyCrimes: async (lat, lng, radiusKm, page, limit) => {
    if (lat === undefined || lng === undefined) badRequest('lat and lng are required');
    return repo.findNearbyReports(parseFloat(lat), parseFloat(lng), parseFloat(radiusKm) || 5, parseInt(page, 10) || 1, parseInt(limit, 10) || 20);
  },

  // ─── Activity Logs ──────────────────────────────────────────────────────────────
  getActivityLogs: async (officerId, filters) => {
    const officer = await repo.findOfficerById(officerId);
    if (!officer) notFound('Police officer');
    return repo.findActivityLogs(officerId, filters);
  },

  logActivity: async (entry) => {
    return repo.createActivityLog(entry);
  },
};

module.exports = Service;
