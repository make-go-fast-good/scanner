let nodes7 = require("nodes7");

(function readData(conn) {

    let plc = new nodes7();
    var doneReading = false;
    var doneWriting = false;
    var variables = startData();
    console.log('variables: ' + variables);

    /*
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
    */

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

 function startData() {


    const obj = {};
    const db = "DB1810,";

    createData(6, 1, "int")
    createData(20, 5, "X")
    createData(22, 8, "X")
    createData(23, 8, "X")
    createData(24, 5, "int")
    createData(36, 40, "char")
    createData(76, 1, "int")
    createData(78, 8, "X")
    createData(80, 1, "int")
    createData(82, 8, "X")
    createData(84, 8, "X")
    createData(85, 1, "X")
    createData(86, 6, "int")
    createData(98, 2, "dint")
    createData(106, 8, "X")
    createData(107, 3, "X")
    createData(108, 3, "int")
    createData(114, 1, "dint")
    createData(118, 6, "byte")
    createData(124, 8, "X")
    createData(125, 1, "char")
    createData(126, 8, "X")
    createData(127, 8, "X")
    createData(128, 8, "X")
    createData(129, 8, "X")
    createData(130, 21, "int")
    createData(172, 1, "word")
    createData(174, 7, "int")

    console.log(obj)

    return obj;

    // take four parameters(start, length, type, first)
    function createData(s, l, t) {
        let b;
        switch (t) {
            case "X":
                b = .1;
                break;
            case "char":
            case "byte":
                b = 1;
                break;
            case "int":
            case "word":
                b = 2;
                break;
            case "dint":
                b = 4;
                break;
        }

        for (let i = 0; i < l; i++) {

            if (i !== 0) s += b;

            if (b === .1) {
                obj[s.toFixed(1)] = (db + t + s.toFixed(1));
            } else {
                obj[s] = (db + t + s)
            }
            //console.log(obj)
        }
    }

}})();