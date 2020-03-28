const createData = require("./createData.js")

function createStruct() {
    const db = "DB171,";
    const data = {};
    const structLen = 363

    for (let i = 0; i < 1; i++) {

        let offset = i * structLen

        createData((0   + offset), 4,   "INT")
        createData((8   + offset), 3,   "X")
        createData((10  + offset), 3,   "X")
        createData((12  + offset), 2,   "WORD")
        createData((16  + offset), 6,   "INT")
        createData((26  + offset), 1,   "DINT")
        createData((36  + offset), 12,  "INT")
        createData((60  + offset), 10,  "B")
        createData((72  + offset), 3,   "INT")
        createData((78  + offset), 1,   "DINT")
        createData((82  + offset), 2,   "INT")
        createData((86  + offset), 1,   "CHAR")
        createData((88  + offset), 2,   "INT")
        createData((92  + offset), 7,   "X")
        createData((94  + offset), 40,  "CHAR")
        createData((134 + offset), 2,   "X")
        createData((136 + offset), 3,   "INT")
        createData((142 + offset), 2,   "X")
        createData((144 + offset), 1,   "INT")
        createData((146 + offset), 1,   "WORD")
        createData((148 + offset), 1,   "INT")
        createData((150 + offset), 8,   "X")
        createData((151 + offset), 4,   "B")
        createData((156 + offset), 3,   "WORD")
        createData((156 + offset), 2,   "DWORD")
        createData((170 + offset), 1,   "X")
        createData((172 + offset), 1,   "INT")
        createData((174 + offset), 4,   "X")
        createData((175 + offset), 1,   "CHAR")
        createData((176 + offset), 3,   "INT")
        createData((206 + offset), 3,   "INT")
        createData((212 + offset), 10,  "B")
        createData((224 + offset), 1,   "INT")
        createData((226 + offset), 2,   "X")
        createData((228 + offset), 1,   "INT")
        createData((230 + offset), 2,   "CHAR")
        createData((232 + offset), 1,   "X")
        createData((234 + offset), 4,   "CHAR")
        createData((238 + offset), 4,   "INT")
        createData((246 + offset), 1,   "X")
        createData((248 + offset), 1,   "X")
        createData((250 + offset), 200, "B")
   }

    return data;
}

module.exports = createStruct();
