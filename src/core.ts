import type { YuqueClientOptions } from './type';
import Client from './client';
import User from './user';
import Group from './group';
import Repo from './repo';
import Doc from './doc';

/**
 * Yuque SDK
 * @class
 */
class Yuque {
  options: YuqueClientOptions;
  _client!: Client;

  users: User;
  groups: Group;
  repos: Repo;
  docs: Doc;

  constructor(options: YuqueClientOptions) {
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

export default Yuque;
