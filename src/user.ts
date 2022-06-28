'use strict';

import { ApiBase, UserInfo } from './type';

class User extends ApiBase {
  /**
   * get user info of special login, or get current user info of token
   * @param {Object} args - params
   * @param {String} [args.login] - user login or id
   * @return {Promise<UserInfo>} return user info
   */
  async get({ login }: { login?: number } = {}) {
    const api = login ? `users/${login}` : 'user';
    return this.client.request<UserInfo>(api, { method: 'GET' });
  }
}

export default User;
