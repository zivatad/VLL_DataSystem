var http = require('http');     
var server = http.createServer();
	fs = require('fs');
var settings = require('./settings')
console.log(settings);

server.on('request', function(req,res){
	fs.readFile(__dirname + '/public_html/index.html', 'utf-8', function(err, data){
		if (err) {
			res.writeHead(404, { 'Content-Type' : 'text/plain'}); //200 : http status code OK
			res.write('not found');
			res.end();
		}
		res.writeHead(200, { 'Content-Type' : 'text/html'}); //200 : http status code OK
		res.write(data);
		res.end();
	});
});

server.listen(settings.port, settings.host);
console.log("server listening...");

