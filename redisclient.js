/**
 * Created by kit on 2018/4/17.
 */
const RedisApp = require('./app/subscribe/redisapp');
const MessageParser = require('./app/subscribe/messageParser');
const query = require('./app/subscribe/database');
const log4js = require('./app/subscribe/logConfig');
const logger = log4js.getLogger();
const config = require('./app/common/config/config');

function init() {
  // 查userid
  let userid = 0;
  query('select userid from weixin_app where appid=?',
    [config.appService.appid],
    function(err, results, fields) {
      if (err) {
        logger.error('[SQL ERROR] - ', err.message);
      }
      if (results.length > 0) {
        userid = results[0]['userid'];
        startSubscribe(userid);
      }
    });
}

/**
 * 订阅redis消息
 * @param userid
 */
function startSubscribe(userid) {
  const instance = new RedisApp(config.redis.host, config.redis.port, config.redis.pass);
  instance.subscribe('order_notify.' + userid, (pattern, channel, message) => {
    const messg = message.substr(message.indexOf('{'));
    logger.debug('接收到消息:' + messg);
    const msg = new MessageParser(messg);
    if (msg.getEvent() === 'logistics.input') {
      doLogisticsInput(msg);
    } else if (msg.getEvent() === 'order.finish') {
      doOrderFinish(msg);
    }
  });
}

/**
 * 执行物流单登记的业务逻辑
 * 1、插入物流单信息
 * 2、为订单更新已发货状态
 * @param msg
 * @returns {Promise.<void>}
 */
async function doLogisticsInput(msg) {
  const logMsg = msg.getContent();
  const logJson = JSON.parse(logMsg);
  const shipper = await getShipper(logJson.channel);
  const orderid = await getOrderId(logJson.orderno);
  const currentTime = parseInt(getTime() / 1000);
  if (orderid > 0) {
    // 插入物流信息记录
    query('insert into nideshop_order_express (order_id,shipper_id,shipper_name,shipper_code,logistic_code,add_time) VALUES(?,?,?,?,?,?)',
      [orderid, shipper.id, shipper.name, shipper.code, logJson.logistics, currentTime],
      function(err, results, fields) {
        if (err) {
          logger.error('[SQL ERROR] - ', err.message);
        }
      });
    // 更新物流状态
    query('update nideshop_order set shipping_status=1, order_status=300 where platform_order=?', [logJson.orderno], function(err, results, fields) {
      if (err) {
        logger.error('[SQL ERROR] - ', err.message);
      }
    });
  }
}

/**
 * 更新订单状态为已收货
 * @param msg
 */
function doOrderFinish(msg) {
  const logMsg = msg.getContent();
  const logJson = JSON.parse(logMsg);

  if (logJson.source !== 'wxmp-mall-server') {
    return;
  }

  // 更新物流状态
  query('update nideshop_order set order_status=301 where platform_order=?', [logJson.orderNo], function(err, results, fields) {
    if (err) {
      logger.error('[SQL ERROR] - ', err.message);
    }
  });
}

/**
 * 获取快递公司信息
 * @param code
 * @returns {Promise}
 */
function getShipper(code) {
  return new Promise(function(resolve, reject) {
    query('select * from nideshop_shipper where code=?', [code], (err, results, fields) => {
      if (err) {
        reject(err.message);
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * 获取订单ID
 * @param orderno
 * @returns {Promise}
 */
function getOrderId(orderno) {
  return new Promise(function(resolve, reject) {
    query('select id from nideshop_order where platform_order=?', [orderno], (err, results, fields) => {
      if (err) {
        reject(err.message);
      }
      if (results.length > 0) {
        resolve(results[0].id);
      } else {
        resolve(0);
      }
    });
  });
}

function getTime() {
  return parseInt(Date.now() / 1000);
}

init();
