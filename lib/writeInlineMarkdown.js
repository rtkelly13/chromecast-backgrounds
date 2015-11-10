'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    write = fs.writeFileSync;

var writeInlineMarkdown = function(filename, backgrounds) {
    var content = '';
    _(backgrounds).each(function(backgroundEntry) {
        content += '![]('+backgroundEntry.url+')\n';
    });
    write(filename, content);
};

module.exports = writeInlineMarkdown;