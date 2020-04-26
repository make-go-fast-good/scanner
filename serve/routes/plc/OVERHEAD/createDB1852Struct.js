function createStruct() {

    const db = "DB1852,";
    const structLen = 204

    let createData = require("./createData.js")
    let data = {};

    for (let i = 0; i < 4; i++) {

        let offset = i * structLen

        createData(data, db, (0  + offset), 1,   "X")
        createData(data, db, (2  + offset), 1,   "INT")
        createData(data, db, (4  + offset), 1,   "B")
        createData(data, db, (5  + offset), 1,   "B")
        createData(data, db, (6  + offset), 1,   "B")
        createData(data, db, (7  + offset), 1,   "B")
        createData(data, db, (8  + offset), 1,   "WORD")
        createData(data, db, (10 + offset), 1,   "INT")
        createData(data, db, (12 + offset), 8,   "X")
        createData(data, db, (13 + offset), 8,   "X")
        createData(data, db, (14 + offset), 20,  "CHAR")
        createData(data, db, (34 + offset), 170, "CHAR")
   }

   // console.log('Data Struct Here DB1852: ')
   // console.log(data)

    return data;
}

module.exports = createStruct();
