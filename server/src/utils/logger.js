const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

class Logger {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }

  shouldLog(level) {
    return levels[level] >= levels[LOG_LEVEL];
  }

  format(level) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.moduleName}]`;
  }

  debug(...args) {
    if (this.shouldLog("debug")) {
        console.log(this.format("debug"), ...args);
    }
    }

    info(...args) {
    if (this.shouldLog("info")) {
        console.log(this.format("info"), ...args);
    }
    }

    warn(...args) {
    if (this.shouldLog("warn")) {
        console.warn(this.format("warn"), ...args);
    }
    }

    error(...args) {
    if (this.shouldLog("error")) {
        console.error(this.format("error"), ...args);
    }
    }
}

export default Logger;