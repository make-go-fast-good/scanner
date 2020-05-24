const Keys = require("./getDB421Keys");
class dataRow {
  constructor(_index = 0) {
    this.index = _index;
    this.barcode = "";
    this.shipping_label = "";
    this.data = {};
  }
}

const process = function processPlcData(data) {
  //if there's no data leave.
  if (!data) return;

  //data is one big object we want to grab all the keys to use array functions
  const dataKeys = Object.keys(data);

    let plcData = [];

    plcData[0] = new dataRow(1);

    //iterate through the dataKeys array and create a sensible structure

    dataKeys.forEach((key, index) => {
      // change from boolean to string representation so the data table can read.
      if (data[key] === true) data[key] = "true";
      if (data[key] === false) data[key] = "false";
      if (index >= 56 && index <= 95) {
        // build a string from the char array
        plcData[0].barcode += data[key];
      }

      if (index >= 163) {
        // convert bytes to char & build a string from the char array
        plcData[0].shipping_label += String.fromCharCode(data[key]);
      }
       // normal key
        plcData[0].data[Keys[index]] = data[key];
      //remove the white space
      plcData[0].barcode = plcData[0].barcode.trim();
      plcData[0].shipping_label = plcData[0].shipping_label.trim();
    });

  return plcData;
}

module.exports = process
