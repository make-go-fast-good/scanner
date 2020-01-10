(function startData() {

    // take four parameters(start, length, type, first)
    function createData(s, l, t) {
        let b;
        switch (t) {
            case "M":
                b = .1;
                break;
            case "char":
            case "byte":
                b = 1;
                break;
            case "int":
            case "word":
                b = 2;
                break;
            case "dint":
                b = 4;
                break;
        }

        let bitarr = [];

        for (let i = 0; i < l; i++) {

            if (i !== 0) s += b;

            if (b === .1) {
                bitarr.push(db + t + s.toFixed(1));
            } else {
                obj[s] = (db + t + s)
            }

            if (i === l -l && bitarr.length > 0) {
                obj[s.toFixed(0)] = bitarr;
            }

            console.log(obj)
        }
    }


    const obj = {};
    const db = "DB1810,";

    createData(6, 1, "int")
    createData(20, 5, "M")
    createData(22, 8, "M")
    createData(23, 8, "M")
    createData(24, 5, "int")
    createData(36, 40, "char")
    createData(76, 1, "int")
    createData(78, 8, "M")
    createData(80, 1, "int")
    createData(82, 8, "M")
    createData(84, 8, "M")
    createData(85, 1, "M")
    createData(86, 6, "int")
    createData(98, 2, "dint")
    createData(106, 8, "M")
    createData(107, 3, "M")
    createData(108, 3, "int")
    createData(114, 1, "dint")
    createData(118, 6, "byte")
    createData(124, 8, "M")
    createData(125, 1, "char")
    createData(126, 8, "M")
    createData(127, 8, "M")
    createData(128, 8, "M")
    createData(129, 8, "M")
    createData(130, 21, "int")
    createData(172, 1, "word")
    createData(174, 7, "int")

    console.log(obj)

    return obj;
})();