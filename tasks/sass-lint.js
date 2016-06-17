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

      // output function
      let writeResults = ({ruleId, line, column, message, severity} = message) => {
        log.writeln(chalk.white(`rule: ${ruleId}\nline: ${line}, column: ${column}, severity: ${severity}\nmessage: ${message}`));
        let i = 0,
         l = 45,
         o = [];
        for ( ; i  < l; i++) {
          o.push('-');
        }
        log.writeln(chalk.white(`${o.join('')}`));
      };

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
        verbose: false // this is a trigger for the verbosity
      });

      // linting files
      const results = lint.lintFiles(`${process.cwd()}/${src}`, options, options.configPath);

      // verbose, to log output
      if (options.verbose) {
        lint.outputResults(results, options, options.configFile); // this should be in a function
      } else {
        // outputting
        results.forEach(file => {
          log.writeln(chalk.blue(file.filePath));
          file.messages.forEach(message => {
            for (let prop in message) { // this should be moved somewhere else
              if (!message.hasOwnProperty(prop)) {
                continue;
              }
              writeResults(message);
            }
          log.writeln();
          });
        });
      }

      // check for errors
      if (! option('force')) {
        lint.failOnError(results);
      }

      // async
      done();

    });

};
