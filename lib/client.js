var rpc = require('rpc-stream');
var combine = require('stream-combiner');
var msgpack = require('msgpack-stream');

module.exports = function(){
  var client = rpc(null, { raw: true });
  var stream = combine(
    msgpack.createDecodeStream(),
    client,
    msgpack.createEncodeStream()
  );

  stream.put = function(index, chunkBuffer, cb){
    client.rpc('put', [index, chunkBuffer], cb);
  };

  stream.get = function(index, opts, cb){
    if (typeof opts == 'function') {
      cb = opts;
      opts = {};
    }
    client.rpc('get', [index, opts], function(err, buf){
      if (!Buffer.isBuffer(buf)) buf = Buffer(buf);
      cb(err, buf);
    });
  };

  return stream;
};

