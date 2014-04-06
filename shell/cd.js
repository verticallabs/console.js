module.exports = (function() {
  'use strict';

  var Q = require('q');
  var path = require('path');
  var cd = function(dir) {
    return Q()
    .then(function() {
      if (dir.substr(0, 1) === '~') {
        dir = process.env.HOME + dir.substr(1)
      }

      process.chdir(dir);
    });
  };

  return cd;
})();
