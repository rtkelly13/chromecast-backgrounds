'use strict';

var fs = require('fs'),
	Q = require('q');

var getAllFiles = function(directory){
	var deferred = Q.defer();
	//console.log(chalk.gray("Getting all file names in directory: " + directory))
	fs.readdir(directory, function(err, files){
		if(err){
			deferred.reject(err);
		}else{
			//console.log(chalk.gray("Successfully gathered all file names in directory: " + directory))
			deferred.resolve(files);
		}
	});
	return deferred.promise;
};

module.exports = getAllFiles;