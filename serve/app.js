const express = require('express');
const app = express();
const path = require('path');

const tt13Data = require('./routes/plc/TT13/connect');
//const connections = require('./config/Connections');

//app.use('/config/connections', connections);
app.use('/TT13/connect', tt13Data);

module.exports = app;