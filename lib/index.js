'use strict';

const Client = require('./client');
const User = require('./user');
const Group = require('./group');
const Repo = require('./repo');
const Doc = require('./doc');

/**
 * Yuque SDK
 */
class Yuque {
  /**
   * @param {Object} options - opts
   * @param {String} options.token - yuque token, https://www.yuque.com/settings/tokens
   * @param {String} [options.endpoint] - yuque endpoint
   * @param {String} [options.userAgent] - request user-agent
   * @param {Object} [options.requestOpts] - default request options of [urllib](https://www.npmjs.com/package/urllib)
   * @param {Function} [options.handler] - special how to handler response
   */
  constructor(options) {
    this.options = options;

    const client = new Client(this.options);
    this._client = client;

    /**
     * @member users
     */
    this.users = new User({ client });

    /**
     * @member groups
     */
    this.groups = new Group({ client });

    /**
     * @member repos
     */
    this.repos = new Repo({ client });

    /**
     * @member docs
     */
    this.docs = new Doc({ client });
  }
}

module.exports = Yuque;
