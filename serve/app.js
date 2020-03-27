const express = require('express');
const app = express();
const path = require('path');

const tt13Data = require('./routes/plc/TT13/connect');
const overheadData = require('./routes/plc/OVERHEAD/connect');
const tt31Data = require('./routes/plc/TT31/connect');
const errorData = require('./routes/plc/ERROR/connect');
//const bookmarks = require('./routes/bookmarks/');
//const blockade = require('./routes/blockade');

app.use('/TT13/connect', tt13Data);
app.use('/OVERHEAD/connect', overheadData);
app.use('/TT31/connect', tt31Data);
app.use('/ERROR/connect', errorData);

module.exports = app;