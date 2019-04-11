# ![](./logo.png)

Node SDK for [yuque](https://www.yuque.com/yuque/developer/api)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@yuque/sdk.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@yuque/sdk
[travis-image]: https://img.shields.io/travis/yuque/sdk.svg?style=flat-square
[travis-url]: https://travis-ci.org/yuque/sdk
[codecov-image]: https://codecov.io/gh/yuque/sdk/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/yuque/sdk
[david-image]: https://img.shields.io/david/yuque/sdk.svg?style=flat-square
[david-url]: https://david-dm.org/yuque/sdk
[snyk-image]: https://snyk.io/test/npm/@yuque/sdk/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@yuque/sdk
[download-image]: https://img.shields.io/npm/dm/@yuque/sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/@yuque/sdk

## Install

```bash
npm i @yuque/sdk --save
```

## Usage

```js
const SDK = require('@yuque/sdk');
const client = new SDK({
  token: '<YOUR TOKEN>',
  // other options
});

const result = await client.users.get();
console.log(result);

// apis
const { users, groups, repos, docs } = client;
```

## Options

```js
/**
 * @param {Object} options - opts
 * @param {String} options.token - yuque token, https://www.yuque.com/settings/tokens
 * @param {String} [options.endpoint] - yuque endpoint
 * @param {String} [options.userAgent] - request user-agent
 * @param {Object} [options.requestOpts] - default request options of [urllib](https://www.npmjs.com/package/urllib)
 * @param {Function} [options.handler] - special how to handler response
 */
```

by default, will return `response.data.data`, you can custom it by `handler`:

```js
new SDK({
  handler(res) {
    // should handler error yourself
    if (res.status !== 200) {
      const err = new Error(res.data.message);
      /* istanbul ignore next */
      err.status = res.data.status || res.status;
      err.code = res.data.code;
      err.data = res;
      throw err;
    }
    // return whatever you want
    const { data, abilities } = res.data;
    return data;
  },
});
```

## Debug

```js
$ http_proxy=http://127.0.0.1:8888 TOKEN=<YOUR_TOKEN> npm test
```

## API

see [Yuque API Docs](https://www.yuque.com/yuque/developer/api) for more details.

### users

see the source.

### groups

see the source.

### repos

see the source.

### docs

see the source.

## TODO

- [ ] API docs
- [ ] JSDocs definition for result info
- [ ] add `d.ts` or refactor to TypeScript
