'use strict';

const Yuque = require('..');

/**
 * @param {Object} [options] - init options
 * @return {Yuque} instance
 */
exports.getInstance = options => {
  return new Yuque(Object.assign({
    token: process.env.TOKEN,
  }, options));
};

