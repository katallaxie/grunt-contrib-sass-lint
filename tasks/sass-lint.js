/*
 * grunt-contrib-sass-lint
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 Sebastian Döll, contributors
 * Licensed under the MIT license.
 * https://github.com/katallaxie/grunt-contrib-sass-lint/blob/master/LICENSE
 */

'use strict';

// module
module.exports = grunt => {

    // modules
    const lint = require('sass-lint');
    const fs = require('fs');
    const chalk = require('chalk');

    // map
    const log = grunt.log;
    // const util = grunt.util;
    const option = grunt.option;

    //const isWindows = process.platform === 'win32';

    grunt.registerMultiTask('sass-lint', 'Lint Sass.', function() {

      // variables
      let done = this.async(), // doing it async; call to done()
          src = this.files[0].orig.src[0] || '',
          config = '.sass-lint.yml';

      // try to find .sass-lint.yml
      try {
        fs.statSync(config).isFile();
      } catch (err) {
        if (err.code === 'ENOENT') {
          config = '';
        }
      }

      // options
      const options = this.options({
        configPath: config,
        verbose: true
      });

      // linting files
      const results = lint.lintFiles(`${process.cwd()}/${src}`, options, options.configPath);

      // verbose, to log output
      if (options.verbose) {
        lint.outputResults(results, options, options.configFile);
      }

      // outputting results
      results.forEach(file => {
        log.writeln(chalk.blue(file.filePath));
        file.messages.forEach(message => {
          for (let prop in message) {
            if (!message.hasOwnProperty(prop)) {
              continue;
            }
            log.writeln(chalk.white(`${prop}:\t${message[prop]}`));
          }
        log.writeln();
        });
      });

      // check for errors
      if (! option('force')) {
        lint.failOnError(results);
      }

      // async
      done();

    });

};
