/**
 * Created by kit on 2018/4/17.
 */
var redis = require('redis');
const log4js = require('./logConfig');
const logger = log4js.getLogger();

class redisapp {

  constructor(host, port, passwd) {
    // this.client = redis.createClient(6379, '127.0.0.1', {password: 'kit2018', db: 0});
    this.ready = false;
    this.client = redis.createClient(port, host, {password: passwd, db: 0});
    this.client.on('ready', function() {
      // 订阅消息
      logger.info('连接redis(' + host + ':' + port + ')成功...');
    });
    this.client.on('error', function(error) {
      logger.errof('[Redis ERROR]', error.message);
    });
    // 监听订阅成功事件
    this.client.on('subscribe', function(channel, count) {
      logger.info('client subscribed to ' + channel + ',' + count + 'total subscriptions');
    });
    // 监听订阅成功事件
    this.client.on('psubscribe', function(channel, count) {
      logger.info('client psubscribed to ' + channel + ',' + count + 'total subscriptions');
    });
    this.client.on('unsubscribe', function(channel, count) {
      logger.info('client unsubscribed from' + channel + ', ' + count + ' total subscriptions');
    });
  }

  /**
   *
   * @param channel
   * @param callback
   *                function(pattern, channel, message) {
   *                  console.log('我接收到信息了' + message);
   *                }
   */
  psubscribe(channel, callback){
    this.client.psubscribe(channel);
    this.client.on('pmessage', callback);
  }

  /**
   *
   * @param channel
   * @param callback
   *              function(channel, message) {
   *                   console.log('我接收到信息了' + message);
   *              }
   */
  subscribe(channel, callback){
    this.client.subscribe(channel);
    // 收到消息后执行回调，message是redis发布的消息
    this.client.on('message', callback);
  }
}

module.exports = redisapp;