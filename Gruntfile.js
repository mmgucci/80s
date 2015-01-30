'use strict';

var pkg = require('./package.json');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'css',
                    imagesDir: 'assets/img',
                    fontsDir: 'assets/fonts',
                    relativeAssets: true,
                    noLineComments: true
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: ['last 2 version']}).postcss
                ]
            },
            dist: { src: 'css/styles.css' }
        },

        watch: {
            css: {
                files: ['scss/*.scss','scss/*/*.scss'],
                tasks: ['compass', 'postcss'],
                options: { livereload: true }
            },
            html: {
                files: ['*.html'],
                options: { livereload: true }
            },
            js: {
                files: ['js/*.js'],
                options: { livereload: true }
            }
        },

        bowercopy: {
            options: {
                runBower: false
            },
            libs: {
                options: {
                    destPrefix: 'js/lib'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('build', ['bowercopy','compass','postcss']);
};