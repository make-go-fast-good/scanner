let nodes7 = require("nodes7");

console.log('in connect');

(function readData(conn) {
    console.log('in readData');

    let plc = new nodes7();
    var doneReading = false;
    var doneWriting = false;

    var variables = {
        TEST1: "db90,int20096", //fpnr
        TEST2: "db90,int20098", //scanner
        TEST3: "db90,int20110", // reads
        TEST4: "db90,int20112", // no reads
        TEST5: "db90,int20124", // overall read rate
        TEST6: "db90,int20126", // last 100 read rate
        TEST7: "db90,int20128",
        TEST8: "db90,int20132",
        TEST9: "db90,int20136",
        TEST10: "db90,int20140"
    };

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

        plc.addItems(Object.keys(variables));
        //plc.addItems("TEST6");
        //	plc.removeItems(['TEST2', 'TEST3']);  // We could do this.
        //	plc.writeItems(['TEST5', 'TEST6'], [ 867.5309, 9 ], valuesWritten);  // You can write an array of items as well.
        //  plc.writeItems("TEST7", [666, 777], valuesWritten); // You can write a single array item too.
        plc.readAllItems(valuesReady);
    }

    function valuesReady(anythingBad, values) {
        if (anythingBad) {
            console.log("SOMETHING WENT WRONG READING VALUES!!!!");
        }
        console.log(values);
        doneReading = true;
        process.exit();
        // if (doneWriting) {
        //   process.exit();
        // }
    }

    /*
    function valuesWritten(anythingBad) {
      if (anythingBad) {
        console.log("SOMETHING WENT WRONG WRITING VALUES!!!!");
      }
      console.log("Done writing.");
      doneWriting = true;
      if (doneReading) {
        process.exit();
      }
    }
    */
})();