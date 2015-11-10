'use strict';

var _ = require('lodash');

var updateDimensions = function(backgrounds, size, width, height, crop) {
    // This regex looks for a path param (leading slash included and
    // file name) starting with s, w, or h and then some decimals, and
    // might have -'s in there or other characters, but not slashes.
    // This has been tested to match with real world size encoding
    // slugs and re-written ones, eg:
    //     w1280-s128-c-h720
    //     s2560
    //     s1280-w1280-c-h720-k-no
    var regex = /\/[swh]\d+\-?[^/]*\/([^/]+\.\w+)$/;
    var dimensions = [];

    // We give priority to the size argument over the width and height arguments
    if (size) {
        dimensions.push('s' + size);
    }
    if (width) {
        dimensions.push('w' + width);
    }
    if (height) {
        dimensions.push('h' + height);
    }
    if (crop) {
        dimensions.push('c');
    }
    if (!dimensions.length) {
        return;
    }
    var outputString = '/' + dimensions.join('-') + '/$1';
    _.each(backgrounds, function(backgroundEntry) {
        backgroundEntry.url = backgroundEntry.url.replace(regex, outputString);
    });
};

module.exports = updateDimensions;