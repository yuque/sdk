'use strict';

const assert = require('assert');

class Repo {
  constructor({ client }) {
    this.client = client;
  }

  /**
   * list repos of user or group
   * @param {Object} args - params
   * @param {String} [args.user] - user login or id
   * @param {String} [args.group] - group login or id
   * @param {Object} [args.data] - query obj
   * @param {String} [args.data.type] - repo type, `Book` / `Design` / `Column` / `all`
   * @param {Boolean} [args.data.include_membered] - whether include your group member created
   * @param {Number} [args.data.offset] - limit offset, each page is 20.
   * @return {Promise<RepoInfo[]>} return repos
   */
  async list({ user, group, data }) {
    assert(user || group, 'user or group is required');
    const api = user ? `users/${user}/repos` : `groups/${group}/repos`;
    return this.client.request(api, { method: 'GET', data });
  }

  /**
   * create repo
   * @param {Object} args - params
   * @param {String} [args.user] - user login or id
   * @param {String} [args.group] - group login or id
   * @param {Object} args.data - repo info
   * @param {String} args.data.name - repo name
   * @param {String} args.data.slug - repo slug
   * @param {String} args.data.type - repo type, `Book` / `Design` / `Column`
   * @param {String} [args.data.description] - repo description
   * @param {Number} [args.data.public] - `0` as private, `1` as bussiness public, `2` as global public
   * @return {Promise<RepoInfo>} return repo info
   */
  async create({ user, group, data }) {
    assert(user || group, 'user or group is required');
    const api = user ? `users/${user}/repos` : `groups/${group}/repos`;
    return this.client.request(api, { method: 'POST', data });
  }

  /**
   * get repo info
   * @param {Object} args - params
   * @param {String|Number} args.namespace - repo namespace or id
   * @param {Object} args.data - query info
   * @param {String} [args.data.type] - repo type, `Book` / `Design` / `Column`
   * @return {Promise<RepoInfo>} return repo info
   */
  async get({ namespace, data }) {
    assert(namespace, 'namespace is required');
    return this.client.request(`repos/${namespace}`, { method: 'GET', data });
  }

  /**
   * update repo
   * @param {Object} args - params
   * @param {String|Number} args.namespace - repo namespace or id
   * @param {Object} args.data - repo info
   * @param {String} [args.data.name] - repo name
   * @param {String} [args.data.slug] - repo slug
   * @param {String} [args.data.toc] - resp toc, as a markdown list
   * @param {String} [args.data.description] - repo description
   * @param {Number} [args.data.public] - `0` as private, `1` as bussiness public, `2` as global public
   * @return {Promise<RepoInfo>} return repo info
   */
  async update({ namespace, data }) {
    assert(namespace, 'namespace is required');
    return this.client.request(`repos/${namespace}`, { method: 'PUT', data });
  }

  /**
   * delete repo
   * @param {Object} args - params
   * @param {String|Number} args.namespace - repo namespace or id
   * @return {Promise<RepoInfo>} return repo info
   */
  async delete({ namespace }) {
    assert(namespace, 'namespace is required');
    return this.client.request(`repos/${namespace}`, { method: 'DELETE' });
  }

  /**
   * get repo toc
   * @param {Object} args - params
   * @param {String|Number} args.namespace - repo namespace or id
   * @return {Promise<TocInfo[]>} return toc info, `[{ title, slug, depth }, ...]`
   */
  async getTOC({ namespace }) {
    assert(namespace, 'namespace is required');
    return this.client.request(`repos/${namespace}/toc`, { method: 'GET' });
  }

  /**
   * search repos
   * @param {Object} data - query info
   * @param {String} data.q - fuzzy search repo title
   * @param {String} data.type - repo type, `Book` / `Design` / `Column`
   * @return {Promise<RepoInfo[]>} return repos
   */
  async search(data) {
    assert(data && data.q, '`data.q` is required');
    return this.client.request('search/repos', { data });
  }
}

module.exports = Repo;
