function createStruct() {

    const db = ["DB423,", "DB424,"];
    const structLen = 363

    let createData = require("./createDataC10")
    let data = {};

    for (let i = 0; i < 2; i++) {

        let offset = i * structLen

        createData(data, db[i],offset, (0   + offset), 4,   "INT")
        createData(data, db[i],offset, (8   + offset), 3,   "X")
        createData(data, db[i],offset, (10  + offset), 3,   "X")
        createData(data, db[i],offset, (12  + offset), 2,   "WORD")
        createData(data, db[i],offset, (16  + offset), 5,   "INT")
        createData(data, db[i],offset, (26  + offset), 1,   "DINT")
        createData(data, db[i],offset, (36  + offset), 12,  "INT")
        createData(data, db[i],offset, (60  + offset), 10,  "B")
        createData(data, db[i],offset, (72  + offset), 3,   "INT")
        createData(data, db[i],offset, (78  + offset), 1,   "DINT")
        createData(data, db[i],offset, (82  + offset), 2,   "INT")
        createData(data, db[i],offset, (86  + offset), 1,   "CHAR")
        createData(data, db[i],offset, (88  + offset), 2,   "INT")
        createData(data, db[i],offset, (92  + offset), 7,   "X")
        createData(data, db[i],offset, (94  + offset), 40,  "CHAR")
        createData(data, db[i],offset, (134 + offset), 2,   "X")
        createData(data, db[i],offset, (136 + offset), 3,   "INT")
        createData(data, db[i],offset, (142 + offset), 2,   "X")
        createData(data, db[i],offset, (144 + offset), 1,   "INT")
        createData(data, db[i],offset, (146 + offset), 1,   "WORD")
        createData(data, db[i],offset, (148 + offset), 1,   "INT")
        createData(data, db[i],offset, (150 + offset), 8,   "X")
        createData(data, db[i],offset, (151 + offset), 4,   "B")
        createData(data, db[i],offset, (156 + offset), 3,   "WORD")
        createData(data, db[i],offset, (162 + offset), 2,   "DWORD")
        createData(data, db[i],offset, (170 + offset), 1,   "X")
        createData(data, db[i],offset, (172 + offset), 1,   "INT")
        createData(data, db[i],offset, (174 + offset), 4,   "X")
        createData(data, db[i],offset, (175 + offset), 1,   "CHAR")
        createData(data, db[i],offset, (176 + offset), 3,   "INT")
        createData(data, db[i],offset, (206 + offset), 3,   "INT")
        createData(data, db[i],offset, (212 + offset), 10,  "B")
        createData(data, db[i],offset, (224 + offset), 1,   "INT")
        createData(data, db[i],offset, (226 + offset), 2,   "X")
        createData(data, db[i],offset, (228 + offset), 1,   "INT")
        createData(data, db[i],offset, (230 + offset), 2,   "CHAR")
        createData(data, db[i],offset, (232 + offset), 1,   "X")
        createData(data, db[i],offset, (234 + offset), 4,   "CHAR")
        createData(data, db[i],offset, (238 + offset), 4,   "INT")
        createData(data, db[i],offset, (246 + offset), 1,   "X")
        createData(data, db[i],offset, (248 + offset), 1,   "X")
        //createData(data, db[i], (250 + offset), 200, "B")
   }

    //console.log('Data Struct Here DB421: ')
    //console.log(data)
    return data;
}

module.exports = createStruct();

