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

// JSON Parser
app.use(express.json());

const server = http.Server(app);
socketInitFunction(server);

//
app.use(express.json());

// Importing routes
app.use('/api/pi/', require('./routes/api/pi'));
app.use('/api/users/', require('./routes/api/user'));

server.listen(port, () => console.log(`Listening in PORT ${port}`));
