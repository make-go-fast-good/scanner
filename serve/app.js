const express = require('express');
const app = express();
const tt13Route = require('../plc/routes/TT13/connect');
const tt39Route = require('../plc/routes/TT39/connect');

app.use('/tt13', tt13Route);
app.use('/tt39', tt39Route);

module.exports = app;