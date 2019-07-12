const socket = require('socket.io');
const pool = require('./../../database/db');
let io = null;

const on = (socketId, data) => {
  io.to(socketId).emit('on', data);
};

const off = (socketId, data) => {
  io.to(socketId).emit('off', data);
};

const socketInitFunction = server => {
  socketServer = socket(server);
  io = socketServer;

  socketServer.on('connection', socket => {
    // socket.on('init', async data => {
    //   query = //   UPDATE raspberry_pi
    //     SET socket_id='${socket.id}'
    //     WHERE rpi_id='${data.rpi_id}'
    //;

    //   await pool.query(query);
    //   // If available get state from cache and emit to the pi

    // });

    socket.emit('scheduleWithEvent', {
      gpio: 4,
      time: new Date(Date.now() + 60 * 1000),
      action: true
    });

    socket.emit('scheduleWithTime', {
      gpio: 18,
      startTime: '23:20',
      endTime: '23:25'
    });

    setTimeout(() => {
      socket.emit('scheduleWithTime', {
        gpio: 4,
        startTime: new Date(Date.now() + 60 * 1000),
        endTime: new Date(Date.now() + 120 * 1000)
      });
    }, 5000);

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