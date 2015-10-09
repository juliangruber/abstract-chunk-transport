var rpc = require('rpc-stream');

module.exports = function(store){
  var server = rpc({
    put: store.put.bind(store),
    get: store.get.bind(store)
  }, { raw: true });

  return server;
};

