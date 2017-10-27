'use strict';

const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/node_modules'))

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/viewer.html')
})

app.get('/controller', (req, res, next) => {
	res.sendFile(__dirname + '/controller.html')
})


let viewer = null
let controller = null

io.sockets.on('connection', (socket) => {  

    socket.on('setViewer', (data) => {
    	socket.type = 'viewer'
    	viewer = socket
        console.log('Set viewer')
	});

	socket.on('setController', (data) => {
		socket.type = 'controller'
		controller = socket
		console.log('Set controller')

		if(viewer !== null) {
			console.log('Synced viewer and controller')
		}
	});

	socket.on('sendMouseUpdate', (data) => {
		viewer.emit('sendMouseUpdate', data)
	})
})

server.listen(3000)