function createStruct() {
    const db = "DB1852,";
    const data = {};
    const structLen = 204

    for (let i = 0; i < 4; i++) {

        let offset = i * structLen

        createData((0 + offset), 1, "X")
        createData((2 + offset), 1, "INT")
        createData((4 + offset), 1, "B")
        createData((5 + offset), 1, "B")
        createData((6 + offset), 1, "B") 
        createData((7 + offset), 1, "B") 
        createData((8 + offset), 1, "WORD") 
        createData((10 + offset), 1, "INT") 
        createData((12 + offset), 8, "X")
        createData((13 + offset), 8, "X")
        createData((14 + offset), 20, "CHAR")
        createData((34 + offset), 170, "CHAR")
   }

    // take four parameters(start, length, type, array)
    function createData(start, len, type, arr) {
        // b for byte
        let b;
        switch (type) {
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

        for (let i = 0; i < len; i++) {
            if (i !== 0 && !arr) start += b;
            // If a is true we are working with a byte array, break from loop , we will decode later 
            if (arr) {
                data[start + ".0"] = (db + type + start + "." + len.toString())
                break;
            }
            if (b === .1) {
                data[start.toFixed(1)] = (db + type + start.toFixed(1));
            } else {
                data[start + ".0"] = (db + type + start)
            }
        }
    }
    return data;
}

module.exports = createStruct();