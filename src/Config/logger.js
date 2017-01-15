let fs = require('fs');
let winston = require('winston');
const path = require('path');
winston.emitErrs = true;

const timestampFormat = () => (new Date()).toLocaleTimeString();
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

let logger = new winston.Logger({
    transports: [
        new (require('winston-daily-rotate-file'))({
          name: 'info-file',
          level: 'info',
          filename: logDirectory + '/info-logs.log',
          timestamp: timestampFormat,
          json: true,
          maxsize: 5242880, //5MB
          maxFiles: 5,
          colorize: false
        }),
        new (winston.transports.File)({
          name: 'error-file',
          level: 'error',
          filename: logDirectory + '/error-logs.log',
          timestamp: timestampFormat,
          json: true,
          maxsize: 5242880, //5MB
          maxFiles: 5,
          colorize: false
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          timestamp: timestampFormat,
          json: false,
          colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
