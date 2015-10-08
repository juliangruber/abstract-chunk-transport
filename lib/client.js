var rpc = require('rpc-stream');

module.exports = function(){
  var client = rpc(null, { raw: true });

  client.put = function(index, chunkBuffer, cb){
    client.rpc('put', [index, chunkBuffer], cb);
  };

  client.get = function(index, opts, cb){
    if (typeof opts == 'function') {
      cb = opts;
      opts = {};
    }
    client.rpc('get', [index, opts], cb);
  };

  return client;
};

