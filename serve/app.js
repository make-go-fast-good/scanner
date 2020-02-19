const express = require('express');
const app = express();
const path = require('path');

const tt13Data = require('./routes/plc/TT13/connect');

app.use('/TT13/connect', tt13Data);


/*
app.use('/static', '../build/static');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

//app.get('/TT13', './routes/build/TT13/index.html');

app.route('/TT13/index.html').get(function(req,res)
{
    res.sendFile(path.join(__dirname + '/routes/build/index.html'));
});

//make the CORS work, wrap the router in the middle man to catch errors.
const wrapper = middleware => {
  return async (req, res, next) => {
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
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

app.get(
  "/TT13/index.html",
  wrapper(async (request, response) => {
        response.sendFile(path.join(__dirname + '/routes/build/index.html'));
      })
);

*/

module.exports = app;