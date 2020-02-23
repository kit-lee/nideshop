/**
 * 快递鸟API工具类
 * Created by kit on 2018/4/24.
 */
const md5 = require('md5');
const axios = require('axios');
const qs = require('querystring');

class KuaiDiNiao {
  constructor(appid, appkey, apihost) {
    this.appid = appid;
    this.appkey = appkey;
    this.ReqURL = apihost;
  }

  orderTracesSubByJson(code, logistic) {
    const requestData = '{"ShipperCode":"' + code + '", "LogisticCode":"' + logistic + '"}'
    const params = {};
    params.RequestData = this.urlEncoder(requestData);
    params.EBusinessID = this.appid;
    params.RequestType = '1008';
    const dataSign = this.encrypt(requestData);
    params.DataSign = this.urlEncoder(dataSign);
    params.DataType = '2';
    this.doPost(params);
  }

  encrypt(requestData) {
    const md5Str = md5(requestData + this.appkey);
    const buffer = Buffer.form(md5Str);
    return buffer.toString('base64');
  }

  urlEncoder(data) {
    return encodeURIComponent(data);
  }

  async doPost(params) {
    await axios.post(this.ReqURL + '/api/dist' +
          '/orders?' + qs.stringify(params), '', {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}})
      .then(res => {
        const resJson = res.data;
        console.log(resJson);
      });
  }

}