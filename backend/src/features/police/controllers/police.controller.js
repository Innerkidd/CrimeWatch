const service = require('../services/police.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

// ─── Dashboard ──────────────────────────────────────────────────────────────────

exports.getDashboard = async (req, res, next) => {
  await ok(() => service.getDashboard(req.params.officerId), req, res, next);
};

// ─── Profile ────────────────────────────────────────────────────────────────────

exports.getProfile = async (req, res, next) => {
  await ok(() => service.getProfile(req.params.officerId), req, res, next);
};

exports.updateProfile = async (req, res, next) => {
  await ok(() => service.updateProfile(req.params.officerId, req.body), req, res, next);
};

exports.updateAvailability = async (req, res, next) => {
  await ok(() => service.updateAvailability(req.params.officerId, req.body.isAvailable), req, res, next);
};

exports.updateCurrentLocation = async (req, res, next) => {
  await ok(() => service.updateCurrentLocation(req.params.officerId, req.body.location), req, res, next);
};

// ─── Assigned Reports ───────────────────────────────────────────────────────────

exports.getAssignedReports = async (req, res, next) => {
  await ok(() => service.getAssignedReports(req.params.officerId, req.query), req, res, next);
};

exports.getReportDetail = async (req, res, next) => {
  await ok(() => service.getReportDetail(req.params.id), req, res, next);
};

exports.updateReportStatus = async (req, res, next) => {
  await ok(() => service.updateReportStatus(req.params.id, req.body.status), req, res, next);
};

// ─── Investigations ─────────────────────────────────────────────────────────────

exports.getInvestigations = async (req, res, next) => {
  await ok(() => service.getInvestigations(req.params.officerId, req.query), req, res, next);
};

exports.acceptInvestigation = async (req, res, next) => {
  await ok(() => service.acceptInvestigation(req.params.id, req.params.officerId), req, res, next);
};

exports.startInvestigation = async (req, res, next) => {
  await ok(() => service.startInvestigation(req.params.id, req.params.officerId, req.body.notes), req, res, next);
};

exports.updateInvestigationNotes = async (req, res, next) => {
  await ok(() => service.updateInvestigationNotes(req.params.id, req.params.officerId, req.body.notes), req, res, next);
};

exports.closeInvestigation = async (req, res, next) => {
  await ok(() => service.closeInvestigation(req.params.id, req.params.officerId, req.body.findings), req, res, next);
};

exports.uploadEvidence = async (req, res, next) => {
  await ok(() => service.uploadEvidence(req.params.id, req.params.officerId, req.body), req, res, next);
};

exports.deleteEvidence = async (req, res, next) => {
  await ok(async () => {
    await service.deleteEvidence(req.params.evidenceId, req.params.officerId);
    return { message: 'Evidence deleted successfully' };
  }, req, res, next);
};

// ─── Nearby Crimes ──────────────────────────────────────────────────────────────

exports.getNearbyCrimes = async (req, res, next) => {
  const { lat, lng, radius, page, limit } = req.query;
  await ok(() => service.getNearbyCrimes(lat, lng, radius, page, limit), req, res, next);
};

// ─── Activity Logs ──────────────────────────────────────────────────────────────

exports.getActivityLogs = async (req, res, next) => {
  await ok(() => service.getActivityLogs(req.params.officerId, req.query), req, res, next);
};
