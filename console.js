module.exports = (function() {
  'use strict';

  var vm = require('vm');
  var fs = require('fs');
  var path = require('path');

  var Q = require('q');
  var _ = require('lodash');
  _.str = require('underscore.string');
  _.mixin(_.str.exports());
  var colors = require('colors');
  var glob = require('glob');

  var packageInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
  var version = packageInfo.version;

  console.log(('Console.js v' + version + ':').green);

  var context = {};
  //start the repl
  context.commands = {};
  context.addCommand = function(name, fn) {
    context.commands[name] = fn;
    context[name] = fn;
  };

  //load the commands
  process.stdout.write('Adding commands: ');
  _.each(glob.sync(path.resolve(__dirname, 'shell', '**', '*.js')), function(filename) {
    var basename = path.basename(filename, '.js');
    var fn = require(filename);
    context.addCommand(basename, fn);
    process.stdout.write(basename + ' ');
  });
  _.each(glob.sync(path.resolve('.', 'tasks', '**', '*.js')), function(filename) {
    var basename = path.basename(filename, '.js');
    var fn = require(filename);
    context.addCommand(basename, fn);
    process.stdout.write(basename + ' ');
  });
  process.stdout.write('\n');
  context._ = _;

  //handle promises
  var replEval = function(cmd, context, filename, callback) {
    Q()
      .then(function() {
        return vm.runInContext(cmd.slice(1, cmd.length - 1), context);
      })
      .done(function(result) {
        callback(null, result);
      }, function(err) {
        callback(err);
      });
  }

  var repl = require('repl').start({ eval: replEval });
  _.extend(repl.context, context);

  repl.on('exit', function() {
    process.exit();
  });
})();
