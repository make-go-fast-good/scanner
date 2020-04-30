const Express = require("express");
const Router = Express.Router();
const path = require('path');
const appDir = path.dirname(require.main.filename);


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

Router.get(
  "/",
  wrapper(async (request, response) => {
    console.log("we getting")
    response.sendFile(path.join(__dirname + '/index.html'))
      .catch(err => {
        console.log("err = " + err);
      });
  })
);

module.exports = Router;
