const createData() = require("./createData.js")

function createStruct() {
    const db = "DB1852,";
    const data = {};
    const structLen = 204

    for (let i = 0; i < 4; i++) {

        let offset = i * structLen

        createData((0  + offset), 1,   "X")
        createData((2  + offset), 1,   "INT")
        createData((4  + offset), 1,   "B")
        createData((5  + offset), 1,   "B")
        createData((6  + offset), 1,   "B")
        createData((7  + offset), 1,   "B")
        createData((8  + offset), 1,   "WORD")
        createData((10 + offset), 1,   "INT")
        createData((12 + offset), 8,   "X")
        createData((13 + offset), 8,   "X")
        createData((14 + offset), 20,  "CHAR")
        createData((34 + offset), 170, "CHAR")
   }

    return data;
}

module.exports = createStruct();
