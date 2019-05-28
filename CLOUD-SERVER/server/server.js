require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');

const app = express();

// Importing routes
const pi = require('./routes/api/pi');

app.use('/apis/pi/', pi);

app.listen(port, () => console.log(`Listening in PORT ${port}`));

// For DB (Later task)
// const { Pool } = require('pg');

// const pool = new Pool();

// (async () => {
//   try {
//     const res = await pool.query('SELECT * FROM users');
//     console.log(res.rows[0]);
//   } finally {
//     pool.end();
//   }
// })().catch(e => console.log(e.stack));
