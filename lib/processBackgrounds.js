'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    chalk = require('chalk'),
    getNameFromUrl = require('./getNameFromUrl'),
    getChromecastBackgrounds = require('./parseChromecastHome'),
    downloadImages = require('./downloadImages'),
    updateDimensions = require('./updateDimensions'),
    saveObjectToFile = require('./saveObjectToFile'),
    writeInlineMarkdown = require('./writeInlineMarkdown'),
    processExistingFiles = require('./processExistingFiles'),
    read = fs.readFileSync;

var processExistingImages = function(options){
    if(options.maxDownloads){
        processExistingFiles(options.download, options.maxDownloads, options.parallelism)
        .then(function(){
            console.log(chalk.green('Finished processing images'));
        })
        .fail(function(err){
            console.log(chalk.red('Error processing images: ' +  err));
        });
    }else{
        console.log(chalk.green('No limit set no need to process'));
    }
};

var processBackgrounds = function(options){
	getChromecastBackgrounds().then(function(backgrounds) {
        if (options.load) {
            console.log(chalk.underline('Loading previous backgrounds from', options.load));
            var backgroundsFromJSON = JSON.parse(read(options.load, 'utf8'));
            backgrounds = _.uniq(_.union(backgrounds, backgroundsFromJSON), function(backgroundEntry) {
                return getNameFromUrl(backgroundEntry.url);
            }, function(item){
                return item.url;
            });
            var newCount = backgrounds.length - backgroundsFromJSON.length;
            if (newCount > 0) {
                console.log(chalk.green(String(newCount) + ' new backgrounds!'));
            }
        }
        if (options.size || options.width || options.height) {
            console.log(
                chalk.underline('Updating dimensions (size:%d, width:%d, height:%d)'),
                options.size, options.width, options.height);
            updateDimensions(backgrounds,
                            options.size,
                            options.width,
                            options.height,
                            options.crop);
        }
        if (options.save) {
            console.log(chalk.underline('Writing backgrounds JSON to', options.save));
            saveObjectToFile(options.save, backgrounds);
        }
        if (options.writemd) {
            console.log(chalk.underline('Writing backgrounds as inline markdown to', options.writemd));
            writeInlineMarkdown(options.writemd, backgrounds);
        }
        if (options.verbose) {
            console.log(chalk.grey(JSON.stringify(backgrounds, null, 4)));
        }
        if (options.download) {
            if(options.skipDownloads){
                console.log(chalk.underline('Skipped background download...\n'));
                processExistingImages(options);
            }else{
                console.log(chalk.underline('Downloading background images...\n'));
                downloadImages(backgrounds, options.download, options.parallelism).fail(function(err){
                    console.log(chalk.red('Error downloading image: ' + err));
                }).done(function() {
                    console.log(chalk.green('\n✓ Downloads Done! Processing images'));
                    processExistingImages(options);
                });
            }
        } else {
            console.log(chalk.green('\n✓ Done!'));
        }
    }).fail(function(err){
        var error = 'error downloading chomecast image list: ' + err; 
        console.log(chalk.red(error));
    }).done();
};

module.exports = processBackgrounds;