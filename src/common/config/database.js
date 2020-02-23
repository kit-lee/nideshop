const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: process.env.MYSQL_DB, // 'nideshop',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  // host: '10.172.27.26', // '10.172.27.26',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  dateStrings: true
};
