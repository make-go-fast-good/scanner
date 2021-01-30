const express = require("express");
const app = express();
const path = require("path");

const tt13Data = require("./routes/plc/TT13/connect");
const errorData = require("./routes/plc/ERROR/connect");
const coordinates = require("./routes/coordinates/connect");
const scanners = require("./routes/plc/SCANNERS/connect");
const bookmarks = require("./routes/bookmarksflt/connect");

app.use("/TT13/connect", tt13Data);
app.use("/ERROR/connect", errorData);
app.use("/SCANNERS/connect", scanners);
app.use("/COORDINATES", coordinates);
app.use("/BOOKMARKS/connect", bookmarks);

/*
app.use(express.static('./routes/coordinates/public'));
app.use('/COORDINATES', express.static('coordinates'));
*/

module.exports = app;
