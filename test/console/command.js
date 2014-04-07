module.exports = function() {
  var Q = require('q');
  return Q()
  .then(function() {
    return cd('~');
  });
};
