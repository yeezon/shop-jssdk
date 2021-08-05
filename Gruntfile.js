
module.exports = function (grunt) {
  const PACKAGE = grunt.file.readJSON('package.json')

  const jssdkSrc = './src/';
  const jssdkDest = './dist/';
  const jssdkDestVer = jssdkDest + 'jssdk-' + (PACKAGE.version || '');
  const jssdkOutputFile = jssdkDestVer + '.js';

  const oConfigInit = {
    pkg: PACKAGE,
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
          [jssdkOutputFile]: [jssdkSrc + 'main.js']
        }
      },
    },
    uglify: {
      dist: {
        src: jssdkOutputFile,
        dest: jssdkDestVer + '.min.js'
      }
    },
    browserify: {
      dev: {
        files: {
          [jssdkOutputFile]: [jssdkSrc + 'main.js']
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
          [jssdkOutputFile]: [jssdkSrc + 'main.js']
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