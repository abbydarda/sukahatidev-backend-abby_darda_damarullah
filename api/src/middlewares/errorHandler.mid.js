const fs = require('fs');
const path = require('path');

function errorHandler(err, req, res, next) {
 // Menyimpan log ke dalam file
 const logFilePath = path.join(__dirname, '../logs/error.log');
 const logMessage = `[${new Date().toISOString()}] ${JSON.stringify(err)}\n\n`;
 fs.appendFileSync(logFilePath, logMessage, 'utf8');

 if (err.statusCode) {
  return res.status(err.statusCode).send({ error: err.msg });
 }

 return res.status(500).send({ error: 'Terjadi kesalahan server' });
}

module.exports = { errorHandler };
