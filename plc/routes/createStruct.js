const data = createStruct();

function createStruct() {
    const db = "DB1810,";
    const rows = {};
    let data = {};
    const structLen = 182

    for (let i = 0; i < 5; i++) {
        let offset = i * structLen
        data = {};

        createData(i, (6 + offset), 1, "INT")
        createData(i, (8 + offset), 2, "B", true) //Date
        createData(i, (10 + offset), 4, "B", true) //Time of day
        createData(i, (14 + offset), 2, "B", true) //Date
        createData(i, (16 + offset), 4, "B", true) //Time of day 
        createData(i, (20 + offset), 5, "X")
        createData(i, (22 + offset), 8, "X")
        createData(i, (23 + offset), 8, "X")
        createData(i, (24 + offset), 5, "INT")
        createData(i, (36 + offset), 40, "CHAR")
        createData(i, (76 + offset), 1, "INT")
        createData(i, (78 + offset), 8, "X")
        createData(i, (80 + offset), 1, "INT")
        createData(i, (82 + offset), 8, "X")
        createData(i, (84 + offset), 8, "X")
        createData(i, (85 + offset), 1, "X")
        createData(i, (86 + offset), 6, "INT")
        createData(i, (98 + offset), 2, "DINT")
        createData(i, (106 + offset), 8, "X")
        createData(i, (107 + offset), 3, "X")
        createData(i, (108 + offset), 3, "INT")
        createData(i, (114 + offset), 1, "DINT")
        createData(i, (118 + offset), 6, "B")
        createData(i, (124 + offset), 8, "X")
        createData(i, (125 + offset), 1, "CHAR")
        createData(i, (126 + offset), 8, "X")
        createData(i, (127 + offset), 8, "X")
        createData(i, (128 + offset), 8, "X")
        createData(i, (129 + offset), 8, "X")
        createData(i, (130 + offset), 21, "INT")
        createData(i, (172 + offset), 1, "WORD")
        createData(i, (174 + offset), 7, "INT")
        
        rows[i] = data;

    }

    // take four parameters(start, length, type, array)
    function createData(index, start, len, type, arr) {
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
                data[start] = (db + type + start + "." + len.toString())
                break;
            }
            if (b === .1) {
                data[start.toFixed(1)] = (db + type + start.toFixed(1));
            } else {
                data[start] = (db + type + start)
            }
        }
    }
    return rows;
}

module.exports = data;