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

module.exports = createData();
