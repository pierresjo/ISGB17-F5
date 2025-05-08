'use strict';
const express = require('express');
const  {Server} = require('socket.io');
const app = express();

let counter = 0;

const server = app.listen(3001, function() {
    console.log('Server is running!');
});

const io = new Server(server);




app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', function(request, response) {
    response.sendFile(__dirname + '/favicon.ico');
});

app.use('/clientscripts', express.static(__dirname + '/clientscripts'));

//Sockets...
io.on('connection', (socket) => {
    console.log('en användare anslöt');

    socket.on('disconnect', ()=> {
        console.log('En användare stängde anslutningen...');
    });

    socket.on('command', broadcastToAll);


});

function broadcastToAll(msg) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    counter++;

    io.emit('banan', {
            'red': r,
            'green': g,
            'blue': b,
            'antal': counter 
        }
    );
}

