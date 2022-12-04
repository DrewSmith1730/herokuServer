'use strict';

const express = require('express');
var connections = [];

// const socketIO = require('socket.io');

const PORT = process.env.PORT;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server);
const io = require('socket.io')(server);

console.log("before connection");

io.sockets.on('connection', (socket) => {
  console.log('Client connected');
  connections.push(socket);
  console.log(connections);
  console.log(socket);
  io.on('close', () => console.log('Client disconnected'));
    
  socket.on('Heroku Server Testing', function(data) {
    console.log(data);
    console.log("Here at Heroku Server Testing");
  });
    
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnect: %s sockets are connected', connections.length);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
