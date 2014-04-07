module.exports = (function() {
  'use strict';

  var Q = require('q');

  var cd = function(dir) {
    return Q()
    .then(function() {
      process.chdir(resolve(dir));
    });
  };

  return cd;
})();
