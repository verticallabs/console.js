module.exports = (function() {
  'use strict';

  var Q = require('q');
  var pwd = function() {
    return Q().
    then(function() {
      return process.cwd()
    });
  };

  return pwd;
})();
