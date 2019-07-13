const router = require('express').Router();
const pool = require('./../../../database/db');

router.post('/', async (req, res) => {
  try {
    const { user_id, rpi_name } = req.body;
    await pool.query(
      `
      INSERT INTO raspberry_pi (user_id, rpi_name)
        VALUES ('${user_id}', '${rpi_name}')
      `
    );
    res.json({
      message: 'PI Is Successfully Registered to The User'
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Only user can get their registered PIs
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { rows } = await pool.query(
      `
      SELECT rpi_id, username, rpi_name FROM
        (SELECT rpi_id, user_id, rpi_name FROM raspberry_pi) as raspberry_pi INNER JOIN (SELECT user_id as u_id, username FROM users) as users
        ON raspberry_pi.user_id = users.u_id
        WHERE username='${username}'
      `
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;