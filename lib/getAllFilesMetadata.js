'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    Q = require('q'),
	async = require('async'),
	chalk = require('chalk'),
	getAllFiles = require('./getAllFiles');
	
var getFileInfo = function(file, callback){
	//console.log(chalk.gray('Getting file info for file with path: ' + file.path));
	fs.stat(file.path, function(err, fileInfo){
		if(err){
			callback(err);
		}else{
			//console.log(chalk.green("Successfully gathered file info with path: " + file.path))
			file.fileInfo = fileInfo;
			callback(null, file);
		}
	});
};

var getAllFileMetadata = function(directory, parallelism){
	var deferred = Q.defer();
	
	getAllFiles(directory).then(function(files){
		console.log(chalk.grey('Starting to get all file info for all files in directory'));
		var filesWithDirectory = _.map(files, function(file){
			return {
				fileName: file,
				path: directory + '/' + file
			};
		});
		async.mapLimit(filesWithDirectory, parallelism, getFileInfo, function(err, fileInfos){
			if(err){
				deferred.reject(err);
			}else{
				deferred.resolve(fileInfos);
			}
		});
	}).fail(function(err){
		deferred.reject(err);	
	});
	return deferred.promise;
};

module.exports = getAllFileMetadata;


// This might not be at all what you're wanting to do.

function userAllowed(token) {
	var deferanswer = Q.defer();
	setTimeout(function(){
		console.log("Token: " + token); //Outputs as expected with below code
    	deferanswer.resolve("true");
	})
	return deferanswer.promise;
}

app.use('/verify', function(req, res, next) {
    userAllowed(query.access_token).then(function(val) {
        console.log("test" + val); //This should now get called.
    }, function(err){
		console.log(err);
	});
});