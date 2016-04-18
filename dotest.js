var http = require('http');
var events = require('events');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('hehe');
});
