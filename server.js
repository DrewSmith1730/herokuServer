'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server, {/* options */});

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connect: %s sockets are connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnect: %s sockets are connected', connections.length);
    });
    
    socket.on('NodeJS Server Port', function(data) {
        console.log(data);
        io.sockets.emit('iOS Client Port', {msg: 'Hi iOS Client!'}, {msg1: ['Hello', 'World']});
    });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
