const socket = require('socket.io');

const socketInitFunction = server => {
  socketServer = socket(server);

  socketServer.on('connection', socket => {
    console.log('Connected');
    socket.emit('hi', { message: 'Hi' });
    socket.on('init', data => console.log(data));
  });
};

module.exports = socketInitFunction;
