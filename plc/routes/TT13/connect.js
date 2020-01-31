const express = require('express');
const variables = require('../createStruct');
const router = express.Router();
const nodes7 = require("nodes7");
const plc = new nodes7();

function readData() {
    return new Promise((resolve) => {
        // const nodes7 = require("nodes7");
        // const plc = new nodes7();
        var data = null;
        // grab the connection
        plc.initiateConnection({
            port: 102,
            host: "10.136.16.31",
            rack: 0,
            slot: 3
        }, connected);

        async function connected(err) {
            console.log('start connected')
            if (typeof err !== "undefined") {
                // We have an error.  Maybe the PLC is not reachable.
                console.log(err);
                process.exit();
            }
            
            console.log('before setTranslationCB')
            plc.setTranslationCB(function (tag) {
                return variables[tag];
            }); // This sets the "translation" to allow us to work with object names

            // We add the returned variables from setTranslations to the PLC reading list
            //console.log(Object.keys(variables))
            
            console.log('before addItems')
            plc.addItems(Object.keys(variables));

            // Now read all the items on the list. 
            // console.log('before myData creation')
            // const myData = new Promise(function (resolve, reject) {
            //     resolve(
            plc.readAllItems(callback)
            //         );
            // });

            // console.log('before myObj')
            // var myObj = {};
            // await myData.then(function () {
            //     for (key in myData) {
            //         let i = 1
            //         while ((parseFloat(Object.keys(key)) / i) > 188) {
            //             i++
            //         }
            //         myObj[i][Object.keys(key)] = key;
            //     }
            // });
            // console.log('myObj = ' + JSON.stringify(myObj));

            async function callback(err, values) {
                // var data;
                if (err) {
                    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
                }
                data = await values;
                
                resolve(data);
                plc.dropConnection(test => {console.log('test drop connection')})
                //process.exit();
            }
    

            //plc.readAllItems(callback)
        }

        // async function callback(err, values) {
        //     // var data;
        //     if (err) {
        //         console.log("SOMETHING WENT WRONG READING VALUES!!!!");
        //     }
        //     data = await values;
        //     //process.exit();
        // }

        // resolve(data);

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
    console.log('router.get called')
    let conn = request.query.conn
    console.log('conn')
    // const result = await readData();
    // console.log('result')
    // response.send(result);

    readData().then(data => {
        console.log('positive result found in from readData')
        response.send(data)
        console.log('response sent')
    }).catch(err => {
        console.log('err in readData promise triggered')
        console.log('err = ' + err)
    })
    
    console.log('router.get end')
}))

module.exports = router;