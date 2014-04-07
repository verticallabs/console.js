module.exports = (function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var Q = require('q');

  var cp = function(src, dest) {
    var deferred = Q.defer();

    if(!fs.existsSync(resolve(src)) || fs.statSync(resolve(src)).isDirectory()) {
      throw new Error('Source path "' + src + '" does not exist');
    }

    if(!fs.existsSync(resolve(dest)) || fs.statSync(resolve(dest)).isDirectory()) {
      throw new Error('Destination path "' + dest + '" does not exist');
    }

    var rs = fs.createReadStream(resolve(src));
    var ws = fs.createWriteStream(resolve(dest));

    ws.on('error', function(err) {
      deferred.reject(err);
    });
    ws.on('finish', function() {
      deferred.resolve();
    });

    rs.pipe(ws);

    return deferred.promise;
  };

  return cp;
})();
