'use strict';
var base = require('base/product/detail');
var productBase = require('./base');
var exports = {};
exports.addToCart = productBase.addToCart;
module.exports = $.extend(true, {}, base, exports);
