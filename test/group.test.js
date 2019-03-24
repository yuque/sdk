'use strict';

const assert = require('assert');
const utils = require('./utils');

describe('test/group.test.js', () => {
  let client;
  let user;
  let id;

  before(() => {
    id = '201213';
    user = 'globaltest';
    client = utils.getInstance();
  });

  it('should list groups', async () => {
    const data = await client.groups.list();
    assert(data.length >= 1);
  });

  it('should list groups by user', async () => {
    const data = await client.groups.list({ login: user });
    assert(data.length >= 1);
    const list = data.map(x => x.login);
    assert(list.includes('node-yuque'));
  });

  it('should list groups by user id', async () => {
    const data = await client.groups.list({ login: id });
    assert(data.length >= 1);
    const list = data.map(x => x.name);
    assert(list.includes('node-yuque-unittest'));
  });

  it('should get', async () => {
    const data = await client.groups.get({ login: 'node-yuque' });
    assert(data.name === 'node-yuque-unittest');
  });

  it('should get by group id', async () => {
    const data = await client.groups.get({ login: 298127 });
    assert(data.login === 'node-yuque');
    assert(data.name === 'node-yuque-unittest');
  });

  it('should create and delete', async () => {
    const name = `a group auto created by unittest(${Date.now()})`;
    const data = await client.groups.create({
      data: {
        name,
        login: 'unittest_group',
        description: 'auto created by unittest',
      },
    });
    assert(data.name === name);

    const deleteData = await client.groups.delete({ login: 'unittest_group' });
    assert(deleteData.name === name);
  });

  it('should update', async () => {
    const description = `单元测试，请勿删除(${Date.now()})`;
    const data = await client.groups.update({
      login: 'node-yuque',
      data: {
        description,
      },
    });
    assert(data.description === description);
  });

  it('should list users', async () => {
    const data = await client.groups.listUser({ login: 'node-yuque' });
    assert(data.length >= 1);
    const list = data.map(x => x.user.login);
    assert(list.includes(user));
  });

  it('should add and remove user', async () => {
    const data = await client.groups.addUser({ group: 'node-yuque', user: 'globaltest1', data: { role: 1 } });
    assert(data.user_id === 298555);
    const removeData = await client.groups.removeUser({ group: 'node-yuque', user: 'globaltest1' });
    assert(removeData.user_id === 298555);
  });
});
