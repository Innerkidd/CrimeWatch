const ROLES = Object.freeze({ ADMIN: 'admin', POLICE: 'police', CITIZEN: 'citizen' });
const ROLE_HIERARCHY = Object.freeze({ admin: 3, police: 2, citizen: 1 });

const REPORT_STATUS = Object.freeze({
  PENDING: 'pending', UNDER_REVIEW: 'under_review', ASSIGNED: 'assigned',
  INVESTIGATING: 'investigating', RESOLVED: 'resolved', REJECTED: 'rejected',
});

const REPORT_PRIORITY = Object.freeze({ LOW: 'low', NORMAL: 'normal', HIGH: 'high', CRITICAL: 'critical' });
const SEVERITY = Object.freeze({ LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical' });

const NOTIFICATION_TYPES = Object.freeze({
  REPORT_SUBMITTED: 'report_submitted', REPORT_RESOLVED: 'report_resolved',
  POLICE_ASSIGNED: 'police_assigned', EVIDENCE_ADDED: 'evidence_added',
  NEW_REPORT: 'new_report', INVESTIGATION_UPDATE: 'investigation_update',
  STATUS_CHANGE: 'status_change', SYSTEM: 'system', WELCOME: 'welcome', ACCOUNT_ALERT: 'account_alert',
});

const NOTIFICATION_STATUS = Object.freeze({ UNREAD: 'unread', READ: 'read', ARCHIVED: 'archived' });
const USER_STATUS = Object.freeze({ ACTIVE: 'active', SUSPENDED: 'suspended', INACTIVE: 'inactive' });
const POLICE_STATUS = Object.freeze({ ACTIVE: 'active', INACTIVE: 'inactive' });
const INVESTIGATION_STATUS = Object.freeze({ ASSIGNED: 'assigned', IN_PROGRESS: 'in_progress', CLOSED: 'closed' });
const EVIDENCE_TYPES = Object.freeze({ IMAGE: 'image', VIDEO: 'video', DOCUMENT: 'document', AUDIO: 'audio', OTHER: 'other' });

const CRIME_CATEGORIES = Object.freeze([
  'Theft', 'Burglary', 'Assault', 'Robbery', 'Vandalism',
  'Fraud', 'Drug Offense', 'Cyber Crime', 'Domestic Violence', 'Traffic Violation',
]);

const HTTP_STATUS = Object.freeze({
  OK: 200, CREATED: 201, ACCEPTED: 202, NO_CONTENT: 204,
  BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404,
  CONFLICT: 409, UNPROCESSABLE: 422, TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500, SERVICE_UNAVAILABLE: 503,
});

const ERROR_TYPES = Object.freeze({
  VALIDATION: 'ValidationError', AUTHENTICATION: 'AuthenticationError',
  AUTHORIZATION: 'AuthorizationError', NOT_FOUND: 'NotFoundError',
  CONFLICT: 'ConflictError', RATE_LIMIT: 'RateLimitError',
  DATABASE: 'DatabaseError', INTERNAL: 'InternalError',
});

const ALLOWED_MIME_TYPES = Object.freeze({
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  videos: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
});

const MAX_FILE_SIZES = Object.freeze({
  image: 5 * 1024 * 1024, document: 10 * 1024 * 1024,
  video: 50 * 1024 * 1024, audio: 20 * 1024 * 1024,
});

const PAGINATION = Object.freeze({ DEFAULT_PAGE: 1, DEFAULT_LIMIT: 20, MAX_LIMIT: 100 });

const RATE_LIMITS = Object.freeze({
  LOGIN: { windowMs: 15 * 60 * 1000, max: 5 },
  REGISTER: { windowMs: 60 * 60 * 1000, max: 3 },
  REPORT_CREATE: { windowMs: 60 * 60 * 1000, max: 10 },
  NOTIFICATION: { windowMs: 60 * 1000, max: 30 },
  ADMIN: { windowMs: 60 * 1000, max: 100 },
  GENERAL: { windowMs: 60 * 1000, max: 60 },
});

module.exports = {
  ROLES, ROLE_HIERARCHY, REPORT_STATUS, REPORT_PRIORITY, SEVERITY,
  NOTIFICATION_TYPES, NOTIFICATION_STATUS, USER_STATUS, POLICE_STATUS,
  INVESTIGATION_STATUS, EVIDENCE_TYPES, CRIME_CATEGORIES, HTTP_STATUS,
  ERROR_TYPES, ALLOWED_MIME_TYPES, MAX_FILE_SIZES, PAGINATION, RATE_LIMITS,
};
