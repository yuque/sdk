'use strict';

const assert = require('assert');
const utils = require('./utils');

describe('test/docs.test.js', () => {
  let client;
  let namespace;

  before(() => {
    namespace = 'node-yuque/book';
    client = utils.getInstance();
  });

  it('should list docs', async () => {
    const data = await client.docs.list({ namespace });
    assert(data.length >= 1);
    const list = data.map(x => x.slug);
    assert(list.includes('quickstart'));
  });

  it('should get doc detail', async () => {
    const data = await client.docs.get({ namespace, slug: 'quickstart', data: { raw: 1 } });
    assert(data.title.includes('QuickStart'));
    assert(data.body.includes('auto created by unittest'));

    const doc = await client.docs.get({ namespace, slug: data.id, data: { raw: 1 } });
    assert(doc.title.includes('QuickStart'));
    assert(doc.body.includes('auto created by unittest'));
  });

  it('should create and delete', async () => {
    const title = `a doc auto created by unittest(${Date.now()})`;
    const data = await client.docs.create({
      namespace,
      data: {
        title,
        slug: 'unittest_create',
        public: 1,
        body: '**auto created by unittest, this is body**',
      },
    });
    assert(data.title === title);
    assert(data.body.includes('auto created by unittest'));

    const deleteData = await client.docs.delete({ namespace, id: data.id });
    assert(deleteData.slug === 'unittest_create');
    assert(deleteData.title === title);
  });

  it('should update', async () => {
    const doc = await client.docs.get({ namespace, slug: 'quickstart' });
    const body = `**auto created by unittest, this is body(${Date.now()})**`;
    const data = await client.docs.update({
      namespace,
      id: doc.id,
      data: {
        body,
      },
    });
    assert(data.body === body);
  });
});
