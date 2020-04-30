const express = require('express');
const app = express();
const path = require('path');

const tt13Data     = require('./routes/plc/TT13/connect');
const overheadData = require('./routes/plc/OVERHEAD/connect');
const errorData    = require('./routes/plc/ERROR/connect');
const coordinates    = require('./routes/coordinates/connect');

app.use('/TT13/connect', tt13Data);
app.use('/OVERHEAD/connect', overheadData);
app.use('/ERROR/connect', errorData);
app.use('/COORDINATES', coordinates);

/*
app.use('/COORDINATES', function(req, res){
    res.sendFile(path.join(__path.dirname + './routes/coordinates/index.html'))
});
*/

module.exports = app;
