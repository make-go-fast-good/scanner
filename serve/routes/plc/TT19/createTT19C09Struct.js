function createStruct() {
    const db = "DB421,";
    const data = {};
    const structLen = 429

    for (let i = 0; i < 1; i++) {

        let offset = i * structLen

        createData((0 + offset), 4, "INT")
        createData((8 + offset), 3, "X")
        createData((10 + offset), 3, "X")
        createData((12 + offset), 2, "WORD")
        createData((16 + offset), 6, "INT")
        createData((26 + offset), 1, "DINT")
        createData((36 + offset), 12, "INT")
        createData((60 + offset), 10, "B")
        createData((72 + offset), 3, "INT")
        createData((78 + offset), 1, "DINT")
        createData((82 + offset), 2, "INT")
        createData((86 + offset), 1, "CHAR")
        createData((88 + offset), 2, "INT")
        createData((92 + offset), 7, "X")
        createData((94 + offset), 40, "CHAR")
        createData((134 + offset), 2, "X")
        createData((136 + offset), 3, "INT")
        createData((142 + offset), 2, "X")
        createData((144 + offset), 1, "INT")
        createData((146 + offset), 1, "WORD")
        createData((148 + offset), 1, "INT")
        createData((150 + offset), 8, "X")
        createData((151 + offset), 4, "B")
        createData((156 + offset), 3, "WORD")
        createData((156 + offset), 2, "DWORD")
        createData((170 + offset), 1, "X")
        createData((172 + offset), 1, "INT")
        createData((174 + offset), 4, "X")
        createData((175 + offset), 1, "CHAR")
        createData((176 + offset), 3, "INT")
        createData((206 + offset), 3, "INT")
        createData((212 + offset), 10, "B")
        createData((224 + offset), 1, "INT")
        createData((226 + offset), 2, "X")
        createData((228 + offset), 1, "INT")
        createData((230 + offset), 2, "CHAR")
        createData((232 + offset), 1, "X")
        createData((234 + offset), 4, "CHAR")
        createData((238 + offset), 4, "INT")
        createData((246 + offset), 1, "X")
        createData((248 + offset), 1, "X")
        createData((250 + offset), 200, "B")
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
            case "DWORD":
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
