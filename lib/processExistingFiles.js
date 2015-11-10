'use strict';
var Q = require('Q'),
	_ = require('lodash'),
	fs = require('fs'),
	async = require('async'),
	chalk = require('chalk'),
	stringEndsWith = require('./stringEndsWith'),
	getAllFilesMetadata = require('./getAllFilesMetadata');

var getSizeInBytes = function(file){
	return file.fileInfo.size;
};

var processExistingImages = function(directory, maxDirectorySize, parallelism){
	return getAllFilesMetadata(directory, parallelism).then(function(fileInfos){
		var actualTotalBytes = maxDirectorySize * 1024 * 1024 * 1024;
		var filteredFiles = 
			_.filter(fileInfos, function(file){
				return !stringEndsWith(file.fileName, '.json');
			});
		var sortedFiles = 
			_.sortBy(filteredFiles, function(file){
				return file.fileInfo.ctime;
			}).reverse();
		var reducedResult =
			_.reduce(sortedFiles, function(result, file){
				var bytes = getSizeInBytes(file);
				result.totalFileSizeAccepted += bytes;
				if(result.totalFileSizeAccepted > actualTotalBytes){
					result.rejectedFiles.push(file);
				}else{
					result.acceptedFiles.push(file);
				}
				return result;
			},{
				acceptedFiles: [],
				rejectedFiles: [],
				totalFileSizeAccepted: 0 
			});
		console.log(
			'Total bytes found:' + (reducedResult.totalFileSizeAccepted/1024/1024) +
			'/' + (maxDirectorySize * 1024) + 'Mb, Images not to be deleted: ' +
			reducedResult.acceptedFiles.length + ' Images to be deleted: ' +  
			reducedResult.rejectedFiles.length);
		var deferred = Q.defer();
		var filesDeleted = 0;
		async.eachLimit(reducedResult.rejectedFiles,parallelism, function(file, callback){
			fs.unlink(file.path, function(err){
				if(err){
					console.log(chalk.red('Error deleting file: ' + file.fileName + ' with error: ' + err));
				}else{
					filesDeleted += 1;
				}
				callback(err);
			});
		},function(err){
			console.log(chalk.green('Files deleted: ' + filesDeleted));
			if(err){
				deferred.reject(err);
			}else{
				deferred.resolve();
			}
		});
		return deferred.promise;
	});
};

module.exports = processExistingImages;