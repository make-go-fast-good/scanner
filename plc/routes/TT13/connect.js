const express = require('express');
const variables = require('../createStruct');
const router = express.Router();
const nodes7 = require("nodes7");
const plc = new nodes7();
class dataRow {
    constructor() {
        this.data = {};
    }
}

function readData() {
    return new Promise((resolve, reject) => {
        let data;

        // grab the connection
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
            plc.setTranslationCB(function (tag) {
                return variables[tag];
            });

            plc.addItems(Object.keys(variables));

            plc.readAllItems(callback)

            async function callback(err, values) {
                if (err) {
                    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
                    reject(err);
                }
                data = await values;

                //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
                const dataKeys = Object.keys(data);

                let retData = {};

                for (i = 0; i < 200; i++) {

                    //lets construct our object
                    retData[i] = new dataRow(i);
                    //row is an array of the raw object keys from the callback function
                    let row = dataKeys.filter(function (val) {
                        return (parseFloat(val) <= ((i * 182) + 186)) && (parseFloat(val) >= (6 + (i * 182)))
                    })
                    //iterate throught he dataKeys array and create a sensible structure
                    row.forEach((key) => {
                        item = parseFloat(key) - (i * 182)
                        retData[i].data[item.toFixed(1)] = data[key];
                    })

                }

                resolve(retData);
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
    //console.log("request: \n");
    //console.log(request);
    //let conn = request.query.conn
    readData().then(data => {
        response.send(data)
    }).catch(err => {
        console.log('err = ' + err)
    })
}))

module.exports = router;