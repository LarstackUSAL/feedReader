var http = require('http');
var url = require('url');
var router = require('./router');

function startServer(){
	http.createServer(function(req, res){
		var pathName = url.parse(req.url).pathname;
		console.log("Request for "+pathName+"received.");
		router.route(pathName, res);
	}).listen(6969);
	console.log('Connection established.');
}

exports.startServer = startServer;