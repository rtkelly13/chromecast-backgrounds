'use strict';

var endsWith = require('./stringEndsWith');
    
var getNameFromURL = function(url) {
    var split = url.split('/'),
        lastString = split.pop(),
        lastStringIsImage = endsWith(lastString, '.jpg');
        
    if(!lastStringIsImage){
        lastString += '.jpg';
    }
    return decodeURIComponent(lastString);
};

module.exports = getNameFromURL;