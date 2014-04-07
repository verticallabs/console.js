module.exports = (function() {
  'use strict';

  var Q = require('q');
  var path = require('path');

  var cmd = function(command) {
    return Q()
    .then(function() {
      return require(resolve(command));
    });
  };

  return cmd;
})();
