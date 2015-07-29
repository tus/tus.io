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

  var sourcePath = __dirname + '/../' + relativePath;
  var css = fs.readFileSync(sourcePath, 'utf8');

  postcss([
    stylelint(config), // using the pre-written SuitCSS config
    reporter(),
  ])
    .process(css, {
      from: sourcePath
    })
    .catch(function (err) {
      console.error(err.stack);
    });
})();
