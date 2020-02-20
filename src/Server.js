const express = require('express');
const path = require('path');
const app = express();
const opn = require('open');
const parser = require('./parser');

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
/*
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
    }
*/
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.listen(9000);

opn("../serve/server.js", {app: "node"})

opn("http://127.0.0.1:9000")

