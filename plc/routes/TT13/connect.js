const express = require('express');
const variables = require('../createStruct');
const router = express.Router();
const nodes7 = require("nodes7");
const plc = new nodes7();
class dataRow {
    constructor(_row = 0) {
        this.row = _row;
        this.data = {};
    }
}

function readData() {
    return new Promise((resolve, reject) => {
        let data;

        // grab the connection
        //TODO get connection object from the front end
        plc.initiateConnection({
            port: 102,
            host: "10.136.16.31",
            rack: 0,
            slot: 3
        }, connected);

        async function connected(err) {
            // We have an error.  Maybe the PLC is not reachable.
            if (typeof err !== "undefined") {
                console.log(err);
                process.exit();
            }

            // This sets the "translation" to allow us to work with object names
            plc.setTranslationCB(tag => {
                return variables[tag]
            });

            // Add items to the interal reading polling list.
            plc.addItems(Object.keys(variables));

            // Read items then return a values object.
            plc.readAllItems(callback)

            //Callback function from readAllItems method.
            async function callback(err, values) {
                if (err) {
                    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
                    reject(err);
                }
                data = await values;

                //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
                const dataKeys = Object.keys(data);

                let plcData = {};

                for (i = 0; i < 200; i++) {
                    //lets construct our object
                    plcData[i] = new dataRow(i);
                    //row is an array of the raw object keys from the callback function
                    let row = dataKeys.filter(val => {
                        return (parseFloat(val) <= ((i * 182) + 186)) && (parseFloat(val) >= (6 + (i * 182)))
                    })
                    //iterate through the dataKeys array and create a sensible structure
                    row.forEach(key => {
                        item = parseFloat(key) - (i * 182)
                        plcData[i].data[item.toFixed(1)] = data[key];
                    })

                }
                    //Return the plcData object and resolve the promise.
                resolve(plcData);
                    //Drop the connection, to fix all the things. 
                plc.dropConnection();
            }
        }
    })
}

const awaitHandlerFactory = (middleware) => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

router.get('/', awaitHandlerFactory(async (request, response) => {
    //let conn = request.query.conn
    readData().then(data => {
        response.send(data)
    }).catch(err => {
        console.log('err = ' + err)
    })
}))

module.exports = router;