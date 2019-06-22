const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const pool = require('./../../../database/db');

// Only Admins Are Allowed This Route
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = sha256(password);
    await pool.query(
      ` 
        INSERT INTO users (username,password)
          VALUES ('${username}','${hashedPassword}')
      `
    );

    res.json({ message: 'User Created Successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Public Route For Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = sha256(password);

    const { rows } = await pool.query(
      `
        SELECT username FROM users
          WHERE username='${username}' and password='${hashedPassword}'
      `
    );

    if (rows.length == 0) {
      throw { message: 'Not Found', statusCode: 404 };
    }

    const token = jwt.sign(
      { username: rows[0].username, type: 'LOGIN_TOKEN' },
      process.env.jwtSecret
    );

    res.setHeader('token', token);
    res.json({ username: rows[0].username, message: 'Logged In Successfully' });
  } catch (err) {
    res.status(err.statusCode || 400).send(err);
  }
});

module.exports = router;
