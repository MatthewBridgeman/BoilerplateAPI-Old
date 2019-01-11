const util = require('util');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-papertrail').Papertrail; // eslint-disable-line no-unused-expressions

const { papertrail } = require('./../config/main');

const papertrailTransport = new winston.transports.Papertrail({
    host: papertrail.host,
    port: papertrail.port,
    handleExceptions: true,
    colorize: true,
    logFormat: function(level, message) {
        return '<<' + level + '>> ' + message;
    }
});

const winstonLogger = new winston.Logger({
    transports: [papertrailTransport]
});

const expressLogger = expressWinston.logger({
    transports: [papertrailTransport],
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: true,
});

formatArgs = (args) => util.format.apply(util.format, Array.prototype.slice.call(args));
const consoleInfo = console.info;
const consoleWarn = console.warn;
const consoleError = console.error;
console.info = function () {
    winstonLogger.info(formatArgs(arguments));
    return consoleInfo.apply(console, arguments);
};
console.warn = function () {
    winstonLogger.warn(formatArgs(arguments));
    return consoleWarn.apply(console, arguments);
};
console.error = function () {
    winstonLogger.error(formatArgs(arguments));
    return consoleError.apply(console, arguments);
};

module.exports = expressLogger;
