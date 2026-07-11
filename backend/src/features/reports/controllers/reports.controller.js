const service = require('../services/reports.service');

async function ok(fn, req, res, next) {
  try {
    const data = await fn();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

exports.createReport = async (req, res, next) => {
  const data = { ...req.body, reportedBy: req.user?.id, reportedByName: req.user?.name, reportedByEmail: req.user?.email };
  await ok(() => service.createReport(data), req, res, next);
};

exports.getAllReports = async (req, res, next) => {
  await ok(() => service.getAllReports(req.query), req, res, next);
};

exports.getReportById = async (req, res, next) => {
  await ok(() => service.getReportById(req.params.id), req, res, next);
};

exports.updateReport = async (req, res, next) => {
  await ok(() => service.updateReport(req.params.id, req.body), req, res, next);
};

exports.updateReportStatus = async (req, res, next) => {
  await ok(() => service.updateReportStatus(req.params.id, req.body.status, req.user?.id), req, res, next);
};

exports.deleteReport = async (req, res, next) => {
  await ok(() => service.deleteReport(req.params.id), req, res, next);
};

exports.getReportsByCategory = async (req, res, next) => {
  await ok(() => service.getReportsByCategory(req.params.category, req.query), req, res, next);
};

exports.getReportsByLocation = async (req, res, next) => {
  const { lat, lng, radius, status, category } = req.query;
  await ok(() => service.getReportsByLocation(lat, lng, radius, { status, category }), req, res, next);
};

exports.searchReports = async (req, res, next) => {
  await ok(() => service.searchReports(req.query.q), req, res, next);
};

exports.addEvidence = async (req, res, next) => {
  await ok(() => service.addEvidence(req.params.id, req.body), req, res, next);
};

exports.deleteEvidence = async (req, res, next) => {
  await ok(() => service.deleteEvidence(req.params.evidenceId, req.params.id), req, res, next);
};

exports.getStats = async (req, res, next) => {
  await ok(() => service.getStats(), req, res, next);
};
