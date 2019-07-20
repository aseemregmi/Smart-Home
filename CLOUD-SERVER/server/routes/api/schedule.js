const router = require('express').Router();
const { schedule } = require('./../../socket/socket');
const pool = require('./../../../database/db');

router.post('/', async (req, res) => {
  try {
    const { rpi_id, gadget_id, action, datetime } = req.body;
    // Get socket id for the corresponding pi
    const raspberryInfo = (await pool.query(
      `
      SELECT rpi_id, socket_id FROM raspberry_pi
        WHERE rpi_id='${rpi_id}'
      `
    )).rows[0];

    const { socket_id } = raspberryInfo;
    if (!socket_id) {
      throw {
        statusId: 400,
        message: 'Raspberry PI is not currently active'
      };
    }
    const gadgetInfo = (await pool.query(
      `
      SELECT gpio_number, power, status FROM gadget
        WHERE gadget_id='${gadget_id}'
      `
    )).rows[0];

    // Update DB
    await pool.query(
      `
    INSERT INTO scheduled_tasks(gadget_id, datetime, action)
      VALUES('${gadget_id}', '${new Date(datetime).toUTCString()}', ${action})
    `
    );

    data = {
      gpio: gadgetInfo.gpio_number,
      action,
      datetime: parseInt(datetime) / 1000
    };

    schedule(socket_id, data);

    res.json({
      msg: `Device is scheduled to be turned ${
        action ? 'on' : 'off'
      } on ${new Date(datetime).toLocaleString()}`
    });
  } catch (err) {
    res.status(err.statusId || 400).json({ error: err.message });
  }
});

module.exports = router;
