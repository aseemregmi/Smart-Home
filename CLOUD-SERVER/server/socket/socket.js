const socket = require('socket.io');
const pool = require('./../../database/db');
let statusOfPiBeforeBeingDisconnected = {};
let io = null;

const on = (socketId, data) => {
  io.to(socketId).emit('on', data);
};

const off = (socketId, data) => {
  io.to(socketId).emit('off', data);
};

const schedule = (socketId, data) => {
  io.to(socketId).emit('schedule', data);
};

const socketInitFunction = server => {
  socketServer = socket(server);
  io = socketServer;

  socketServer.on('connection', socket => {
    socket.on('init', async data => {
      await pool.query(`
      UPDATE raspberry_pi
        SET socket_id='${socket.id}'
        WHERE rpi_id='${data.rpi_id}'
      `);

      // If available get state from cache and emit to the pi
      socket.emit(
        'earlierState',
        statusOfPiBeforeBeingDisconnected[data.rpi_id]
      );

      // Start corresponding sessions again
      if (statusOfPiBeforeBeingDisconnected[data.rpi_id]) {
        statusOfPiBeforeBeingDisconnected[data.rpi_id].map(async gadgetInfo => {
          if (gadgetInfo.status) {
            // Update in DB The Status
            await pool.query(
              `
              UPDATE gadget
                SET status=${true}
                WHERE gadget_id='${gadgetInfo.gadget_id}'
              `
            );

            // Start a session for the gadget which needs to be turned on
            await pool.query(
              `
              INSERT INTO session (gadget_id, starting_datetime)
                VALUES ('${
                  gadgetInfo.gadget_id
                }', '${new Date().toUTCString()}')
            `
            );
          }
        });
      }

      // Remove Cache
      statusOfPiBeforeBeingDisconnected[data.rpi_id] = null;
    });

    socket.on('disconnect', async () => {
      const { rpi_id } = (await pool.query(
        `
        SELECT rpi_id
          FROM raspberry_pi
          WHERE socket_id='${socket.id}'
        `
      )).rows[0];

      await pool.query(
        `
        UPDATE raspberry_pi
          SET socket_id=NULL
          WHERE rpi_id='${rpi_id}'
        `
      );

      // Get All Gadgets Connected To That Device
      const gadgetConnectedToDisconnectedPi = (await pool.query(
        `
        SELECT gadget_id, status, gpio_number as gpio
        FROM gadget
          WHERE rpi_id='${rpi_id}'
        `
      )).rows;

      // Cache Data
      statusOfPiBeforeBeingDisconnected[
        rpi_id
      ] = gadgetConnectedToDisconnectedPi;

      // Close all sessions and update status in database for that rpi_id
      gadgetConnectedToDisconnectedPi.map(async gadgetInfo => {
        // Update in DB The Status
        await pool.query(
          `
            UPDATE gadget
              SET status=${false}
              WHERE gadget_id='${gadgetInfo.gadget_id}'
            `
        );

        // Close the session for the gadget which needs to be turned on
        await pool.query(
          `
            UPDATE session
              SET ending_datetime='${new Date().toUTCString()}'
              WHERE gadget_id='${
                gadgetInfo.gadget_id
              }' and ending_datetime IS NULL
            `
        );
      });
    });
  });

  return socketServer;
};

module.exports = {
  socketInitFunction,
  on,
  off,
  schedule
};
