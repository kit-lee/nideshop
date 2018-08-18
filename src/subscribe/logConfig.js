/**
 * Created by kit on 2018/5/2.
 */
const log4js = require('log4js');
log4js.configure({
  appenders: { subscribe: { type: 'file', filename: 'logs/subscribe.log', maxLogSize: 1024 * 1024, keepFileExt: true} },
  categories: { default: { appenders: ['subscribe'], level: 'debug' } }
});

module.exports = log4js;