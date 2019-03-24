'use strict';

const assert = require('assert');
const utils = require('./utils');

describe('test/client.test.js', () => {
  let client;

  it('should options.handler', async () => {
    client = utils.getInstance({
      handler(res) {
        return res.data;
      },
    });
    const { data } = await client.users.get();
    assert(data.id === 201213);
  });

  it('should 404', async () => {
    client = utils.getInstance();
    try {
      await client.users.get({ login: Date.now() });
      throw new Error('should not run here');
    } catch (err) {
      assert(err.message === 'Not Found');
      assert(err.status === 404);
    }
  });
});
