require('dotenv').config();
module.exports = {
    HOST: process.env.DB_HOSTNAME,
    USER: process.env.DB_USER,
    PORT: process.env.DB_PORT,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};