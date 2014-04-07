module.exports = (function() {
  'use strict';

  var vm = require('vm');
  var fs = require('fs');
  var path = require('path');

  var colors = require('colors');
  var Q = require('q');
  var _ = require('lodash');
  _.str = require('underscore.string');
  _.mixin(_.str.exports());
  var glob = require('glob');

  var packageInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
  var version = packageInfo.version;

  return {
    start: function() {
      var self = this;

      console.log(('Console.js v' + version + ':').green);

      var context = global;
      self.createContext(context);

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

      //start the repl
      var repl = require('repl').start({
        eval: replEval
      });

      repl.on('exit', function() {
        process.exit();
      });
    },
    createContext: function(context) {
      context.commands = {};
      context.addCommand = function(name, fn) {
        context.commands[name] = fn;
        context[name] = fn;
      };
      context.resolve = function(p) {
        if (p.substr(0, 1) === '~') {
          p = process.env.HOME + p.substr(1)
        }
        return path.resolve(p);
      };

      //load the commands
      process.stdout.write('Adding commands: ');
      _.each(glob.sync(path.join(__dirname, 'console', '**', '*.js')), function(filename) {
        var basename = path.basename(filename, '.js');
        process.stdout.write(basename + ' ');
        var fn = require(path.join('.', filename));
        context.addCommand(basename, fn);
      });
      if (context.resolve(__dirname) != context.resolve('.')) {
        _.each(glob.sync(path.join('.', 'console', '**', '*.js')), function(filename) {
          var basename = path.basename(filename, '.js');
          process.stdout.write(basename + ' ');
          var fn = require(path.join('.', filename));
          context.addCommand(basename, fn);
        });
      }
      process.stdout.write('\n');

      context._ = _;
      context.path = path;
      context.fs = fs;

      _.extend(global, context);
    }
  };
})();
