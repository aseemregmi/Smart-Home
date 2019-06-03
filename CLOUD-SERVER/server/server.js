// For environment Variables
require('dotenv').config();

// PORT Setup
const port = process.env.PORT || 3000;

// Libraries
const express = require('express');
const http = require('http');
const socketInitFunction = require('./socket/socket');

// Init Servers
const app = express();
const server = http.Server(app);
socketInitFunction(server);

// Importing routes
app.use('/apis/pi/', require('./routes/api/pi'));

server.listen(port, () => console.log(`Listening in PORT ${port}`));
