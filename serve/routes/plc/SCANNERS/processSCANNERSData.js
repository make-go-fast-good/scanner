const Keys = require("./getSCANNERSKeys");
class dataRow {
  constructor(_index = 0) {
    this.index = _index;
    this.barcode = "";
    this.scannerName = "";
    this.bitField = "";
    this.numberScanners = 0;
    this.readRateUntilFault = 0;
    this.data = {};
  }
}

const process = function processPlcData(data) {
  //if there's no data leave.
  if (!data) return;

  //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
  const dataKeys = Object.keys(data);

  let plcData = [];

  //lets construct our object
  for (let i = 0; i < 50; i++) {

    //Add one so the index starts at one in the table.
    plcData[i] = new dataRow(i + 1);

    //row is an array of the raw object keys from the callback function
    let row = dataKeys.filter(val => {
      //We want the keys to be between (4.0 - 14.0) - (i * 14)
      return parseFloat(val) <= (i * 92) + 20092 && parseFloat(val) >= 20004 + (i * 92);
    });


    row.forEach((key, index) => {

      if (data[key] === true) data[key] = "true";
      if (data[key] === false) data[key] = "false";

      if (index >= 2 && index <= 9) {
        plcData[i].scannerName += data[key];
      } else if (index >= 19 && index <= 138) {
        data[key] === "true" ? data[key] = 1 : data[key] = 0;
        // build a string from the char array
        plcData[i].bitField += data[key] + "";
      } else if (index >= 140 && index <= 169) {
        // build a string from the char array
        plcData[i].barcode += data[key];
      } else {
        // normal key
        plcData[i].data[Keys[index]] = data[key];
      }
    });
        //remove the white space
      plcData[i].barcode = plcData[i].barcode.trim();
      plcData[i].scannerName = plcData[i].scannerName.trim();
      plcData[i].bitField = plcData[i].bitField.trim();
  }
  return plcData;
}

module.exports = process
