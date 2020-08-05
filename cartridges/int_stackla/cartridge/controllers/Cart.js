'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('AddProduct', function (req, res, next) {
    var stacklaHelper = require('*/cartridge/scripts/helpers/stacklaHelpers');

    var productId = req.form.pid;
    var quantity = parseInt(req.form.quantity, 10);
    var eventId = 'add_to_cart';
    var stacklaTrackingPixel = stacklaHelper.getTrackingPixel(productId, quantity, eventId);

    res.json({
        isStacklaEnabled: stacklaTrackingPixel.isStacklaEnabled,
        stacklaTrackingPixelImg: stacklaTrackingPixel.trackingPixelImg
    });

    next();
});

module.exports = server.exports();
