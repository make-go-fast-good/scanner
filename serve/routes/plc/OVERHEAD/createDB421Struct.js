function createStruct() {

    const db = "DB421,";
    const structLen = 209

    let createData = require("./createData.js")
    let data = {};

    for (let i = 0; i < 1; i++) {

        let offset = i * structLen

        createData(data, db, (0   + offset), 4,  "INT")
        createData(data, db, (8   + offset), 4,  "X")
        createData(data, db, (10  + offset), 3,  "X")
        createData(data, db, (12  + offset), 7,  "INT")
        createData(data, db, (26  + offset), 1,  "DINT")
        createData(data, db, (36  + offset), 8,  "INT")
        createData(data, db, (52  + offset), 1,  "DINT")
        createData(data, db, (56  + offset), 2,  "INT")
        createData(data, db, (60  + offset), 1,  "CHAR")
        createData(data, db, (62  + offset), 3,  "INT")
        createData(data, db, (68  + offset), 7,  "X")
        createData(data, db, (70  + offset), 8,  "X")
        createData(data, db, (71  + offset), 8,  "X")
        createData(data, db, (72  + offset), 8,  "X")
        createData(data, db, (73  + offset), 8,  "X")
        createData(data, db, (74  + offset), 40, "CHAR")
        createData(data, db, (114 + offset), 1,  "X")
        createData(data, db, (116 + offset), 1,  "INT")
        createData(data, db, (118 + offset), 4,  "X")
        createData(data, db, (119 + offset), 1,  "CHAR")
        createData(data, db, (120 + offset), 3,  "INT")
        createData(data, db, (150 + offset), 3,  "INT")
        createData(data, db, (156 + offset), 10, "B")
        createData(data, db, (168 + offset), 1,  "INT")
        createData(data, db, (170 + offset), 2,  "X")
        createData(data, db, (172 + offset), 1,  "INT")
        createData(data, db, (174 + offset), 2,  "CHAR")
        createData(data, db, (176 + offset), 1,  "X")
        createData(data, db, (178 + offset), 4,  "CHAR")
        createData(data, db, (182 + offset), 4,  "INT")
        createData(data, db, (190 + offset), 1,  "X")
        createData(data, db, (192 + offset), 1,  "X")
        createData(data, db, (194 + offset), 32, "B")
        createData(data, db, (226 + offset), 2,  "X")
        createData(data, db, (228 + offset), 3,  "INT")
        createData(data, db, (234 + offset), 16, "B")
        createData(data, db, (250 + offset), 3,  "INT")
   }

    return data;
}

module.exports = createStruct();
