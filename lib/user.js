'use strict';

const assert = require('assert');

class User {
  constructor({ client }) {
    this.client = client;
  }
  /**
   * get user info of special login, or get current user info of token
   * @param {Object} args - params
   * @param {String} [args.login] - user login or id
   * @return {User} return user info
   */
  async get({ login } = {}) {
    const api = login ? `users/${login}` : 'user';
    return this.client.request(api, { method: 'GET' });
  }

  /**
   * list all docs created by yourself
   * @param {Object} [data] - query
   * @param {String} [data.q] - fuzzy search doc title
   * @param {Number} [data.offset] - limit offset, each page is 20.
   * @return {Array<Doc>} return docs
   */
  async listDocs(data) {
    return this.client.request('user/docs', { method: 'GET', data });
  }

  /**
   * list recent updated
   * @param {Object} data - query
   * @param {String} data.type - `Doc` or `Book`
   * @param {Number} [data.offset] - limit offset, each page is 20.
   * @return {Array<Doc|Book>} return docs or books
   */
  async listRecentUpdated(data) {
    assert(data && data.type, '`data.type` is required');
    return this.client.request('user/recent-updated', { method: 'GET', data });
  }
}

module.exports = User;
