module.exports = (function() {
  'use strict';

  var child = require('child_process');
  var Q = require('q');

  var run = function(cmd, args) {
    return Q.npost(child, 'exec', [cmd + ' ' + args, {cwd: process.cwd()}]);
  };

  return run;
})();
