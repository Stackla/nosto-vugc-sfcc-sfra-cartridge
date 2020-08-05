'use strict';

var Calendar = require('dw/util/Calendar');
var Site = require('dw/system/Site');
var StringUtils = require('dw/util/StringUtils');

var DATE_FORMAT = 'yyyy-MM-dd';
var DATETIME_FORMAT = 'yyyy-MM-dd_HH-mm-ss-SSS';


/**
 * Replace some placeholders found in the given path by dynamic values
 * Available placeholders:
 * _today_ : Will be the current date
 * _now_ : Will be the current date time
 * _siteid_ : Will be the current site ID
 *
 * @param {string} path Path
 *
 * @returns {string} Path
 */
module.exports.replacePathPlaceholders = function (path) {
    if (empty(path)) {
        return path;
    }

    var siteID = Site.getCurrent().getID();
    var calendar = new Calendar();
    var newPath = path;

    if (path.indexOf('_today_') > -1) {
        newPath = path.replace(/_today_/, StringUtils.formatCalendar(calendar, DATE_FORMAT));
    }
    if (path.indexOf('_now_') > -1) {
        newPath = path.replace(/_now_/, StringUtils.formatCalendar(calendar, DATETIME_FORMAT));
    }
    if (path.indexOf('_siteid_') > -1) {
        newPath = path.replace(/_siteid_/, siteID);
    }

    return newPath;
};
