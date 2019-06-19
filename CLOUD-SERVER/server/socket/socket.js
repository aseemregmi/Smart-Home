const socket = require('socket.io');
let io = null;
socketId = '';

const on = data => {
  io.to(socketId).emit('on', data);
};

const off = data => {
  io.to(socketId).emit('off', data);
};

const socketInitFunction = server => {
  socketServer = socket(server);
  io = socketServer;

  socketServer.on('connection', socket => {
    socket.on('init', data => {
      // Need to store socket id with corresponding rpi_id in db
      // For now just considering a single pi
      socketId = socket.id;

      // If available get state from cache and emit to the pi
    });

    socket.on('disconnect', () => {
      // Close all sessions but cache the state
      console.log('Disconnected');
    });
  });
};

module.exports = {
  socketInitFunction,
  on,
  off
};
