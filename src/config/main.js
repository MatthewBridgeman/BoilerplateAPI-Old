module.exports = {
    env: 'production',
    db: {
        development: {
            username: 'api',
            password: 'apipassword',
            database: 'database',
            host: 'localhost',
            dialect: 'mysql',
            maxConnections: 10,
        },
        production: {
            username: 'api',
            password: 'apipassword',
            database: 'database',
            host: 'localhost',
            dialect: 'mysql',
            maxConnections: 10,
        },
        test: {
            username: 'api',
            password: 'apipassword',
            database: 'database_test',
            host: 'localhost',
            dialect: 'mysql',
            maxConnections: 10,
        },
    },
    api: '/api/',
    port: process.env.PORT || 8080,
    jwt: {
        expiry: 86400,
        secret: 'supersecret',
    },
    papertrail: {
        host: 'logs7.papertrailapp.com',
        port: 26521,
        fullErrorLogging: false,
    },
};
