const Keys = require("./getDB171Keys");
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

    //Add one so the index starts at one in the table.
    let plcData = new dataRow(1);

    //iterate through the dataKeys array and create a sensible structure
    let barcode = [];
    let shipping_label = [];

    row.forEach((key, index) => {
      // change from boolean to string representation so the data table can read.
      if (data[key] === true) data[key] = "true";
      if (data[key] === false) data[key] = "false";
      if (index >= 57 && index <= 97) {
        // build a string from the char array
        plcData.barcode += data[key];
      }

      if (index >= 164 && index <= 363) {
        // build a string from the char array
        plcData.shipping_label += data[key];
      }
       // normal key
        plcData.data[Keys[index]] = data[key];
      //remove the white space
      plcData.barcode = plcData[i].barcode.trim();
      plcData.shipping_label = plcData[i].shipping_label.trim();
    });
    console.log(plcData)

  return plcData;
}

module.exports = process
