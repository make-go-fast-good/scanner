const Express = require("express");
const Router = Express.Router();
const path = require("path");
const appDir = path.dirname(require.main.filename);

Router.use(Express.static(__dirname + "public"));

Router.get("/", function (request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  response.sendFile(path.join(__dirname + "/index.html"));

  /*
    response.sendFile(path.join(__dirname + '/'))
    app.use('/static', Express.static(path.join(__dirname, 'coordinates')))
    response.sendFile(Express.static(path.join(__dirname + '/index.html')))
    */
});

module.exports = Router;
