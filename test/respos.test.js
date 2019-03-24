'use strict';

const assert = require('assert');
const utils = require('./utils');

describe('test/repos.test.js', () => {
  let client;
  let user;
  let group;

  before(() => {
    user = 'globaltest';
    group = 'node-yuque';
    client = utils.getInstance();
  });

  it('should list by user', async () => {
    const data = await client.repos.list({
      user,
      data: { type: 'Book', include_membered: true, offset: 0 },
    });
    assert(data.length >= 1);
  });

  it('should list by group', async () => {
    const data = await client.repos.list({
      group,
      data: { type: 'Book', include_membered: true, offset: 0 },
    });
    assert(data.length === 1);
    const list = data.map(x => x.namespace);
    assert(list.includes('node-yuque/book'));
  });

  it('should create in user and delete', async () => {
    const data = await client.repos.create({
      user,
      data: {
        name: 'unittest for sdk',
        slug: 'unittest',
        description: 'auto created by unittest',
        public: 2,
        type: 'Book',
      },
    });
    assert(data.slug === 'unittest');

    const deleteData = await client.repos.delete({ namespace: `${user}/unittest` });
    assert(deleteData.slug === 'unittest');
  });

  it('should create in group and delete', async () => {
    const description = `auto created by unittest(${Date.now()})`;
    const data = await client.repos.create({
      group,
      data: {
        name: 'unittest for sdk',
        slug: 'unittest',
        description,
        public: 2,
        type: 'Book',
      },
    });
    assert(data.slug === 'unittest');
    assert(data.description === description);

    const deleteData = await client.repos.delete({ namespace: `${group}/unittest` });
    assert(deleteData.slug === 'unittest');
    assert(deleteData.description === description);
  });

  it('should get()', async () => {
    const data = await client.repos.get({ namespace: 'yuque/developer' });
    assert(data.slug === 'developer');
    assert(data.type === 'Book');
    assert(data.toc);
  });

  it('should update()', async () => {
    const description = `单元测试，请勿删除(${Date.now()})`;

    const data = await client.repos.update({
      namespace: `${group}/book`,
      data: { description },
    });
    assert(data.description === description);

    const info = await client.repos.get({ namespace: `${group}/book` });
    assert(info.description === description);
  });

  it('should get toc', async () => {
    const title = `QuickStart(${Date.now()})`;
    await client.repos.update({
      namespace: `${group}/book`,
      data: { toc: `- [${title}](quickstart)` },
    });
    const data = await client.repos.getTOC({ namespace: `${group}/book` });
    assert(data[0].title === title);
    assert(data[0].slug === 'quickstart');
    assert(data[0].depth === 1);
  });

  it('should search()', async () => {
    const data = await client.repos.search({ q: '语雀', type: 'Book' });
    assert(data.length > 1);
    const list = data.map(x => x.namespace);
    assert(list.includes('yuque/help'));
  });
});
