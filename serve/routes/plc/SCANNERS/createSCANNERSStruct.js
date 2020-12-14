function createStruct() {
  const db = "DB90,";
  const data = {};
  const structLen = 92;

  createData(20000, 2, "INT"); // Amount of scanners and read rate threshold

  for (let i = 0; i < 50; i++) {
    let offset = i * structLen;

    createData(20004 + offset, 2, "INT");
    createData(20008 + offset, 8, "CHAR");
    createData(20018 + offset, 9, "INT");
    createData(20036 + offset, 8, "X"); //Bitfield
    createData(20037 + offset, 8, "X"); //Bitfield
    createData(20038 + offset, 8, "X"); //Bitfield
    createData(20039 + offset, 8, "X"); //Bitfield
    createData(20040 + offset, 8, "X"); //Bitfield
    createData(20041 + offset, 8, "X"); //Bitfield
    createData(20042 + offset, 8, "X"); //Bitfield
    createData(20043 + offset, 8, "X"); //Bitfield
    createData(20044 + offset, 8, "X"); //Bitfield
    createData(20044 + offset, 8, "X"); //Bitfield
    createData(20045 + offset, 8, "X"); //Bitfield
    createData(20046 + offset, 8, "X"); //Bitfield
    createData(20047 + offset, 8, "X"); //Bitfield
    createData(20048 + offset, 8, "X"); //Bitfield
    createData(20049 + offset, 8, "X"); //Bitfield
    createData(20050 + offset, 8, "X"); //Bitfield
    createData(20051 + offset, 8, "X"); //Bitfield
    createData(20052 + offset, 1, "CHAR"); //Status of scanner
    createData(20054 + offset, 40, "CHAR"); //Barcode
    createData(20094 + offset, 6, "X"); //ST_STO_SC
  }

  // take four parameters(start, length, type, array)
  function createData(start, len, type, arr) {
    // b for byte
    let b;

    switch (type) {
      case "X":
        b = 0.1;
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
      default:
        break;
    }

    for (let i = 0; i < len; i++) {
      if (i !== 0 && !arr) start += b;
      // If a is true we are working with a byte array, break from loop , we will decode later
      if (arr) {
        data[start + ".0"] = db + type + start + "." + len.toString();
        break;
      }
      if (b === 0.1) {
        data[start.toFixed(1)] = db + type + start.toFixed(1);
      } else {
        data[start + ".0"] = db + type + start;
      }
    }
  }
  return data;
}

module.exports = createStruct();
