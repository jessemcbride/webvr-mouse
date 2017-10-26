var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

app.get('/controller', function(req, res, next) {
	res.sendFile(__dirname + '/controller.html');
});

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
	});

	client.on('update', function(data) {
		io.emit('update', data);
	});
});

server.listen(3000); 