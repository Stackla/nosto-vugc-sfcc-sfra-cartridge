'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('base/search/search'));
    processInclude(require('./product/quickView'));
    // Uncomment the following line to enable use with plugin_wishlists cartridge
    // processInclude(require('./product/wishlistHeart'));
});
