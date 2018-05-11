/**
 * Created by kit on 2018/4/20.
 */
const mysql = require('mysql');
const database = require('../common/config/database');

const pool = mysql.createPool({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database,
  port: database.port
});

const query = function(sql, options, callback) {
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function(err, results, fields) {
        // 释放连接
        conn.release();
        // 事件驱动回调
        callback(err, results, fields);
      });
    }
  });
};


module.exports = query;