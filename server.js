'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.BASE_URL;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const httpServer = createServer(server)

const io = socketIO(httpServer, {/* options */});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


//===============================================//



