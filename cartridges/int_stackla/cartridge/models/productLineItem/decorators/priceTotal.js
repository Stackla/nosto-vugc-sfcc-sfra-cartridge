'use strict';

var base = module.superModule;

module.exports = function (object, lineItem) {
    base.call(this, object, lineItem);

    Object.defineProperty(object, 'totalPrice', {
        enumerable: true,
        value: lineItem.adjustedPrice
    });
};
