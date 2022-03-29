'use strict';

const assert = require('assert');

class Group {
  constructor({ client }) {
    this.client = client;
  }
  /**
   * list groups
   * @param {Object} args - params
   * @param {String} [args.login] - user login or id
   * @return {Promise<GroupInfo[]>} return groups
   */
  async list({ login } = {}) {
    const api = login ? `users/${login}/groups` : 'groups';
    return this.client.request(api, { method: 'GET' });
  }

  /**
   * create group
   * @param {Object} args - params
   * @param {Object} args.data - group info
   * @param {String} args.data.name - group name
   * @param {String} args.data.login - group login
   * @param {String} [args.data.description] - group description
   * @return {Promise<GroupInfo>} return group info
   */
  async create({ data }) {
    assert(data, 'data is required');
    assert(data.name, 'data.name is required');
    assert(data.login, 'data.login is required');
    return this.client.request('groups', { method: 'POST', data });
  }

  /**
   * get group detail info
   * @param {Object} args - params
   * @param {String} args.login - group login or id
   * @return {Promise<GroupInfo>} return group info
   */
  async get({ login }) {
    assert(login, 'group login or id is required');
    return this.client.request(`groups/${login}`, { method: 'GET' });
  }

  /**
   * update group info
   * @param {Object} args - params
   * @param {Object} args.login - group login or id
   * @param {Object} args.data - group info
   * @param {String} [args.data.name] - group name
   * @param {String} [args.data.login] - group login
   * @param {String} [args.data.description] - group description
   * @return {Promise<GroupInfo>} return group info
   */
  async update({ login, data }) {
    assert(login, 'group login or id is required');
    return this.client.request(`groups/${login}`, { method: 'PUT', data });
  }

  /**
   * delete group
   * @param {Object} args - params
   * @param {Object} args.login - group login or id
   * @return {Promise<GroupInfo>} return group info
   */
  async delete({ login }) {
    assert(login, 'group login or id is required');
    return this.client.request(`groups/${login}`, { method: 'DELETE' });
  }

  /**
   * list users of group
   * @param {Object} args - params
   * @param {Object} args.login - group login or id
   * @return {Promise<UserInfo[]>} return group users
   */
  async listUser({ login }) {
    assert(login, 'group login or id is required');
    return this.client.request(`groups/${login}/users`, { method: 'GET' });
  }

  /**
   * add or update user to group
   * @param {Object} args - params
   * @param {Object} args.group - group login or id
   * @param {Object} args.user - user login or id
   * @param {Object} [args.data] - options
   * @param {Object} [args.data.role] - `0` as admin, `1` as normal
   * @return {Promise<UserInfo>} return group user info
   */
  async addUser({ group, user, data }) {
    assert(group, 'group login or id is required');
    assert(user, 'user login or id is required');
    return this.client.request(`groups/${group}/users/${user}`, { method: 'PUT', data });
  }

  /**
   * remove user of group
   * @param {Object} args - params
   * @param {Object} args.group - group login or id
   * @param {Object} args.user - user login or id
   * @return {Promise<UserInfo>} return group user info
   */
  async removeUser({ group, user }) {
    assert(group, 'group login or id is required');
    assert(user, 'user login or id is required');
    return this.client.request(`groups/${group}/users/${user}`, { method: 'DELETE' });
  }
}

module.exports = Group;
