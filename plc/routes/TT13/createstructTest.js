class TT13Row {
    constructor(_row = 0, _db = "DB1810,", _structLen = 182) {
        this.row = _row;
        this.db = _db;
        this.structLen = _structLen;
        this.data = {};
        this.createRow();
    }

    createRow() {
        let offset = this.row * this.structLen;

        this.createData((6 + offset), 1, "INT")
        this.createData((8 + offset), 2, "B", true) //Date
        this.createData((10 + offset), 4, "B", true) //Time of day
        this.createData((14 + offset), 2, "B", true) //Date
        this.createData((16 + offset), 4, "B", true) //Time of day 
        this.createData((20 + offset), 5, "X")
        this.createData((22 + offset), 8, "X")
        this.createData((23 + offset), 8, "X")
        this.createData((24 + offset), 5, "INT")
        this.createData((36 + offset), 40, "CHAR")
        this.createData((76 + offset), 1, "INT")
        this.createData((78 + offset), 8, "X")
        this.createData((80 + offset), 1, "INT")
        this.createData((82 + offset), 8, "X")
        this.createData((84 + offset), 8, "X")
        this.createData((85 + offset), 1, "X")
        this.createData((86 + offset), 6, "INT")
        this.createData((98 + offset), 2, "DINT")
        this.createData((106 + offset), 8, "X")
        this.createData((107 + offset), 3, "X")
        this.createData((108 + offset), 3, "INT")
        this.createData((114 + offset), 1, "DINT")
        this.createData((118 + offset), 6, "B")
        this.createData((124 + offset), 8, "X")
        this.createData((125 + offset), 1, "CHAR")
        this.createData((126 + offset), 8, "X")
        this.createData((127 + offset), 8, "X")
        this.createData((128 + offset), 8, "X")
        this.createData((129 + offset), 8, "X")
        this.createData((130 + offset), 21, "INT")
        this.createData((172 + offset), 1, "WORD")
        this.createData((174 + offset), 7, "INT")

    }

    createData(s, l, t, a) {
        // b for byte
        let b;
        switch (t) {
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

        for (let i = 0; i < l; i++) {
            if (i !== 0 && !a) s += b;
            // If a is true we are working with a byte array, break from loop , we will decode later 
            if (a) {
                this.data[s + ".0"] = (this.db + t + s + "." + l.toString())
                break;
            }
            if (b === .1) {
                this.data[s.toFixed(1)] = (this.db + t + s.toFixed(1));
            } else {
                this.data[s + ".0"] = (this.db + t + s)
            }
        }
    }
}

let testRow = new TT13Row();

console.log(testRow);

module.exports = testRow;