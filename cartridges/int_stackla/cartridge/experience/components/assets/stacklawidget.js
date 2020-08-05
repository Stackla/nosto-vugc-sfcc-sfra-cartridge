'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.widgetId = content.widgetid;
    model.filter = content.filter ? content.filter : null;
    model.tags = content.tags ? content.tags : null;
    model.tagGroup = content.taggroup ? content.taggroup : null;
    model.availableProductsOnly = content.availableproductsonly ? content.availableproductsonly : null;
    model.tagsGroupedAs = content.tagsgroupedas ? content.tagsgroupedas : null;
    model.ttl = content.ttl;

    return new Template('experience/components/stacklaWidget').render(model).text;
};
