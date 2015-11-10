'use strict';

var endsWith = function(value, suffix){
    return value.indexOf(suffix, value.length - suffix.length) !== -1;
};

module.exports = endsWith;