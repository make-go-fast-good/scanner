const express = require('express');
//const plc = require('../plc/routes/connect');
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'We servin',
        plc: require('../plc/routes/connect')
    })
})

module.exports = app;