const mysqlMigrations = require('mysql-migrations');

const connection = require('./init');

mysqlMigrations.init(connection, __dirname + '/migrations', function () {}, [
 '--migrate-all',
]);
