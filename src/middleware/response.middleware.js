const httpContext = require('express-http-context');
const _ = require('lodash');
const moment = require('moment');

const { env, papertrail: { fullErrorLogging } } = require('./../config/main');

const dev = env === 'development';

module.exports = (req, res, next) => {
    // Successful API response
    res.success = (data, message = 'Request successfully processed.', statusCode = 200) => res.status(statusCode).json({
        success: true,
        statusCode,
        servertime: moment.utc().format(),
        response: {
            title: 'Success!',
            message,
        },
        data,
    });

    // Unsuccessful API responses
    res.validationError = (message) => {
        if (dev) console.error(`Validation Error: ${message}`);

        return res.status(400).json({
            success: false,
            statusCode: 400,
            servertime: moment.utc().format(),
            response: {
                title: 'Validation Error!',
                message,
            },
        });
    };

    res.authentificationError = (message) => {
        if (dev) console.error(`Authentification Error: ${message}`);

        return res.status(401).json({
            success: false,
            statusCode: 401,
            servertime: moment.utc().format(),
            response: {
                title: 'Authentification Error!',
                message,
            },
        });
    };

    res.serverError = (error) => {
        const reqId = httpContext.get('reqId');
        let title = 'Internal Server Error!';
        let message = `An error has occured processing your request, please contact support if the problem persists. Reference ID: ${reqId}`;

        switch (true) {
            case (error.name.includes('TokenExpiredError')):
                return res.authentificationError('Authorization token expired.');

            case (error.message.includes('notNull Violation')):
                return res.validationError(`${_.upperFirst(error.errors[0].path)} cannot be null.`);

            case (['SequelizeUniqueConstraintError', 'ValidationError'].some(errorCode => error.name.includes(errorCode))):
                return res.validationError(`${_.upperFirst(error.errors[0].message)}.`);

            case (error.name.includes('SequelizeDatabaseError') && error.message.includes('Data too long')):
                return res.validationError(`Too many characters for value ${error.message.split(/'/)[1]}.`);

            case (error.name.includes('SequelizeDatabaseError') && error.message.includes('Out of range')):
                return res.validationError(`Number too large for value ${error.message.split(/'/)[1]}.`);

            case (error.name.includes('SequelizeDatabaseError') && ['column', 'field'].some(errorCode => error.message.includes(errorCode))):
                return res.validationError('Incorrect value provided for one of the received fields.');

            case (error.name.includes('TypeError')):
                return res.validationError(error.message);

            case (error.name.includes('SyntaxError')):
                title = 'Syntax error!';
                message = `${error.message}.`;
                if (dev) console.error(`${title}: ${message}`);
                break;

            default:
                console.error(fullErrorLogging ? error : `${error.name}: ${error.message}`);
                break;
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            servertime: moment.utc().format(),
            response: {
                title,
                message,
            },
        });
    };

    next();
};
