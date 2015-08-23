'use strict';

module.exports = function(grunt) {
    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
 
    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt'
                },
                src: ['test/**/*.js']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'mochaTest:test']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'mochaTest:test']
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'mochaTest:test']);
    
    grunt.registerTask('build', ['jshint']);
    
    grunt.registerTask('test', ['mochaTest:test']);

};
