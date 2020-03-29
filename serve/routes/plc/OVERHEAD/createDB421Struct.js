const createData() = require("./createData.js")

function createStruct() {
    const db = "DB421,";
    const data = {};
    const structLen = 209

    for (let i = 0; i < 1; i++) {

        let offset = i * structLen

        createData((0   + offset), 4,  "INT")
        createData((8   + offset), 4,  "X")
        createData((10  + offset), 3,  "X")
        createData((12  + offset), 7,  "INT")
        createData((26  + offset), 1,  "DINT")
        createData((36  + offset), 8,  "INT")
        createData((52  + offset), 1,  "DINT")
        createData((56  + offset), 2,  "INT")
        createData((60  + offset), 1,  "CHAR")
        createData((62  + offset), 3,  "INT")
        createData((68  + offset), 7,  "X")
        createData((70  + offset), 8,  "X")
        createData((71  + offset), 8,  "X")
        createData((72  + offset), 8,  "X")
        createData((73  + offset), 8,  "X")
        createData((74  + offset), 40, "CHAR")
        createData((114 + offset), 1,  "X")
        createData((116 + offset), 1,  "INT")
        createData((118 + offset), 4,  "X")
        createData((119 + offset), 1,  "CHAR")
        createData((120 + offset), 3,  "INT")
        createData((150 + offset), 3,  "INT")
        createData((156 + offset), 10, "B")
        createData((168 + offset), 1,  "INT")
        createData((170 + offset), 2,  "X")
        createData((172 + offset), 1,  "INT")
        createData((174 + offset), 2,  "CHAR")
        createData((176 + offset), 1,  "X")
        createData((178 + offset), 4,  "CHAR")
        createData((182 + offset), 4,  "INT")
        createData((190 + offset), 1,  "X")
        createData((192 + offset), 1,  "X")
        createData((194 + offset), 32, "B")
        createData((226 + offset), 2,  "X")
        createData((228 + offset), 3,  "INT")
        createData((234 + offset), 16, "B")
        createData((250 + offset), 3,  "INT")
   }

    return data;
}

module.exports = createStruct();
