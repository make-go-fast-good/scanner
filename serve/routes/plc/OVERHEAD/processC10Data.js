const Keys = require("./getC10Keys");
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

     //lets construct our object
    for (let i = 0; i < 2; i++) {

        plcData[i] = new dataRow(1);

        //row is an array of the raw object keys from the callback function
        let row = dataKeys.filter(val => {
          //We want the keys to be between (0 - 363)
          return parseFloat(val) <= i * 363 + 362 && parseFloat(val) >= i * 363;
        });

        //iterate through the dataKeys array and create a sensible structure

        row.forEach((key, index) => {
          // change from boolean to string representation so the data table can read.
          if (data[key] === true) data[key] = "true";
          if (data[key] === false) data[key] = "false";
          if (index >= 56 && index <= 95) {
            // build a string from the char array
            plcData[i].barcode += data[key];
          }

          if (index >= 163) {
            // convert bytes to char & build a string from the char array
            plcData[i].shipping_label += String.fromCharCode(data[key]);
          }
           // normal key
            plcData[i].data[Keys[index]] = data[key];
          //remove the white space
          plcData[i].barcode = plcData[i].barcode.trim();
          plcData[i].shipping_label = plcData[i].shipping_label.trim();
        });
    }

  return plcData;
}

module.exports = process
