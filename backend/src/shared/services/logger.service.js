const LOG_LEVELS = Object.freeze({
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
});

const LOG_LEVEL_NAMES = Object.freeze({
  0: 'ERROR',
  1: 'WARN',
  2: 'INFO',
  3: 'DEBUG',
});

class LoggerServiceClass {
  constructor(options = {}) {
    this.level = this._parseLevel(options.level || process.env.LOG_LEVEL || 'info');
    this.enabled = options.enabled !== false;
    this.logs = [];
    this.maxBufferSize = options.maxBufferSize || 1000;
    this.outputFn = options.outputFn || this._defaultOutput;
  }

  _parseLevel(level) {
    if (typeof level === 'number') return level;
    const name = level.toUpperCase();
    return LOG_LEVEL_NAMES[Object.keys(LOG_LEVEL_NAMES).find((k) => LOG_LEVEL_NAMES[k] === name)] ?? LOG_LEVELS.INFO;
  }

  _defaultOutput(level, message, meta) {
    const timestamp = new Date().toISOString();
    const prefix = LOG_LEVEL_NAMES[level] || 'UNKNOWN';
    const metaStr = meta ? ` ${typeof meta === 'object' ? JSON.stringify(meta) : meta}` : '';
    console[level <= LOG_LEVELS.ERROR ? 'error' : level <= LOG_LEVELS.WARN ? 'warn' : 'log'](
      `[${timestamp}] [${prefix}] ${message}${metaStr}`
    );
  }

  _log(level, message, meta = null) {
    if (!this.enabled || level > this.level) return;
    const entry = {
      timestamp: new Date().toISOString(),
      level: LOG_LEVEL_NAMES[level],
      message,
      meta,
    };
    this.logs.push(entry);
    if (this.logs.length > this.maxBufferSize) this.logs.shift();
    this.outputFn(level, message, meta);
  }

  error(message, meta = null) { this._log(LOG_LEVELS.ERROR, message, meta); }
  warn(message, meta = null) { this._log(LOG_LEVELS.WARN, message, meta); }
  info(message, meta = null) { this._log(LOG_LEVELS.INFO, message, meta); }
  debug(message, meta = null) { this._log(LOG_LEVELS.DEBUG, message, meta); }

  getLogs() { return [...this.logs]; }
  clearLogs() { this.logs = []; }

  createChild(context) {
    const child = new LoggerServiceClass({
      level: this.level,
      enabled: this.enabled,
      maxBufferSize: this.maxBufferSize,
      outputFn: (level, message, meta) => {
        const enrichedMeta = { ...meta, ...context };
        this._log(level, message, enrichedMeta);
      },
    });
    return child;
  }
}

const LoggerService = new LoggerServiceClass();

module.exports = LoggerService;
module.exports.LoggerServiceClass = LoggerServiceClass;
