var rpc = require('rpc-stream');
var msgpack = require('msgpack-stream');
var combine = require('stream-combiner');

module.exports = function(store){
  var server = rpc({
    put: store.put.bind(store),
    get: store.get.bind(store)
  }, { raw: true });

  return combine(
    msgpack.createDecodeStream(),
    server,
    msgpack.createEncodeStream()
  );
};

