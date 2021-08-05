var version = require('./src/version.js');

module.exports = function(grunt) {

    var jssdkSrc = './src/';
    var jssdkVer = version.get();
    var jssdkDest = './dist/jssdk-';
    var jssdkOutput = jssdkDest + jssdkVer + '.js';

    var oConfigInit = {
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
              jshintrc: true,
            },
            dist: {
                src: jssdkSrc + '*.js'
            }
        },
        babel: {
          options: {
            sourceMap: false,
            presets: ["@babel/preset-env"],
          },
          dist: {
            files: {
              [jssdkOutput]: [jssdkSrc + 'main.js']
            }
          },
        },
        uglify: {
            dist:{
              src: jssdkOutput,
              dest: jssdkDest + jssdkVer + '.min.js'
            }
        },
        browserify: {
          dev: {
            files: {
              [jssdkOutput]: [jssdkSrc + 'main.js']
            },
            options: {
              watch: true,
              keepAlive: true,
              browserifyOptions: {
                'fullPaths': false,
                'standalone': 'yhsd'
              }
            }
          },
          dist: {
            files: {
              [jssdkOutput]: [jssdkSrc + 'main.js']
            },
            options: {
                browserifyOptions: {
                  'fullPaths': false,
                  'standalone': 'yhsd'
                }
            }
          }
        }
    };

    grunt.initConfig(oConfigInit);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('dev', ['browserify:dev']);
    grunt.registerTask('dist', ['jshint', 'babel', 'browserify:dist', 'uglify']);

};