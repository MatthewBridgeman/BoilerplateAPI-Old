const config = require('./../config/main');
const _ = require('lodash');

module.exports = (req, res, next) => {
    // Successful API response
    res.success = (data, message = 'Request successfully processed.', statusCode = 200) => res.status(statusCode).json({
        success: true,
        statusCode,
        response: {
            title: 'Success!',
            message,
        },
        data,
    });

    // Unsuccessful API responses
    res.validationError = (message) => {
        if (config.env === 'development') console.log(`Validation Error: ${message}`);

        return res.status(400).json({
            success: false,
            statusCode: 400,
            response: {
                title: 'Validation Error!',
                message,
            },
        });
    };

    res.authentificationError = (message) => {
        if (config.env === 'development') console.log(`Authentification Error: ${message}`);

        return res.status(401).json({
            success: false,
            statusCode: 401,
            response: {
                title: 'Authentification Error!',
                message,
            },
        });
    };

    res.serverError = (error) => {
        // config.env = 'production';
        let title = 'Internal Server Error!';;
        let message = 'An error has occured processing your request, please contact support if the problem persists.';
        const logging = config.env === 'development' ? console.log : console.error;
        console.log(error);

        switch (true) {
            case (error.name.includes('SequelizeUniqueConstraintError')):
                title = 'Validation error';
                message = _.upperFirst(error.errors[0].message);
                logging(`${title}: ${message}`);
                break;

            case (error.message.includes('notNull Violation') ):
                title = 'Validation error';
                message = `${_.upperFirst(error.errors[0].path)} cannot be null`;
                logging(`${title}: ${message}`);
                break;

            case (error.name.includes('Sequelize')):
                title = 'Validation error';
                message = error.message;
                logging(`${title}: ${message}`);
                break;

            default:
                logging(`${error.name}: ${error.message}`);
                break;
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            response: {
                title,
                message,
            },
        });
    };

    next();
};
