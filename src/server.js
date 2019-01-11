const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config/main');
const router = require('./routes');
const loggerMiddleware = require('./middleware/logger.middleware');
const responseMiddleware = require('./middleware/response.middleware');

const app = express();

// Setting up basic middleware for all Express requests
app.use(morgan('dev', {
    skip() {
        return config.env !== 'development';
    },
}));

app.use(loggerMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(responseMiddleware);

// Setting up headers
app.use(helmet());
app.use(cors({
    allowedHeaders: [
        'Authorization',
        'Content-Type',
    ],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Routes
app.use(config.api, router);

// Start the server
// INSERT TLS CERT HERE HTTPS
app.listen(config.port, () => {
    console.log(`API is now running on port ${config.port}.`);
}).on('error', ({ code }) => {
    if (code === 'EADDRINUSE') {
        console.log(`⚠ Error: port ${config.port} in use! API shutting down...`);
        process.exit(1);
    }
});

