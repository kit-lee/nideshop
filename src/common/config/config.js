// default config
module.exports = {
  default_module: 'api',
  weixin: {
    appid: 'wx107387151b39f3ef', // 小程序 appid
    secret: '2402788ea08ff32cb66318b150b98536', // 小程序密钥
    mch_id: '1433786002', // 商户帐号ID
    partner_key: 'Octch2017Octch2018Octch2019octch', // 微信支付密钥
    notify_url: 'https://mini.91zmt.com/api/pay/notify' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    appid: '1326549', // 对应快递鸟用户后台 用户ID
    appkey: '89ac3b19-819e-43eb-a1d3-5ff30b30e927', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  },
  appService: {
    host: 'http://10.175.198.42:9694',
    version: 'v1',
    appid: 'wxmp_Ix32k5aI',
    appKey: 'g2pxpww3B4H4hhBf83CQuruQQqTsP4E2',
    appName: '甘坑小镇微商城'
  }
};
