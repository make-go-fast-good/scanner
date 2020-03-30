const Express = require("express");
const Router = Express.Router();
const Nodes7 = require("nodes7");
const Plc = new Nodes7();
const fs = require("fs");
const path = require('path');
const appDir = path.dirname(require.main.filename);

const db171Process = require("./processDB171Data");
const db421Process = require("./processDB421Data");
const db1852Process = require("./processDB1852Data");

const db171Variables = require("./createDB171Struct");
const db421Variables = require("./createDB421Struct");
const db1852Variables = require("./createDB1852Struct");

function readData(_plc) {
    let Variables;
    let Process;

    switch (_plc.conn) {
        case 'C08':
            Variables = db1852Variables
            Process   = db1852Process
            break;

        case 'C09':
        case 'C10':
            Variables = db421Variables
            Process   = db421Process
            break;

        case 'C11':
            Variables = db171Variables
            Process   = db171Process
            break;

        case 'C12':
            Variables = db422Variables
            Process   = db421Process
            break;

        default:
            Variables = db1852Variables
            Process   = db1852Process
    }

  //using fs to read the configuration outside of the packaged executable.
  const myConn = fs.readFileSync(path.join(path.dirname(process.cwd()), './config/Connections.json'))
  let Connections = JSON.parse(myConn)
  let plcConnection = Connections[_plc.conn]

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
        process.exit();
      }

      // This sets the "translation" to allow us to work with object names
      Plc.setTranslationCB(tag => {
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
        }

        data = values;
        console.log(data);

        //const promisedData = processPlcData(data);
        const promisedData = Process(data);

        //Return the plcData object and resolve the promise.
        resolve(promisedData);
        //Drop the connection, to fix all the things.
        Plc.dropConnection();
      }
    }
  });
}

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
    let plc;

    if (request.query.area){
            plc = JSON.parse(request.query.area); //convert json to javascript object
    }

    readData(plc)
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        console.log("err = " + err);
      });
  })
);

module.exports = Router;
