const express = require('express');
const app = express();
const tt13Route = require('../plc/routes/TT13/connect');
const tt39Route = require('../plc/routes/TT39/connect');
/*
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200);
    }
})
*/

app.use('/tt13', tt13Route);
app.use('/tt39', tt39Route);

module.exports = app;