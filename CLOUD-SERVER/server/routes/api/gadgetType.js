const router = require('express').Router();
const pool = require('./../../../database/db');

// Only Admin Can Access This Route
router.post('/', async (req, res) => {
  try {
    const { gadget_type_name } = req.body;
    await pool.query(
      `
      INSERT INTO gadget_type (gadget_type_name)
        VALUES ('${gadget_type_name}')
      `
    );

    res.json({ message: 'Gadget Type Created Successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM gadget_type
      `
    );
    res.json(rows);
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
