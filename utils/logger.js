export default class logger {
  static getCurrentDate() {
    const date = new Date();
    const timeZone = 'Asia/Taipei';
    const options = { timeZone: timeZone };
    const isoString = date.toLocaleString('en-US', options);
    return `[${isoString}]`;
  }
  static log(...args) {
    console.log(logger.getCurrentDate(), ...args);
  }
  static info(...args) {
    console.info(logger.getCurrentDate(), '[INFO]', ...args);
  }
  static error(...args) {
    console.error(logger.getCurrentDate(), '[ERROR]', ...args);
  }
  static warn(...args) {
    console.warn(logger.getCurrentDate(), '[WARN]', ...args);
  }
}
