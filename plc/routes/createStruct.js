const data = createStruct();

function createStruct() {
    const db = "DB1810,";
    const rows = {};
    let data = {};
    const structLen = 182

    for (let i = 0; i < 5; i++) {
        let offset = i * structLen
        data = {};

        createData(6, (6 + offset), 1, "INT")
        createData(8, (8 + offset), 2, "B", true) //Date
        createData(10, (10 + offset), 4, "B", true) //Time of day
        createData(14, (14 + offset), 2, "B", true) //Date
        createData(16, (16 + offset), 4, "B", true) //Time of day 
        createData(20, (20 + offset), 5, "X")
        createData(22, (22 + offset), 8, "X")
        createData(23, (23 + offset), 8, "X")
        createData(24, (24 + offset), 5, "INT")
        createData(36, (36 + offset), 40, "CHAR")
        createData(76, (76 + offset), 1, "INT")
        createData(78, (78 + offset), 8, "X")
        createData(80, (80 + offset), 1, "INT")
        createData(82, (82 + offset), 8, "X")
        createData(84, (84 + offset), 8, "X")
        createData(85, (85 + offset), 1, "X")
        createData(86, (86 + offset), 6, "INT")
        createData(98, (98 + offset), 2, "DINT")
        createData(106, (106 + offset), 8, "X")
        createData(107, (107 + offset), 3, "X")
        createData(108, (108 + offset), 3, "INT")
        createData(114, (114 + offset), 1, "DINT")
        createData(118, (118 + offset), 6, "B")
        createData(124, (124 + offset), 8, "X")
        createData(125, (125 + offset), 1, "CHAR")
        createData(126, (126 + offset), 8, "X")
        createData(127, (127 + offset), 8, "X")
        createData(128, (128 + offset), 8, "X")
        createData(129, (129 + offset), 8, "X")
        createData(130, (130 + offset), 21, "INT")
        createData(172, (172 + offset), 1, "WORD")
        createData(174, (174 + offset), 7, "INT")
        
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
                data[index] = (db + type + start + "." + len.toString())
                break;
            }
            if (b === .1) {
                data[index] = (db + type + start.toFixed(1));
            } else {
                data[index] = (db + type + start)
            }
        }
    }
    return rows;
}

module.exports = data;