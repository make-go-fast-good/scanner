const express = require('express');
const path = require('path');
const app = express();
var opn = require('opn');

console.log("Starting PLC toolkit server at 127.0.0.1:9000\n\nClose this window when finished using the tool.\np.crandall \'20'");

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000);


//launch the page.
opn('../s7_server/s7_Server.exe');
opn('http://127.0.0.1:9000');
