const LoggerService = require('./logger.service');

class SocketServiceClass {
  constructor() {
    this.io = null;
    this.initialized = false;
    this.connections = new Map();
    this.userSockets = new Map();
    this.rooms = new Map();
  }

  initialize(httpServer, options = {}) {
    if (this.initialized) return this.io;
    const socketIO = this._getSocketIO();
    if (!socketIO) {
      LoggerService.warn('[SocketService] Socket.IO not available. Running without real-time.');
      this.initialized = true;
      return null;
    }
    this.io = new socketIO.Server(httpServer, {
      cors: {
        origin: options.corsOrigins || process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingTimeout: options.pingTimeout || 60000,
      pingInterval: options.pingInterval || 25000,
    });

    this.io.on('connection', (socket) => {
      this._handleConnection(socket);
    });

    this.initialized = true;
    LoggerService.info('[SocketService] Initialized');
    return this.io;
  }

  _getSocketIO() {
    try {
      return require('socket.io');
    } catch {
      return null;
    }
  }

  _handleConnection(socket) {
    this.connections.set(socket.id, {
      id: socket.id,
      connectedAt: new Date(),
      userId: null,
      role: null,
    });

    socket.on('authenticate', (data) => {
      try {
        const { JwtHelper } = require('../utils');
        const payload = JwtHelper.verifyAccessToken(data.token);
        if (payload) {
          this.connections.set(socket.id, { ...this.connections.get(socket.id), userId: payload.id, role: payload.role });
          if (!this.userSockets.has(payload.id)) this.userSockets.set(payload.id, new Set());
          this.userSockets.get(payload.id).add(socket.id);
          socket.join(`user:${payload.id}`);
          if (payload.role === 'admin') socket.join('room:admin');
          if (payload.role === 'police') socket.join('room:police');
          socket.emit('authenticated', { userId: payload.id, role: payload.role });
        } else {
          socket.emit('auth_error', { message: 'Invalid token' });
        }
      } catch (err) {
        LoggerService.error(`[SocketService] Auth error: ${err.message}`);
        socket.emit('auth_error', { message: 'Authentication failed' });
      }
    });

    socket.on('join:report', (reportId) => {
      socket.join(`report:${reportId}`);
    });

    socket.on('leave:report', (reportId) => {
      socket.leave(`report:${reportId}`);
    });

    socket.on('disconnect', () => {
      const conn = this.connections.get(socket.id);
      if (conn?.userId) {
        const sockets = this.userSockets.get(conn.userId);
        if (sockets) {
          sockets.delete(socket.id);
          if (sockets.size === 0) this.userSockets.delete(conn.userId);
        }
      }
      this.connections.delete(socket.id);
    });
  }

  emitToUser(userId, event, data) {
    if (!this.io) return { sent: false, reason: 'Socket.IO not initialized' };
    this.io.to(`user:${userId}`).emit(event, data);
    return { sent: true };
  }

  emitToReport(reportId, event, data) {
    if (!this.io) return { sent: false, reason: 'Socket.IO not initialized' };
    this.io.to(`report:${reportId}`).emit(event, data);
    return { sent: true };
  }

  emitToRoom(room, event, data) {
    if (!this.io) return { sent: false, reason: 'Socket.IO not initialized' };
    this.io.to(`room:${room}`).emit(event, data);
    return { sent: true };
  }

  emitToAll(event, data) {
    if (!this.io) return { sent: false, reason: 'Socket.IO not initialized' };
    this.io.emit(event, data);
    return { sent: true };
  }

  notifyNewReport(report) {
    this.emitToRoom('admin', 'new:report', report);
    this.emitToRoom('police', 'new:report', report);
  }

  notifyReportUpdate(reportId, update) {
    this.emitToReport(reportId, 'update:report', update);
    if (update.assignedTo) {
      this.emitToUser(update.assignedTo, 'assigned:report', { reportId, ...update });
    }
  }

  notifyStatusChange(userId, reportId, oldStatus, newStatus) {
    this.emitToUser(userId, 'status:change', { reportId, oldStatus, newStatus });
  }

  notifyEvidenceAdded(reportId, evidence, userId) {
    this.emitToReport(reportId, 'evidence:added', { reportId, evidence });
    this.emitToUser(userId, 'evidence:added', { reportId, evidence });
  }

  getConnectedUsers() {
    const users = [];
    for (const [userId, sockets] of this.userSockets.entries()) {
      users.push({ userId, socketCount: sockets.size });
    }
    return users;
  }

  getConnectionCount() {
    return this.connections.size;
  }

  getUserConnectionCount(userId) {
    return this.userSockets.get(userId)?.size || 0;
  }
}

const SocketService = new SocketServiceClass();

module.exports = SocketService;
module.exports.SocketServiceClass = SocketServiceClass;
