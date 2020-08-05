'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('./product/detail'));
    // Uncomment the following line to enable use with plugin_wishlists cartridge
    // processInclude(require('./product/wishlist'));
});
