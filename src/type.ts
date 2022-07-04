import type { HttpClientResponse } from 'urllib';
import Client from './client';

export type YuqueClientOptions = {
  /**
   * yuque token, https://www.yuque.com/settings/tokens
   */
  token: string;
  /**
   * yuque endpoint
   */
  endpoint?: string;
  /**
   * request user-agent
   */
  userAgent?: string;
  /**
   * default request options of [urllib](https://www.npmjs.com/package/urllib)
   */
  requestOpts?: string;
  /**
   * special how to handler response
   */
  handler?: (req: HttpClientResponse<any>) => Promise<any>;
};

/**
 * @see https://www.yuque.com/yuque/developer/userserializer
 */
export type UserInfo = {
  id: number;
  type: 'User' | 'Group';
  login: string;
  name: string;
  description: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
};

/**
 *
 */
export type GroupInfo = {
  id: number;
  login: string;
  name: string;
  description: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
};

/**
 * @see https://www.yuque.com/yuque/developer/groupuserserializer
 */
export type GroupUser = {
  id: number;
  group_id: number;
  group: UserInfo;
  user_id: number;
  user: UserInfo;
  role: '0' | '1';
  created_at: Date;
  updated_at: Date;
};

export type RepoType = 'Book' | 'Design' | 'Column' | 'all';

/**
 * @see https://www.yuque.com/yuque/developer/bookdetailserializer
 */
export type RepoInfo = {
  id: number;
  type: RepoType;
  slug: string;
  name: string;
  namespace: string;
  user_id: number;
  user: UserInfo;
  description: string;
  toc_yml: string;
  creator_id: number;
  public: 2 | 1 | 0;
  items_count: number;
  likes_count: number;
  watches_count: number;
  created_at: Date;
  updated_at: Date;
};

export type TocInfo = {
  title: string;
  slug: string;
  depth: number;
};

/**
 * @see https://www.yuque.com/yuque/developer/bookserializer
 */
export type BookInfo = {
  id: number;
  type: 'Book';
  slug: string;
  name: string;
  namespace: string;
  user_id: number;
  user: UserInfo;
  description: string;
  public: 2 | 1 | 0;
  likes_count: number;
  watches_count: number;
  created_at: Date;
  updated_at: Date;
};

/**
 * @see https://www.yuque.com/yuque/developer/docserializer
 */
export type DocInfo = {
  id: number;
  slug: string;
  title: string;
  user_id: number;
  format: 'asl' | 'markdown';
  public: 2 | 1 | 0;
  status: 1 | 0;
  likes_count: number;
  comments_count: number;
  content_updated_at: Date;
  book: BookInfo;
  user: UserInfo;
  last_editor: UserInfo;
  created_at: Date;
  updated_at: Date;
};

export class RequestError extends Error {
  status?: number;
  code?: number;
  data?: any;
}

export class ApiBase {
  client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }
}
