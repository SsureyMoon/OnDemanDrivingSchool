'use strict';

module.exports = function(grunt) {
    grunt.initConfig({

        npmConfig: grunt.file.readJSON('package.json'),
        bowerConfig: grunt.file.readJSON('bower.json'),

        bowercopy: {
            bootstrap :{
                options: {
                    'destPrefix': 'assets',
                    'srcPrefix': 'bower_components/bootstrap-sass/assets'
                },
                files: {
                    'js/lib/bootstrap' : 'javascripts',
                    'fonts/bootstrap' : 'fonts',
                    'sass' : 'stylesheets'
                }
            },
            jquery : {
                options: {
                    'destPrefix': 'assets',
                    'srcPrefix': 'bower_components'
                },
                files: {
                    'js/lib/jquery': 'jquery/dist',
                    'js/lib/jquery.cookie': 'jquery.cookie',
                }
            },
            font_awesome : {
                options: {
                    'destPrefix': 'assets',
                    'srcPrefix': 'bower_components/font-awesome-sass'
                },
                files: {
                    'sass/font-awesome': 'assets',
                    'fonts/font-awesome': 'assets/fonts/font-awesome'
                }
            },
            underscore: {
                options: {
                    'destPrefix': 'assets',
                    'srcPrefix': 'node_modules'
                },
                files: {
                    'js/lib/underscore/underscore.js': 'underscore/underscore.js',
                    'js/lib/underscore/underscore-min.js': 'underscore/underscore-min.js',
                }
            },
            backbone: {
                options: {
                    'destPrefix': 'assets',
                    'srcPrefix': 'node_modules'
                },
                files: {
                    'js/lib/backbone/backbone.js': 'backbone/backbone.js',
                    'js/lib/backbone/backbone-min.js': 'backbone/backbone-min.js',
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: ' assets/css'
                }
            }
        },

        sass: {
          dist: {
            options: {
              style: 'compressed',
              precision: 8
            },
            files: [{
              'assets/css/app-bootstrap.min.css': 'assets/sass/app-bootstrap.scss',
              'assets/css/application.min.css': 'assets/sass/application.scss',
              'assets/css/font-awesome-custom.min.css': 'assets/sass/font-awesome/font-awesome-custom.scss'
            }]
          }
      }
    })

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.registerTask('compile', ['bowercopy', 'sass'])
};
