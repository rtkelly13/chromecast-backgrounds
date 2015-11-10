'use strict';

var fs = require('fs'),
    write = fs.writeFileSync;

var saveObjectToFile = function(filename, content) {
    var jsonString = JSON.stringify(content, null, 4);
    write(filename, jsonString);
};

module.exports = saveObjectToFile;