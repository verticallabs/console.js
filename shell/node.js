module.exports = (function() {
  'use strict';

  var Q = require('q');

  var cmd = function(path) {
    if (path.substr(0, 1) === '~') {
      path = process.env.HOME + path.substr(1)
    }

    return Q()
    .then(function() {
      return require(path);
    });
  };

  return cmd;
})();
