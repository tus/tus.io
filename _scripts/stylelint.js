/* global __dirname, require, console, process */
(function () {
  'use strict';

  var args = process.argv.slice(2);
  if (args.length !== 1) {
    return console.error('Needs an argument to file path');
  }

  var relativePath = args[0];

  var fs = require('fs');
  var postcss = require('postcss');
  var stylelint = require('stylelint/dist');
  var config = JSON.parse(fs.readFileSync(__dirname + '/../.stylelintrc', 'utf8'));
  var reporter = require('postcss-reporter');
  var glob = require('glob');

  glob(relativePath, {}, function (err, files) {
    files.forEach(function (file) {
      console.log('Processing:', file);
      var css = fs.readFileSync(file, 'utf8');

      postcss([
        stylelint(config),
        reporter(),
      ])
        .process(css, {
          from: file
        })
        .catch(function (err) {
          console.error(err.stack);
        });
    });
  });
})();
