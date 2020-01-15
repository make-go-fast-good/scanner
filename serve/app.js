const express = require('express');
const app = express();
const tt13Route = require('../plc/routes/TT13/connect');

app.use('/tt13', tt13Route);

module.exports = app;