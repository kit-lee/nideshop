// default config
module.exports = {
  default_module: 'api',
  weixin: {
    appid: process.env.WX_APPID, // 小程序 appid 'wx107387151b39f3ef'
    secret: process.env.WX_SECRET, // '2402788ea08ff32cb66318b150b98536', // 小程序密钥
    mch_id: process.env.WX_MCH_ID, // '1433786002', // 商户帐号ID
    partner_key: process.env.WX_PAY_KEY, // 'Octch2017Octch2018Octch2019octch', // 微信支付密钥
    notify_url: process.env.WX_PAY_NOTIFY // 'https://nideshop.91zmt.com/api/pay/notify' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    appid: '1326549', // 对应快递鸟用户后台 用户ID
    appkey: '89ac3b19-819e-43eb-a1d3-5ff30b30e927', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  },
  appService: {
    host: 'http://127.0.0.1:9694',
    version: 'v1',
    appid: 'wxmp_TX2ZFo7r',
    appKey: 'sx2bv8pKeT238q3eFJh849bcvgX3spZq',
    appName: process.env.APP_NAME // '甘坑小镇微商城'
  },
  redis: {
    host: process.env.REDIS_HOST, // '10.117.42.124',
    port: process.env.REDIS_PORT, // 6379,
    pass: process.env.REDIS_PASS // '43gkywg7dcjEBxWGzGid6X94',‘kit2018’
  }
};
