const mysql2 = require('mysql2/promise');
const { appConfig } = require('../config');

const connection = mysql2.createPool({
 connectionLimit: 10,
 host: appConfig.DB.HOST,
 user: appConfig.DB.USER,
 password: appConfig.DB.PASSWORD,
 database: appConfig.DB.NAME,
});

module.exports = connection;
