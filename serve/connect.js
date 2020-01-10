let nodes7 = require("nodes7");

(function readData(conn) {

    let plc = new nodes7();
    var doneReading = false;
    var doneWriting = false;
    var variables = startData();
    console.log('variables: ' + variables);

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
        plc.readAllItems(valuesReady);
    }

    function valuesReady(anythingBad, values) {
        if (anythingBad) {
            console.log("SOMETHING WENT WRONG READING VALUES!!!!");
        }
        console.log(values);
        doneReading = true;
        process.exit();
    }

    function startData() {

        const obj = {};
        const db = "DB1810,";
        const structLen = 182

        for (let i = 0; i < 200; i++) {

            let offset = i * structLen
            createData((6 + offset), 1, "INT")
            createData((8 + offset), 2, "B", true) //Date
            createData((10 + offset), 4, "B", true) //Time of day
            createData((14 + offset), 2, "B", true) //Date
            createData((16 + offset), 4, "B", true) //Time of day 
            createData((20 + offset), 5, "X")
            createData((22 + offset), 8, "X")
            createData((23 + offset), 8, "X")
            createData((24 + offset), 5, "INT")
            createData((36 + offset), 40, "CHAR")
            createData((76 + offset), 1, "INT")
            createData((78 + offset), 8, "X")
            createData((80 + offset), 1, "INT")
            createData((82 + offset), 8, "X")
            createData((84 + offset), 8, "X")
            createData((85 + offset), 1, "X")
            createData((86 + offset), 6, "INT")
            createData((98 + offset), 2, "DINT")
            createData((106 + offset), 8, "X")
            createData((107 + offset), 3, "X")
            createData((108 + offset), 3, "INT")
            createData((114 + offset), 1, "DINT")
            createData((118 + offset), 6, "B")
            createData((124 + offset), 8, "X")
            createData((125 + offset), 1, "CHAR")
            createData((126 + offset), 8, "X")
            createData((127 + offset), 8, "X")
            createData((128 + offset), 8, "X")
            createData((129 + offset), 8, "X")
            createData((130 + offset), 21, "INT")
            createData((172 + offset), 1, "WORD")
            createData((174 + offset), 7, "INT")
        }
        return obj;

        // take four parameters(start, length, type, array)
        function createData(s, l, t, a) {
            // b for byte
            let b;
            switch (t) {
                case "X":
                    b = .1;
                    break;
                case "CHAR":
                case "B":
                    b = 1;
                    break;
                case "INT":
                case "WORD":
                    b = 2;
                    break;
                case "DINT":
                    b = 4;
                    break;
            }

            for (let i = 0; i < l; i++) {

                if (i !== 0 && !a) s += b;
                // If a is true we are working with a byte array, break from loop , we will decode later 
                if (a) {
                    obj[s] = (db + t + s + "." + l.toString())
                    break;
                }

                if (b === .1) {
                    obj[s.toFixed(1)] = (db + t + s.toFixed(1));
                } else {
                    obj[s] = (db + t + s)
                }
                //console.log(obj)
            }
        }

    }
})();