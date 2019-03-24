'use strict';

const assert = require('assert');
const utils = require('./utils');

describe('test/user.test.js', () => {
  let client;

  before(() => {
    client = utils.getInstance();
  });

  it('should get user info', async () => {
    const data = await client.users.get({ login: 'atian25' });
    assert(data);
  });

  it('should get self info', async () => {
    const data = await client.users.get();
    assert(data.id === 201213);
  });

  it('should listDocs', async () => {
    const data = await client.users.listDocs();
    assert(data.length >= 1);
    assert(data[0].slug);
  });

  it('should listDocs', async () => {
    const data = await client.users.listDocs();
    assert(data.length >= 1);
    assert(data[0].slug);
  });

  it('should listDocs by title', async () => {
    const data = await client.users.listDocs({ q: 'Quick' });
    assert(data.length >= 1);
    const list = data.map(x => x.slug);
    assert(list.includes('quickstart'));
  });

  it('should listRecentUpdated Doc', async () => {
    const data = await client.users.listRecentUpdated({ type: 'Doc' });
    assert(data.length >= 1);
    assert(data[0].book_id);
  });

  it('should listRecentUpdated Book', async () => {
    const data = await client.users.listRecentUpdated({ type: 'Book' });
    assert(data.length >= 1);
    assert(data[0].type === 'Book');
  });
});
