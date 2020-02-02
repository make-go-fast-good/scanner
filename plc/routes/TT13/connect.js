const Express = require('express');
const Variables = require('./createStruct');
const Router = Express.Router();
const Nodes7 = require("nodes7");
const Plc = new Nodes7();
const Keys = require('../getKeys')
class dataRow {
    constructor(_row = 0) {
        this.row = _row;
        this.data = {};
    }
}

function readData(_plcConnection) {

    return new Promise((resolve, reject) => {
        let data;
            // grab the connection, initiate connection to plc then call conencted function
        Plc.initiateConnection(_plcConnection, connected);

        async function connected(err) {
            // We have an error.  Maybe the PLC is not reachable.
            if (typeof err !== "undefined") {
                console.log(err);
                process.exit();
            }

            // This sets the "translation" to allow us to work with object names
            Plc.setTranslationCB(tag => {
                return Variables[tag]
            });

            // Add items to the interal reading polling list.
            Plc.addItems(Object.keys(Variables));

            // Read items then return a values object.
            Plc.readAllItems(callback)

            //Callback function from readAllItems method.
            function callback(err, values) {
                if (err) {
                    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
                    reject(err);
                }

                data = values;

                //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
                const dataKeys = Object.keys(data);

                let plcData = {};

                for (i = 0; i < 200; i++) {
                    //lets construct our object
                    plcData[i] = new dataRow(i);
                    //row is an array of the raw object keys from the callback function
                    let row = dataKeys.filter(val => {
                        //We want the keys to be between (6.0 - 186.0) - (i * 182)
                        return (parseFloat(val) <= ((i * 182) + 186)) && (parseFloat(val) >= (6 + (i * 182)))
                    })
                    //iterate through the dataKeys array and create a sensible structure
                    row.forEach((key, index) => {
                        //TODO: converty S7 Date data type to js dates. 
                        if (index === (1 || 3)) {
                            //console.log("We need date here:");
                            //console.log(data[key]);
                            plcData[i].data[Keys[index]] = data[key];
                        } else if (index === (2 || 4)) {
                            //console.log("We need time here:");
                            //console.log(data[key]);
                            plcData[i].data[Keys[index]] = data[key];
                        } else {
                            plcData[i].data[Keys[index]] = data[key];
                        }
                    })


                }
                //Return the plcData object and resolve the promise.
                resolve(plcData);
                //Drop the connection, to fix all the things. 
                Plc.dropConnection();
            }
        }
    })
}
//make the CORS work, wrap the router in the middle man to catch errors.  
const middleMan = (middleware) => {
    return async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        }
        try {
            await middleware(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

Router.get('/', middleMan(async (request, response) => {
    //convert json to javascript object
    let plcConnection = JSON.parse(request.query.conn);
    readData(plcConnection).then(data => {
        response.send(data)
    }).catch(err => {
        console.log('err = ' + err)
    })
}))

module.exports = Router;