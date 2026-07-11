const LoggerService = require('./logger.service');

class MailServiceClass {
  constructor() {
    this.transport = null;
    this.initialized = false;
    this.fromAddress = process.env.MAIL_FROM || 'noreply@crimewatch.gov';
  }

  async initialize() {
    this.transport = await this._createTransport();
    this.initialized = true;
    LoggerService.info('[MailService] Initialized');
  }

  async _createTransport() {
    const nodemailer = this._getNodemailer();
    if (!nodemailer) {
      LoggerService.warn('[MailService] Nodemailer not available. Using mock transport.');
      return this._createMockTransport();
    }
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.MAIL_PORT, 10) || 587,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER || '',
        pass: process.env.MAIL_PASS || '',
      },
    });
  }

  _getNodemailer() {
    try {
      return require('nodemailer');
    } catch {
      return null;
    }
  }

  _createMockTransport() {
    return {
      sendMail: async (options) => {
        LoggerService.info(`[MailService][MOCK] Sending email to ${options.to}: ${options.subject}`);
        return { messageId: `mock-${Date.now()}`, envelope: { to: [options.to] }, accepted: [options.to], rejected: [] };
      },
    };
  }

  async sendMail(options) {
    if (!this.initialized) await this.initialize();
    const mailOptions = {
      from: options.from || this.fromAddress,
      to: options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html || null,
      attachments: options.attachments || [],
    };
    try {
      const info = await this.transport.sendMail(mailOptions);
      LoggerService.info(`[MailService] Email sent to ${options.to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      LoggerService.error(`[MailService] Failed to send email to ${options.to}: ${err.message}`);
      return { success: false, error: err.message };
    }
  }

  async sendWelcomeEmail(user) {
    return this.sendMail({
      to: user.email,
      subject: 'Welcome to CrimeWatch',
      html: `<h1>Welcome, ${user.name}!</h1><p>Your account has been created successfully.</p><p>Start reporting incidents in your area.</p>`,
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    return this.sendMail({
      to: user.email,
      subject: 'Password Reset - CrimeWatch',
      html: `<h1>Password Reset</h1><p>Click <a href="${resetUrl}">here</a> to reset your password.</p><p>This link expires in 1 hour.</p>`,
    });
  }

  async sendReportConfirmation(user, reportTitle, reportId) {
    return this.sendMail({
      to: user.email,
      subject: `Report Received: ${reportTitle}`,
      html: `<h1>Report Submitted</h1><p>Your report "${reportTitle}" has been received.</p><p>Reference ID: ${reportId}</p>`,
    });
  }

  async sendStatusUpdateEmail(user, reportTitle, newStatus) {
    return this.sendMail({
      to: user.email,
      subject: `Report Update: ${reportTitle}`,
      html: `<h1>Status Update</h1><p>Your report "${reportTitle}" status changed to <strong>${newStatus}</strong>.</p>`,
    });
  }
}

const MailService = new MailServiceClass();

module.exports = MailService;
module.exports.MailServiceClass = MailServiceClass;
