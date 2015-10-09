var Store = require('memory-chunk-store');
var transport = require('./');
var net = require('net');

var store = new Store(16);

var server = net.createServer(function(con){
  con.pipe(transport.server(store)).pipe(con);
});
server.listen(9000, function(){
  var con = net.connect(9000);

  var client = transport.client();
  client.pipe(con).pipe(client);

  client.put(0, Buffer('0123456789abcdef'), function(err){
    if (err) throw err;
    client.get(0, function(err, buf){
      if (err) throw err;

      console.log('BUF', buf, buf.toString());

      server.close();
      con.end();
    });
  });
});

