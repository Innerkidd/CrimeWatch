const LOG_LEVELS = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
const LOG_LEVEL_NAMES = { 0: 'ERROR', 1: 'WARN', 2: 'INFO', 3: 'DEBUG' };

class LoggerServiceClass {
  constructor(options = {}) {
    this.level = this._parseLevel(options.level || process.env.LOG_LEVEL || 'info');
    this.enabled = options.enabled !== false;
    this.logs = [];
    this.maxBufferSize = options.maxBufferSize || 1000;
  }

  _parseLevel(level) {
    if (typeof level === 'number') return level;
    const name = level.toUpperCase();
    const found = Object.keys(LOG_LEVEL_NAMES).find((k) => LOG_LEVEL_NAMES[k] === name);
    return found !== undefined ? parseInt(found, 10) : LOG_LEVELS.INFO;
  }

  _log(level, message, meta = null) {
    if (!this.enabled || level > this.level) return;
    const timestamp = new Date().toISOString();
    const prefix = LOG_LEVEL_NAMES[level] || 'UNKNOWN';
    const metaStr = meta ? ` ${typeof meta === 'object' ? JSON.stringify(meta) : meta}` : '';
    const line = `[${timestamp}] [${prefix}] ${message}${metaStr}`;
    this.logs.push({ timestamp, level: prefix, message, meta });
    if (this.logs.length > this.maxBufferSize) this.logs.shift();
    if (level <= LOG_LEVELS.ERROR) console.error(line);
    else if (level <= LOG_LEVELS.WARN) console.warn(line);
    else console.log(line);
  }

  error(message, meta) { this._log(LOG_LEVELS.ERROR, message, meta); }
  warn(message, meta) { this._log(LOG_LEVELS.WARN, message, meta); }
  info(message, meta) { this._log(LOG_LEVELS.INFO, message, meta); }
  debug(message, meta) { this._log(LOG_LEVELS.DEBUG, message, meta); }
  getLogs() { return [...this.logs]; }
  clearLogs() { this.logs = []; }
}

const LoggerService = new LoggerServiceClass();
module.exports = LoggerService;
module.exports.LoggerServiceClass = LoggerServiceClass;
