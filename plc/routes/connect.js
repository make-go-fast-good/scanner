const connection = readData();
const express = require('express');
const variables = require('../createStruct');
const router = express.Router();

async function readData(conn) {
    const nodes7 = require("nodes7");
    const plc = new nodes7();
    var obj;
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
       obj = plc.readAllItems(valuesReady);
    }

    async function valuesReady(anythingBad, values) {
        if (anythingBad) {
            console.log("SOMETHING WENT WRONG READING VALUES!!!!");
        }
        obj = await values;
        console.log('\nobj here: ')
        console.log(obj);
        return obj;
        //module.exports = obj;
        //doneReading = true;
        //process.exit();
    }
    return obj;
}


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "get your plc data here",
        data: connection
    });
});

module.exports = router;
