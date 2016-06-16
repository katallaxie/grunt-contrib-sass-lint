/*
 * grunt-contrib-sass-lint
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 Sebastian Döll, contributors
 * Licensed under the MIT license.
 * https://github.com/katallaxie/grunt-contrib-sass-lint/blob/master/LICENSE
 */

// syntax
'use strict';

// module
module.exports = (grunt) => {
  // project configuration
  grunt.initConfig({
    // sample linting
    'sass-lint': {
      options: {
        // later to support the alternation of the config.xml
        config: '.sass-lint.yml'
      },
      all: {
        src: 'test/*.scss'
      }
    },

    // checking code style
    eslint: {
      options: {
        format: 'stylish'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ]
    },
    // before testing anything, clear the relevant paths
    clean: {
      test: ['build']
    },

  });

  // load the plugin task
  grunt.loadTasks('tasks');

  // load development tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');

  // when testing then first clean the relevant dirs and produce the icons
  grunt.registerTask('test', ['clean', 'sass-lint']);
  // TODO: add unit tests

  // By default, lint and run all tests.
  grunt.registerTask('default', ['eslint', 'test']);

};
