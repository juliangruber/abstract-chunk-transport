var Store = require('memory-chunk-store');
var transport = require('./');
var net = require('net');
var test = require('tape');

test(function(t){
  var store = new Store(16);

  var server = net.createServer(function(con){
    con.pipe(transport.server(store)).pipe(con);
  });
  server.listen(9000, function(){
    var con = net.connect(9000);

    var client = transport.client();
    client.pipe(con).pipe(client);

    client.put(0, Buffer('0123456789abcdef'), function(err){
      t.error(err);
      client.get(0, function(err, buf){
        t.error(err);

        t.equal(buf.toString(), '0123456789abcdef');
        t.end();

        server.close();
        con.end();
      });
    });
  });
});
