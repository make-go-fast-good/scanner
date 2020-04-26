function createStruct() {

    const db = "DB422,";
    const structLen = 363

    let createData = require("./createData.js")
    let data = {};

    for (let i = 0; i < 1; i++) {

        let offset = i * structLen

        createData(data, db, (0   + offset), 4,   "INT")
        createData(data, db, (8   + offset), 3,   "X")
        createData(data, db, (10  + offset), 3,   "X")
        createData(data, db, (12  + offset), 2,   "WORD")
        createData(data, db, (16  + offset), 5,   "INT")
        createData(data, db, (26  + offset), 1,   "DINT")
        createData(data, db, (36  + offset), 12,  "INT")
        createData(data, db, (60  + offset), 10,  "B")
        createData(data, db, (72  + offset), 3,   "INT")
        createData(data, db, (78  + offset), 1,   "DINT")
        createData(data, db, (82  + offset), 2,   "INT")
        createData(data, db, (86  + offset), 1,   "CHAR")
        createData(data, db, (88  + offset), 2,   "INT")
        createData(data, db, (92  + offset), 7,   "X")
        createData(data, db, (94  + offset), 40,  "CHAR")
        createData(data, db, (134 + offset), 2,   "X")
        createData(data, db, (136 + offset), 3,   "INT")
        createData(data, db, (142 + offset), 2,   "X")
        createData(data, db, (144 + offset), 1,   "INT")
        createData(data, db, (146 + offset), 1,   "WORD")
        createData(data, db, (148 + offset), 1,   "INT")
        createData(data, db, (150 + offset), 8,   "X")
        createData(data, db, (151 + offset), 4,   "B")
        createData(data, db, (156 + offset), 3,   "WORD")
        createData(data, db, (162 + offset), 2,   "DWORD")
        createData(data, db, (170 + offset), 1,   "X")
        createData(data, db, (172 + offset), 1,   "INT")
        createData(data, db, (174 + offset), 4,   "X")
        createData(data, db, (175 + offset), 1,   "CHAR")
        createData(data, db, (176 + offset), 3,   "INT")
        createData(data, db, (206 + offset), 3,   "INT")
        createData(data, db, (212 + offset), 10,  "B")
        createData(data, db, (224 + offset), 1,   "INT")
        createData(data, db, (226 + offset), 2,   "X")
        createData(data, db, (228 + offset), 1,   "INT")
        createData(data, db, (230 + offset), 2,   "CHAR")
        createData(data, db, (232 + offset), 1,   "X")
        createData(data, db, (234 + offset), 4,   "CHAR")
        createData(data, db, (238 + offset), 4,   "INT")
        createData(data, db, (246 + offset), 1,   "X")
        createData(data, db, (248 + offset), 1,   "X")
        createData(data, db, (250 + offset), 200, "B")
   }

    return data;
}

module.exports = createStruct();

