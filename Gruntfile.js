module.exports = function(grunt) {

    var jssdkSrc = './src/';
    var jssdkVer = '0.0.7';
    var jssdkDest = './dist/jssdk-';
    var jssdkOutput = jssdkDest + jssdkVer + '.js';

    var oConfigInit = {
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            api_v1: {
                src: jssdkSrc + '*.js'
            }
        },
        uglify: {
            api_v1_pro:{
              src: jssdkDest + jssdkVer + '.js',
              dest: jssdkDest + jssdkVer + '.min.js'
            }
        },
        browserify: {
          api_v1: {
            files: {},
            options: {
              watch: true,
              keepAlive: true,
                browserifyOptions: {
                    'fullPaths' : false
                }
            }
          },
          api_v1_pro: {
            files: {},
            options: {
                browserifyOptions: {
                    'fullPaths' : false
                }
            }
          }
        }
    };

    oConfigInit.browserify.api_v1.files[jssdkOutput] = [jssdkSrc + 'main.js'];
    oConfigInit.browserify.api_v1_pro.files[jssdkOutput] = [jssdkSrc + 'main.js'];

    grunt.initConfig(oConfigInit);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('dev', ['browserify:api_v1']);
    grunt.registerTask('dist', ['jshint:api_v1', 'browserify:api_v1_pro', 'uglify:api_v1_pro']);

};