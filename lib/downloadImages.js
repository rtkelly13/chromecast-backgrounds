'use strict';

var chalk = require('chalk'),
    async = require('async'),
    fs = require('fs'),
    Q = require('q'),
    request = require('request'),
    getNameFromUrl = require('./getNameFromUrl');

var downloadBackgrounds = function(backgrounds, directory, parallelism) {
    var directoryExists = fs.existsSync(directory);
    if(!directoryExists){
        fs.mkdirSync(directory);
    }
    //batched up into groups of 10 or user specified value
    var deferredFinish = Q.defer();
    
    async.eachLimit(backgrounds, parallelism, function(backgroundEntry, callback){
        var filename = directory + '/' + getNameFromUrl(backgroundEntry.url),
        requestedFile = request(backgroundEntry.url);
        requestedFile.pipe(fs.createWriteStream(filename))
            .on('close', function() {
                console.log(chalk.grey(filename));
                callback(null);
            })
            .on('error', function(err){
                var error = 'Error downloading file: ' + filename + ', ' + err; 
                console.log(chalk.red(error));
                callback(err);
            });  
    }, function(err){
        if(err){
            console.log(chalk.red(err));
            deferredFinish.reject(err);
        } else{
            deferredFinish.resolve();
        }
    }); 
    
    return deferredFinish.promise;
};

module.exports = downloadBackgrounds;