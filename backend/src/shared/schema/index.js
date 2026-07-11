const usersSchema = require('./users.schema');
const policeSchema = require('./police.schema');
const crimeReportsSchema = require('./crime_reports.schema');
const evidenceSchema = require('./evidence.schema');
const investigationsSchema = require('./investigations.schema');
const crimeCategoriesSchema = require('./crime_categories.schema');
const notificationsSchema = require('./notifications.schema');
const activityLogsSchema = require('./activity_logs.schema');
const adminLogsSchema = require('./admin_logs.schema');
const refreshTokensSchema = require('./refresh_tokens.schema');
const resetTokensSchema = require('./reset_tokens.schema');
const dashboardAnalyticsSchema = require('./dashboard_analytics.schema');

const schemas = [
  { name: 'users', version: 1, schema: usersSchema },
  { name: 'crime_categories', version: 1, schema: crimeCategoriesSchema },
  { name: 'police', version: 1, schema: policeSchema },
  { name: 'crime_reports', version: 1, schema: crimeReportsSchema },
  { name: 'evidence', version: 1, schema: evidenceSchema },
  { name: 'investigations', version: 1, schema: investigationsSchema },
  { name: 'notifications', version: 1, schema: notificationsSchema },
  { name: 'activity_logs', version: 1, schema: activityLogsSchema },
  { name: 'admin_logs', version: 1, schema: adminLogsSchema },
  { name: 'refresh_tokens', version: 1, schema: refreshTokensSchema },
  { name: 'reset_tokens', version: 1, schema: resetTokensSchema },
  { name: 'dashboard_analytics', version: 1, schema: dashboardAnalyticsSchema },
];

function getSchema(name) {
  return schemas.find((s) => s.name === name);
}

function getAllSchemas() {
  return schemas;
}

module.exports = {
  schemas,
  getSchema,
  getAllSchemas,
};
