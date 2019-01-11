const Sequelize = require('sequelize');
const { env } = require('./config/main.js');
const { db } = require('./config/main.js');

const dbConfig = db[process.env.NODE_ENV] || db[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        pool: {
            maxConnections: dbConfig.maxConnections10, // limit is 90
        },
        dialect: dbConfig.dialect,
        logging: env === 'development' ? (string) => {
            console.log(string);
        } : false,
        operatorsAliases: false,
    },
);

sequelize.authenticate().then(
    () => {
        console.log(`Successfully connected to database: ${dbConfig.host}`);
    },
    (err) => {
        console.log(`Unable to connect to database: \n${err}`);
    },
);

module.exports = sequelize;
