const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const uuid = require('uuid/v1');
const uuid = require('node-uuid');
const httpContext = require('express-http-context');

const config = require('./config/main');
const router = require('./routes');
const { expressLogger, morganLogger } = require('./middleware/logger.middleware');
const responseMiddleware = require('./middleware/response.middleware');

const app = express();

// SETS UP HEADERS AND INITIAL BODY MIDDLEWARE //
app.use(helmet());
app.use(cors({
    allowedHeaders: [
        'Authorization',
        'Content-Type',
    ],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(bodyParser.urlencoded({ extended: false })); // TODO: Problem with errors in bodyParser not getting caught properly in the error handling below
app.use(bodyParser.json()); // Errors such as syntax errors, it complains res.serverError does not exist as the middleware is not created yet

// SETS UP LOGGING MIDDLEWARE //
// (Must come after body middleware due to async hook complications) //
app.use(httpContext.middleware);
app.use((req, res, next) => {
    httpContext.set('reqId', uuid.v1());
    next();
});
app.use(expressLogger);
app.use(morganLogger);

// SETS UP RESPONSE MIDDLEWARE //
app.use(responseMiddleware);

// CREATES THE ROUTES //
app.use(config.api, router);

// SETS UP ERROR HANDLING FOR UNCAUGHT EXCEPTIONS //
app.use((err, req, res, next) => {
    res.serverError(err);
});

// STARTS THE SERVER //
// TODO: Insert TLS cert here for HTTPS
app.listen(config.port, () => {
    console.log(`API is now running on port ${config.port}.`);
}).on('error', ({ code }) => {
    if (code === 'EADDRINUSE') {
        console.log(`⚠ Error: port ${config.port} in use! API shutting down...`);
        process.exit(1);
    }
});

