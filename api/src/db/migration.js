const mysqlMigrations = require('mysql-migrations');

const mysql2 = require('mysql2');
const { appConfig } = require('../config');

const connection = mysql2.createPool({
 host: appConfig.DB.HOST,
 user: appConfig.DB.USER,
 password: appConfig.DB.PASSWORD,
 database: appConfig.DB.NAME,
});

mysqlMigrations.init(connection, __dirname + '/migrations', function () {}, [
 '--migrate-all',
]);
