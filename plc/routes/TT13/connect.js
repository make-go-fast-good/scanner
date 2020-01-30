const express = require('express');
const variables = require('../createStruct');
const router = express.Router();

function readData() {
    return new Promise((resolve) => {
        const nodes7 = require("nodes7");
        const plc = new nodes7();
        plc.initiateConnection({
            port: 102,
            host: "10.136.16.31",
            rack: 0,
            slot: 3
        }, connected);

        async function connected(err) {
            if (typeof err !== "undefined") {
                // We have an error.  Maybe the PLC is not reachable.
                console.log(err);
                process.exit();
            }
            plc.setTranslationCB(function (tag) {
                return variables[tag];
            }); // This sets the "translation" to allow us to work with object names

            // We add the returned variables from setTranslations to the PLC reading list
            //console.log(Object.keys(variables))
            plc.addItems(Object.keys(variables));
            var data;

            // Now read all the items on the list. 
            const myData = new Promise(function (resolve, reject) {
                resolve(plc.readAllItems(callback));
            });

            var myObj = {};
            await myData.then(function () {
                for (key in myData) {
                    let i = 1
                    while ((parseFloat(Object.keys(key)) / i) > 188) {
                        i++
                    }
                    myObj[i][Object.keys(key)] = key;
                }
            });
            console.log(myObj);
            //plc.readAllItems(callback)
        }

        async function callback(err, values) {
            if (err) {
                console.log("SOMETHING WENT WRONG READING VALUES!!!!");
            }
            data = await values;
            //process.exit();
        }

        return resolve(data);

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
    let conn = request.query.conn
    const result = await readData();
    response.send(result);
}))

module.exports = router;