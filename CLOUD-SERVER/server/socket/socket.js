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
    console.log('Connected');
    socket.on('init', async data => {
      console.log('PI DATA', data);
      await pool.query(`
      UPDATE raspberry_pi
        SET socket_id='${socket.id}'
        WHERE rpi_id='${data.rpi_id}'
      `);

      // If available get state from cache and emit to the pi
      if (statusOfPiBeforeBeingDisconnected[data.rpi_id]) {
        socket.emit(
          'earlierState',
          statusOfPiBeforeBeingDisconnected[data.rpi_id]
        );

        // Start corresponding sessions again
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
      } else {
        // Get All Gadgets Connected To That Device
        const gadgetConnectedToDisconnectedPi = (await pool.query(
          `
          SELECT gadget_id, status, gpio_number as gpio
          FROM gadget
            WHERE rpi_id='${data.rpi_id}'
          `
        )).rows;

        socket.emit('earlierState', gadgetConnectedToDisconnectedPi);

        // Start corresponding sessions again
        gadgetConnectedToDisconnectedPi.map(async gadgetInfo => {
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

      // Send scheduled info
      const scheduledDataInfo = (await pool.query(
        `SELECT * FROM scheduled_tasks NATURAL JOIN gadget WHERE isScheduledActionCompleted=false AND rpi_id='${
          data.rpi_id
        }'
        `
      )).rows;

      scheduledDataInfo.map(eachSchedule => {
        console.log(eachSchedule.datetime);
        console.log(new Date(eachSchedule.datetime).getTime());
        console.log(new Date().getTime());
        io.to(socket.id).emit('schedule', {
          gpio: eachSchedule.gpio_number,
          action: eachSchedule.action,
          datetime: eachSchedule.datetime,
          gadget_id: eachSchedule.gadget_id,
          schedule_id: eachSchedule.schedule_id
        });
      });

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

    socket.on('scheduleOn', async data => {
      console.log('Got schedule On');
      console.log(data);
      try {
        const { gadget_id, schedule_id } = data;

        // Update gadgetStatus and start the session
        await pool.query(
          `
            UPDATE gadget
              SET status=${true}
              WHERE gadget_id='${gadget_id}'
            `
        );

        // Start a session
        await pool.query(
          `
            INSERT INTO session (gadget_id, starting_datetime)
              VALUES ('${gadget_id}', '${new Date().toUTCString()}')
            `
        );

        // Update scheduled_tasks saying it was completed
        await pool.query(
          `
          UPDATE scheduled_tasks
            SET isScheduledActionCompleted=${true}
            WHERE schedule_id='${schedule_id}'
          `
        );
      } catch (err) {
        console.log('Schedule On Error');
        console.log(err);
      }
    });

    socket.on('scheduleOff', async data => {
      console.log('Got Schedule Off');
      console.log(data);

      try {
        const { gadget_id, schedule_id } = data;

        // Update DB
        await pool.query(
          `
            UPDATE gadget
              SET status=${false}
              WHERE gadget_id='${gadget_id}'
            `
        );

        // Close the session
        await pool.query(
          `
            UPDATE session
              SET ending_datetime='${new Date().toUTCString()}'
              WHERE gadget_id='${gadget_id}' and ending_datetime IS NULL
            `
        );

        // Update scheduled_tasks saying it was completed
        await pool.query(
          `
          UPDATE scheduled_tasks
            SET isScheduledActionCompleted=${true}
            WHERE schedule_id='${schedule_id}'
          `
        );
      } catch (err) {
        console.log('Schedule Off Error');
        console.log(err);
      }
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
