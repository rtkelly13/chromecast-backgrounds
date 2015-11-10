'use strict';

var assert = require('assert'),
    _ = require('lodash'),
    getChromecastBackgrounds = require('../lib/parseChromecastHome'),
    getNameFromUrl = require("../lib/getNameFromUrl"),
    endsWith = require('../lib/stringEndsWith');

it('should get some background objects', function(cb) {
    getChromecastBackgrounds().then(function (backgrounds) {
        assert(backgrounds);
        var background = backgrounds[0];
        assert(_.has(background, 'url', 'author'));
        var filename = getNameFromUrl(background.url);
        assert(background.url.indexOf('googleusercontent') > 0);
        assert(endsWith(filename, '.jpg'))
        cb();
    }).done();
});



