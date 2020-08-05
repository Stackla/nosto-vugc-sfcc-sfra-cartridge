'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Confirm', function (req, res, next) {
    var stacklaHelper = require('*/cartridge/scripts/helpers/stacklaHelpers');
    var viewData = res.getViewData();

    viewData.stacklaTracking = stacklaHelper.getTrackingData(viewData.order.items.items);
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
