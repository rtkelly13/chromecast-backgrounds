'use strict';

var Q = require('q'),
    request = Q.denodeify(require('request')),
    chromecastHomeURL = 'https://clients3.google.com/cast/chromecast/home',
    initJSONStateRegex = /(JSON\.parse\('.+'\))\)\./;

var parseChromecastHome = function(htmlString) {
    var matches = htmlString.match(initJSONStateRegex),
    JSONParse = matches[1],
    initState = eval(JSONParse), // I don't know why this is ok but JSON.parse fails
    parsedBackgrounds = [];
    for (var i in initState[0]) {
        var backgroundEntry = {
            url: initState[0][i][0],
            author: initState[0][i][1]
        };
        parsedBackgrounds.push(backgroundEntry);
    }
    return parsedBackgrounds;
};

module.exports = function() {
    return request(chromecastHomeURL).then(function(requestResult) {
        return parseChromecastHome(requestResult[1]);
    });
};
