const router = require('express').Router();
const pool = require('./../../../database/db');
const { on, off } = require('./../../socket/socket');

router.post('/', async (req, res) => {
  try {
    const {
      rpi_id,
      gadget_type_id,
      gadget_name,
      gpio_number,
      power
    } = req.body;

    await pool.query(
      `
      INSERT INTO gadget (rpi_id,gadget_type_id, gadget_name, gpio_number, power)
          VALUES ('${rpi_id}','${gadget_type_id}','${gadget_name}','${gpio_number}','${power}');
      `
    );
    res.json({
      message: 'Gadget added to user successfully'
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// Get All The Gadgets Of The User
// router.get('/:username', async (req, res) => {
//   try {
//     const { username } = req.params;
//     const { pi_id } = req.body;

//     pool.query(
//       `

//       `
//     );
//   } catch (err) {}
// });

// Authenticated User Can Call This Route
router.post('/on', async (req, res) => {
  try {
    const { rpi_id, gadget_id } = req.body;
    // Get socket id for the corresponding pi
    // See if action is feasible for that gadget
    // Start a session for that gadget
    // Update gadget status in DB and get GPIO PIN of the gadget and send action to PI

    // Dummy Data for test
    action = {
      gpio: 4
    };
    on(action);

    res.json({
      msg: 'Device is turned on'
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err });
  }
});

// Authenticated User Can Call This Route
router.post('/off', async (req, res) => {
  try {
    const { rpi_id, gadget_id } = req.body;
    // Get socket id for the corresponding pi
    // See if action is feasible for that gadget
    // Close a session for that gadget
    // Update gadget status in DB and get GPIO PIN of the gadget and send action to PI

    // Dummy Data for test
    action = {
      gpio: 4
    };
    off(action);

    res.json({
      msg: 'Device is turned off'
    });
  } catch (err) {
    res.status(400).json({ message: err.message || err });
  }
});

module.exports = router;
