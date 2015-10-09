
# abstract-chunk-transport

  Access an [abstract-chunk-store](https://npmjs.org/package/abstract-chunk-store) over any stream.

## Example

```js
var transport = require('abstract-chunk-transport');
var Store = require('memory-chunk-store');

var store = new Store(16);
var client = transport.client();
client.pipe(transport.server(store)).pipe(client);

client.put(0, Buffer('0123456789abcdef'), function(err){
  if (err) throw err;

  client.get(0, function(err, buf){
    if (err) throw err;

    console.log('BUF', buf, buf.toString());

    server.close();
    con.end();
  });
});
```


## Installation

```bash
$ npm install abstract-chunk-transport
```

## API

### .server(store)
### .client

## License

  MIT

