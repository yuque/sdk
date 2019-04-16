'use strict';

class User {
  constructor({ client }) {
    this.client = client;
  }
  /**
   * get user info of special login, or get current user info of token
   * @param {Object} args - params
   * @param {String} [args.login] - user login or id
   * @return {Promise<UserInfo>} return user info
   */
  async get({ login } = {}) {
    const api = login ? `users/${login}` : 'user';
    return this.client.request(api, { method: 'GET' });
  }
}

module.exports = User;
