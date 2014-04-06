module.exports = (function() {
  'use strict';

  var path = require('path');
  var glob = require('glob');
  var _ = require('lodash');

  var ls = function(dir) {
    dir = dir || '.';
    if(dir.indexOf('*') < 0) {
      dir = path.join(dir, '*');
    }

    return _.map(glob.sync(dir), function(p) {
      return path.basename(p);
    });
  };

  return ls;
})();
