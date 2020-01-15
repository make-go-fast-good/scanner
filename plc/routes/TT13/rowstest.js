const express = require('express');
const variables = require('../createStruct');
const router = express.Router();
var plcData = {};

function readData() {
    const nodes7 = require("nodes7");
    const plc = new nodes7();
    console.log('We running\n')
    console.log('Variables here: \n')
    console.log(variables)

    plc.initiateConnection({
        port: 102,
        host: "10.136.16.31",
        rack: 0,
        slot: 3
    }, connected);

    function connected(err) {
        if (typeof err !== "undefined") {
            // We have an error.  Maybe the PLC is not reachable.
            console.log(err);
            process.exit();
        }
        plc.setTranslationCB(function (tag) {
            return variables[tag];
        }); // This sets the "translation" to allow us to work with object names
        //for (let i = 0; i < 4; i++) {
            // We add the returned variables from setTranslations to the PLC reading list
            //plc.addItems(Object.keys([variables[i]]));
            plc.addItems(Object.keys(variables[0]));
            /*
            console.log('keys: \n')
            console.log(Object.keys(variables));
            console.log('entries: \n')
            console.log(Object.entries(variables));
            console.log(variables);
            */

            // Now read all the items on the list. 
            plc.readAllItems(callback)
            plc.removeItems();
        //}

    }

    function callback(err, values) {
        if (err) {
            console.log("SOMETHING WENT WRONG READING VALUES!!!!");
        }
        plcData = values;
        return plcData;
        //process.exit();
    }
    //console.log('plcData should be here:(readData)');
    //console.log(plcData);
    return plcData;
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
    const result = await readData();
    response.send(result);
}))

module.exports = router;