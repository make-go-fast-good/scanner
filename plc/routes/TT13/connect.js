const express = require('express');
const variables = require('../createStruct');
const router = express.Router();
var data = {};

function readData() {
    const nodes7 = require("nodes7");
    const plc = new nodes7();
    console.log('We running\n')

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

        // We add the returned variables from setTranslations to the PLC reading list
        plc.addItems(Object.keys(variables));

        // Now read all the items on the list. 
        plc.readAllItems(callback)
    }

    function callback(err, values) {
        if (err) {
            console.log("SOMETHING WENT WRONG READING VALUES!!!!");
        }
        data = values;
        return data;
        //process.exit();
    }
        //console.log('data should be here:(readData)');
        //console.log(data);
        return data;
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