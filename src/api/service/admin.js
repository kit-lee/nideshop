const axios = require('axios');
const cryptoUtil = require('muses-wxmp-crypto-util');
const qs = require('querystring');

module.exports = class extends think.Service {
  async checkConponSn(sn) {
    const params = {
      'sn': sn,
      'appid': think.config('appService.appid')
    };
    const clientSecret = think.config('appService.appKey');
    const timestamp = new Date().getTime();
    const sign = cryptoUtil.getSignature(params, timestamp, clientSecret);
    const data = await axios.get(think.config('appService.host') + '/api/' + think.config('appService.version') + '/coupon/sn?' +
        qs.stringify(params), {headers: {'Muses-Timestamp': timestamp, 'Muses-Signature': sign}})
      .then((rsp) => {
        return rsp.data;
      }).catch((ex) => {
        think.logger.error(ex);
      });
    return data;
  }
};
