require('dotenv').config();

const appConfig = {
 APP: {
  URL: process.env.APP_URL,
  PORT: process.env.APP_PORT,
 },
 DB: {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DIALECT: process.env.DB_DIALECT,
 },
};

module.exports = appConfig;
