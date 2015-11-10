'use strict';

var assert = require('assert'),
    _ = require('lodash'),
    getNameFromUrl = require("../lib/getNameFromUrl"),
    endsWith = require("../lib/stringEndsWith"),
    noImageUrl = 'https://lh3.googleusercontent.com/8Ti3fem5Ac99IogobM3mww26TJx4lv_AaLPfOq40JTXMGloLYyGX=w1280-h720-p-k-no-nd-mv',
    imageUrl = 'https://lh3.googleusercontent.com/-RlfJ0R-YrQw/VaQdcT-fBPI/AAAAAAABFfM/9jBODPUi0Zs/s1280-w1280-c-h720-k-no/frostyhydrangea.jpg'

it('should end with jpg, noImageUrl', function(cb) {
    var fileName = getNameFromUrl(noImageUrl)
    assert(endsWith(fileName, '.jpg'))
    cb()
});

it('should end with jpg, imageUrl', function(cb) {
    var fileName = getNameFromUrl(imageUrl)
    assert(endsWith(fileName, '.jpg'))
    cb()
});