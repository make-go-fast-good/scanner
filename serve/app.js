const express = require('express');
const app = express();
const plcRoute = require('../plc/routes/connect');

app.use('/plc', plcRoute);

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'We servin',
        data: plc
    });
});
*/

module.exports = app;