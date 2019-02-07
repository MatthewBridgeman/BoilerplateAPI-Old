const util = require('util');
const httpContext = require('express-http-context');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-papertrail').Papertrail; // eslint-disable-line no-unused-expressions

const { env, papertrail } = require('./../config/main');

const dev = env === 'development';

// CREATES THE WINSTON LOGGER TO PAPERTRAIL
const papertrailTransport = new winston.transports.Papertrail({
    host: papertrail.host,
    port: papertrail.port,
    colorize: true,
    logFormat: (level, message) => {
        const reqId = httpContext.get('reqId');
        return reqId ? `<<\u001b[36m${reqId} ${level}>> ${message}` : `<<${level}>> ${message}`;
    },
});

const winstonLogger = new winston.Logger({
    transports: [papertrailTransport],
});

// CREATE THE EXPRESS ROUTE LOGGERS //
const expressLogger = expressWinston.logger({
    winstonInstance: winstonLogger,
    meta: false,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: true,
    skip() { return env !== 'production'; },
});

const morganLogger = morgan(
    'dev',
    { skip() { return !dev; } },
);

// CONSOLE LOG OVERWRITES TO SWITCH BETWEEN WINSTON AND LOCAL LOGGING  //
const formatArgs = args => util.format.apply(util.format, Array.prototype.slice.call(args));
console.info = (...args) => {
    const message = `\u001b[32m${formatArgs(args)}`;
    dev ? console.log('\u001b[32mInfo:', message) : winstonLogger.info(message);
};
console.warn = (...args) => {
    const message = `\u001b[33m${formatArgs(args)}`;
    dev ? console.log('\u001b[33mWarn:', message) : winstonLogger.warn(message);
};
console.error = (...args) => {
    const message = `\u001b[31m${formatArgs(args)}`;
    dev ? console.log('\u001b[31mError:', message) : winstonLogger.error(message);
};

module.exports = { expressLogger, morganLogger };
