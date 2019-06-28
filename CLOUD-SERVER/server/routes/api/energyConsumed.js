const router = require('express').Router();
const pool = require('./../../../database/db');

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { starting_datetime, ending_datetime } = req.query;

    const piData = await pool.query(
      `
      SELECT rpi_id
        FROM raspberry_pi NATURAL JOIN users
        WHERE users.username='${username}'
      `
    );
    const piIds = piData.rows;
    const sessionData = await pool.query(
      `
      SELECT gadget_id, starting_datetime, ending_datetime, gadget_name, power
        FROM session NATURAL JOIN gadget
          where gadget.rpi_id IN (${piIds
            .map(pi => pi.rpi_id)
            .join(
              ','
            )}) and starting_datetime >= '${starting_datetime}' and ending_datetime < '${ending_datetime}'
      `
    );

    res.send(sessionData.rows);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
