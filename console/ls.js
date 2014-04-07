module.exports = (function() {
  'use strict';

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
