'use strict';

const SDK = require('..');

exports.getInstance = options => {
  return new SDK(Object.assign({
    token: process.env.TOKEN,
  }, options));
};

