const LoggerService = require('./logger.service');

class NotificationServiceClass {
  constructor() {
    this.providers = [];
    this.initialized = false;
  }

  registerProvider(provider) {
    this.providers.push(provider);
  }

  async initialize() {
    this.initialized = true;
    LoggerService.info('[NotificationService] Initialized');
  }

  async send(userId, notification) {
    const payload = {
      userId,
      title: notification.title,
      message: notification.message,
      type: notification.type || 'info',
      data: notification.data || null,
      timestamp: new Date().toISOString(),
    };

    const results = [];
    for (const provider of this.providers) {
      try {
        await provider.send(payload);
        results.push({ provider: provider.name, success: true });
      } catch (err) {
        LoggerService.error(`[NotificationService] Provider ${provider.name} failed: ${err.message}`);
        results.push({ provider: provider.name, success: false, error: err.message });
      }
    }
    return results;
  }

  async sendReportUpdate(userId, reportId, action, details) {
    return this.send(userId, {
      title: `Report ${action}`,
      message: details,
      type: 'report_update',
      data: { reportId, action },
    });
  }

  async sendPoliceAssigned(userId, reportId, officerName) {
    return this.send(userId, {
      title: 'Police Officer Assigned',
      message: `Officer ${officerName} has been assigned to your report`,
      type: 'police_assigned',
      data: { reportId, officerName },
    });
  }

  async sendStatusChange(userId, reportId, oldStatus, newStatus) {
    return this.send(userId, {
      title: 'Report Status Updated',
      message: `Your report status changed from ${oldStatus} to ${newStatus}`,
      type: 'status_change',
      data: { reportId, oldStatus, newStatus },
    });
  }

  async sendEvidenceAdded(userId, reportId, evidenceFileName) {
    return this.send(userId, {
      title: 'New Evidence Added',
      message: `New evidence "${evidenceFileName}" has been added to your report`,
      type: 'evidence_added',
      data: { reportId, evidenceFileName },
    });
  }

  async sendBulk(userIds, notification) {
    const results = [];
    for (const userId of userIds) {
      try {
        const result = await this.send(userId, notification);
        results.push({ userId, success: true, result });
      } catch (err) {
        LoggerService.error(`[NotificationService] Bulk send to ${userId} failed: ${err.message}`);
        results.push({ userId, success: false, error: err.message });
      }
    }
    return results;
  }

  async sendToAllByRole(userIds, notification) {
    return this.sendBulk(userIds, notification);
  }
}

const NotificationService = new NotificationServiceClass();

module.exports = NotificationService;
module.exports.NotificationServiceClass = NotificationServiceClass;
