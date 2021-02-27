const express = require("express");
const app = express();
const path = require("path");

const aglink = require("./routes/plc/aglink/connect");
const error = require("./routes/plc/error/connect");
const coordinates = require("./routes/coordinates/connect");
const scanners = require("./routes/plc/scanners/connect");
const bookmarks = require("./routes/bookmarks/connect");

app.use("/aglink/connect", aglink);
app.use("/error/connect", error);
app.use("/scanners/connect", scanners);
app.use("/coordinates", coordinates);
app.use("/bookmarks/connect", bookmarks);

/*
app.use(express.static('./routes/coordinates/public'));
app.use('/COORDINATES', express.static('coordinates'));
*/

module.exports = app;
