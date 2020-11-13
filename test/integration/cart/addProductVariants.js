var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

describe('Add Product variants to cart', function () {
    this.timeout(5000);

    it('should add variant, append Stackla data', function () {
        var cookieJar = request.jar();

        // The myRequest object will be reused through out this file. The 'jar' property will be set once.
        // The 'url' property will be updated on every request to set the product ID (pid) and quantity.
        // All other properties remained unchanged.
        var myRequest = {
            url: '',
            method: 'POST',
            rejectUnauthorized: false,
            resolveWithFullResponse: true,
            jar: cookieJar,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        var variantPid1 = '013742002799M';
        var qty1 = 1;
        var addProd = '/Cart-AddProduct';

        // ----- adding product #1:
        myRequest.url = config.baseUrl + addProd;
        myRequest.form = {
            pid: variantPid1,
            quantity: qty1
        };

        return request(myRequest)
            .then(function (response) {
                assert.equal(response.statusCode, 200);

                var bodyAsJson = JSON.parse(response.body);
                var expectedStacklaData = {
                    isStacklaEnabled: true,
                    stacklaTrackingPixelImg: '<img src="https://stp.stack.la/record.png?product_id=013742002799M&event=add_to_cart&ext_currency=USD&ext_quantity=1&ext_price=30" width="1px" height="1px" />'

                };
                assert.containSubset(bodyAsJson.isStacklaEnabled, expectedStacklaData.isStacklaEnabled);
                assert.containSubset(bodyAsJson.stacklaTrackingPixelImg, expectedStacklaData.stacklaTrackingPixelImg);
            });
    });
});
