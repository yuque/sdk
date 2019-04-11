'use strict';

const assert = require('assert');
const httpclient = require('urllib');
const extend = require('extend2');
const debug = require('debug')('yuque');

class Client {
  constructor(options) {
    // endpoint, token, userAgent
    this.options = Object.assign({
      endpoint: 'https://www.yuque.com/api/v2/',
      userAgent: '@yuque/sdk',
    }, options);

    assert(this.options.token, 'token is required');
  }

  /**
   * send api request to yuque
   * @param {String} api - API url, DO NOT startWiths `/`
   * @param {Object} opts - request options
   * @return {Promise<Object>} response
   */
  async request(api, opts) {
    const { endpoint, token, userAgent, requestOpts, handler } = this.options;

    const url = `${endpoint}${api}`;
    opts = extend(true, {
      method: 'GET',
      contentType: 'json',
      dataType: 'json',
      headers: {
        'User-Agent': userAgent,
        'X-Auth-Token': token,
      },
      gzip: true,

      // proxy
      rejectUnauthorized: !process.env.http_proxy,
      enableProxy: !!process.env.http_proxy,
      proxy: process.env.http_proxy,
    }, requestOpts, opts);

    debug(`${opts.method} ${url}`);

    const res = await httpclient.request(url, opts);
    debug('response', res.data);

    // custom response
    if (handler) return handler(res);

    // default handler
    if (res.status !== 200) {
      const err = new Error(res.data.message);
      /* istanbul ignore next */
      err.status = res.data.status || res.status;
      err.code = res.data.code;
      err.data = res;
      throw err;
    }

    return res.data.data;
  }
}

module.exports = Client;
