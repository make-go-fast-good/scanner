const Express = require("express");
//const Variables = require("./createStruct");
const TT13Struct = require("./createstruct");
const Router = Express.Router();
const Nodes7 = require("nodes7");
const Plc = new Nodes7();
const Keys = require("../TT13/getTT13Keys");

class dataRow {
  constructor(_index = 0) {
    this.index = _index;
    this.barcode = "";
    this.data = {};
  }
}

function readData(_plcConnection) {
  return new Promise((resolve, reject) => {
    let data;
    const Variables = new TT13Struct(200);
    //console.log(Variables);
    // Initiate connection to plc then call conencted function
    Plc.initiateConnection(
      _plcConnection || {
        port: 102,
        host: "10.136.16.31",
        rack: 0,
        slot: 3
      },
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
        return Variables.data[tag];
      });

      // Add items to the interal reading polling list.
      Plc.addItems(Object.keys(Variables.data));

      // Read items then return a values object.
      Plc.readAllItems(callback);

      //Callback function from readAllItems method.
      function callback(err, values) {
        if (err) {
          console.log("SOMETHING WENT WRONG READING VALUES!!!!");
          reject(err);
        }

        data = values;

        const promisedData = processPlcData(data);

        //Return the plcData object and resolve the promise.
        resolve(promisedData);
        //Drop the connection, to fix all the things.
        Plc.dropConnection();
      }
    }
  });
}

function processPlcData(data) {
  //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
  const dataKeys = Object.keys(data);

  let plcData = [];

  for (i = 0; i < 200; i++) {
    //lets construct our object
    plcData[i] = new dataRow(i + 1); //Add one so the index starts at one in the table.
    //row is an array of the raw object keys from the callback function
    let row = dataKeys.filter(val => {
      //We want the keys to be between (6.0 - 186.0) - (i * 182)
      return parseFloat(val) <= i * 182 + 186 && parseFloat(val) >= 6 + i * 182;
    });

    //iterate through the dataKeys array and create a sensible structure
    let barcode = [];
    let day = 86400000; // milliseconds in a day
    let elapsed = 631152000000; // milliseconds between jan 1, 1970 & jan 1, 1990

    row.forEach((key, index) => {
      if (data[key] === true) data[key] = "true"; // change from boolean to string representation so the data table can read.
      if (data[key] === false) data[key] = "false";

      if (index >= 31 && index <= 71) {
        plcData[i].barcode += data[key]; // build a string from the char array 
      }

      //Siemens Date data type return a hex value for number of days since Jan 1, 1990
      //Convert that value to milliseconds since Jan 1, 1990, then add ms between 1990 & 1970.
      //86,400,000 milliseconds in every day.
      //631,152,000,000 milliseconds between 1970 to 1990
      if (index === 1 || index === 3) {
        let byte_0 = data[key][0];
        let byte_1 = data[key][1];

        let word = ((byte_0 & 0xff) << 8) | (byte_1 & 0xff); //combine the two bytes to create a word.

        let ms_date = word * day + elapsed; // (num of days since 1-1-1990 * 86400000) + 631,152,000,000
        let date = new Date(ms_date);

        plcData[i].data[Keys[index]] = date.toJSON().slice(0, 10); //cut off the time of day, we only care about the date here. 
      } else if (index === 2 || index === 4) {
        //Siemens Time data type returns the number of milliseconds since the beginning of the day.
        let byte_0 = data[key][0];
        let byte_1 = data[key][1];
        let byte_2 = data[key][2];
        let byte_3 = data[key][3];

        let word_0 = ((byte_0 & 0xff) << 8) | (byte_1 & 0xff); //combine the two bytes to create a word.
        let word_1 = ((byte_2 & 0xff) << 8) | (byte_3 & 0xff); 

        let ms_time = ((word_0 & 0xffff) << 16) | (word_1 & 0xffff); //combine words for double word
        let time = new Date(ms_time);

        plcData[i].data[Keys[index]] = time.toJSON().slice(11, 19); //cut off that 1970 date, we only care about time of day.
      } else {
        plcData[i].data[Keys[index]] = data[key]; // normal key
      }

      plcData[i].barcode = plcData[i].barcode.trim(); //remove the white space
    });
  }

  return plcData;
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
    let plcConnection;
    //convert json to javascript object
    if (request.query.conn) plcConnection = JSON.parse(request.query.conn);

    readData(plcConnection)
      .then(data => {
        response.send(data);
      })
      .catch(err => {
        console.log("err = " + err);
      });
  })
);

module.exports = Router;