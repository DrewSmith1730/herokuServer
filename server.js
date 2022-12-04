'use strict';

const express = require('express');
// const socketIO = require('socket.io');

const PORT = process.env.PORT;
const INDEX = '/index.html';

const app = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

var server = require('http').createServer(app);

// const io = socketIO(server);
const io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
  console.log('Client connected');
  io.on('close', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
