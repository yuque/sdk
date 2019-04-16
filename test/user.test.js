'use strict';

const assert = require('assert');
const utils = require('./utils');

describe('test/user.test.js', () => {
  let client;

  before(() => {
    client = utils.getInstance();
  });

  it('should get user info', async () => {
    const data = await client.users.get({ login: 'globaltest1' });
    assert(data.id === 298555);
  });

  it('should get self info', async () => {
    const data = await client.users.get();
    assert(data.id === 201213);
  });
});
