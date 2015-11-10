#!/usr/bin/env node
'use strict';

var nopt = require('nopt'),
    chalk = require('chalk'),
    processBackgrounds = require('./lib/processBackgrounds');
    
var options = nopt({
    crop: Boolean,
    download: String,
    height: String,
    help: Boolean,
    load: String,
    save: String,
    size: String,
    verbose: Boolean,
    width: String,
    parallelism: Number,
    writemd: String,
    maxDownloads: Number,
    skipDownload: Boolean
}, {
    h: '--help',
    v: '--verbose'
}); 

options.parallelism = options.parallelism || 10

if (options.help) {
    var helpString = 'chromecast-backgrounds \
    --download=<directory> \
    --size=<maximum_size_pixels> \
    --width=<width_pixels> \
    --height=<height_pixels> \
    --crop \
    --save=<file> \
    --writemd=<file>';
    console.log(chalk.yellow(helpString));
}else{
    console.log(chalk.underline('Parsing Chromecast Home...\n'));
    processBackgrounds(options);
}

