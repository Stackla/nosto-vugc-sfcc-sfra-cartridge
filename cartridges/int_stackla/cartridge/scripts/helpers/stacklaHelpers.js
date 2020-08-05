'use strict';

/**
 * Formats order data for the Stackla Tracking Pixel
 *
 * @param {Object} order - Items from the order model
 *
 * @returns {Object} The formatted data
 */
function getTrackingData(order) {
    var Site = require('dw/system/Site');
    var isStacklaEnabled = Site.getCurrent().getCustomPreferenceValue('stacklaTrackingEnabled');

    var products = [];
    var quantities = [];
    var prices = [];
    var currency = '';

    if (isStacklaEnabled) {
        currency = order[0].totalPrice.currencyCode;

        for (var i = 0; i < order.length; i++) {
            var product = order[i];
            products.push(product.id);
            quantities.push(product.quantity);
            prices.push(product.totalPrice.value);
        }
    }

    var stacklaData = {
        product: products.join(','),
        quantity: quantities.join(','),
        price: prices.join(','),
        currency: currency
    };

    return stacklaData;
}

/**
 * Builds Stackla Tracking Pixel Image
 *
 * @param {string} productId - Product ID
 * @param {integer} quantity - Quantity
 * @param {string} eventId - Tracking Event ID
 *
 * @returns {string} The tracking pixel image
 */
function getTrackingPixel(productId, quantity, eventId) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var Site = require('dw/system/Site');

    var isStacklaEnabled = Site.getCurrent().getCustomPreferenceValue('stacklaTrackingEnabled');
    var trackingPixelImg;

    if (isStacklaEnabled) {
        var product = ProductMgr.getProduct(productId);

        trackingPixelImg = '<img src="' + Site.getCurrent().getCustomPreferenceValue('stacklaTrackingPixelUrl')
            + '?product_id=' + productId
            + '&event=' + eventId
            + '&ext_currency=' + product.priceModel.price.currencyCode
            + '&ext_quantity=' + quantity
            + '&ext_price=' + product.priceModel.price.value + '" width="1px" height="1px" />';
    }

    return {
        isStacklaEnabled: isStacklaEnabled,
        trackingPixelImg: trackingPixelImg
    };
}

module.exports = {
    getTrackingData: getTrackingData,
    getTrackingPixel: getTrackingPixel
};
