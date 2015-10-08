var Store = require('memory-chunk-store');
var transport = require('./');

var store = new Store(16);

var server = transport.server(store);
var client = transport.client();

client.pipe(server).pipe(client);

client.put(0, Buffer('0123456789abcdef'), function(err){
  if (err) throw err;
  client.get(0, function(err, buf){
    if (err) throw err;
    console.log('BUF', buf, buf.toString());
  });
});
