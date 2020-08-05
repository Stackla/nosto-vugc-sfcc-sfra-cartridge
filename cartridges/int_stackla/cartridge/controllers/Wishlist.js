'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('AddProduct', function (req, res, next) {
    var stacklaHelper = require('*/cartridge/scripts/helpers/stacklaHelpers');

    var productId = req.form.pid;
    var quantity = 1;
    var eventId = 'add_to_wishlist';
    var stacklaTrackingPixel = stacklaHelper.getTrackingPixel(productId, quantity, eventId);

    res.json({
        isStacklaEnabled: stacklaTrackingPixel.isStacklaEnabled,
        stacklaTrackingPixelImg: stacklaTrackingPixel.trackingPixelImg
    });

    next();
});

module.exports = server.exports();
