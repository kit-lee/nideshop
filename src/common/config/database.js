const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'nideshop',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: '10.172.27.26',
  port: '3306',
  user: 'nideshop', // nideshop
  password: 'nideshop2017', // nideshop2017
  dateStrings: true
};
