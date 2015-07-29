/* global __dirname, require */
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
  var config = JSON.parse(fs.readFileSync(__dirname + '/../.postcssrc', 'utf8'));
  var reporter = require('postcss-reporter');
  var glob = require('glob');

  var sourcePath = __dirname + '/../' + relativePath;

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
