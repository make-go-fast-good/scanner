const Express = require("express");
const Variables = require("./createErrorStruct");
const Router = Express.Router();
const Nodes7 = require("nodes7");
const Process = require("./processErrorData");
// const Connections = require("../../../config/Connections.json");
const Connections = require("../../config/Connections.json");

function readData(_plc) {
  let Plc = new Nodes7();

  ////using fs to read the configuration outside of the packaged executable.
  //const myConn = fs.readFileSync(
  //  path.join(path.dirname(process.cwd()), "./config/Connections.json")
  //);

  let plcConnection = Connections[_plc.conn];

  return new Promise((resolve, reject) => {
    let data;
    // Initiate connection to plc then call conencted function
    Plc.initiateConnection(
      plcConnection,
      connected //callback function
    );

    async function connected(err) {
      // We have an error.  Maybe the PLC is not reachable.
      if (typeof err !== "undefined") {
        console.log(err);
      }

      // This sets the "translation" to allow us to work with object names
      Plc.setTranslationCB((tag) => {
        return Variables[tag];
      });

      // Add items to the interal reading polling list.

      Plc.addItems(Object.keys(Variables));
      // Read items then return a values object.
      Plc.readAllItems(callback);

      //Callback function from readAllItems method.
      function callback(err, values) {
        if (err) {
          console.log("SOMETHING WENT WRONG READING VALUES!!!!");
          reject(err);

          Plc.connectionCleanup();
          Plc.resetNow();
        }

        data = values;

        //const promisedData = processPlcData(data);
        const promisedData = Process(data);

        //Return the plcData object and resolve the promise.
        resolve(promisedData);
        //Drop the connection, to fix all the things.
        Plc.connectionCleanup();
        Plc.dropConnection();
        Plc = undefined;
      }
    }
  });
}

//make the CORS work, wrap the router in the middle man to catch errors.
const wrapper = (middleware) => {
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
    let plcConnection;

    if (request.query.area) plcConnection = JSON.parse(request.query.area); //convert json to javascript object

    readData(plcConnection)
      .then((data) => {
        response.send(data);
      })
      .catch((err) => {
        console.log("err = " + err);
      });
  })
);

module.exports = Router;
