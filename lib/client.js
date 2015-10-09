var rpc = require('rpc-stream');

module.exports = function(){
  var client = rpc(null, { raw: true });
  var stream = client;

  stream.put = function(index, chunkBuffer, cb){
    client.rpc('put', [index, chunkBuffer], cb);
  };

  stream.get = function(index, opts, cb){
    if (typeof opts == 'function') {
      cb = opts;
      opts = {};
    }
    client.rpc('get', [index, opts], cb);
  };

  return stream;
};

