const Keys = require("./getTT19Keys");
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

  //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
  const dataKeys = Object.keys(data);

  let plcData = [];

  //lets construct our object
  for (i = 0; i < 4; i++) {

    //Add one so the index starts at one in the table.
    plcData[i] = new dataRow(i + 1);

    //row is an array of the raw object keys from the callback function
    let row = dataKeys.filter(val => {
      //We want the keys to be between (6.0 - 186.0) - (i * 182)
      return parseFloat(val) <= i * 204 + 203 && parseFloat(val) >= i * 204;
    });
    console.log('heres your row')
    console.log(row)

    //iterate through the dataKeys array and create a sensible structure
    let barcode = [];
    let shipping_label = [];

    row.forEach((key, index) => {
      // change from boolean to string representation so the data table can read.
      if (data[key] === true) data[key] = "true";
      if (data[key] === false) data[key] = "false";
      if (index >= 24 && index <= 43) {
        // build a string from the char array
        plcData[i].barcode += data[key];
      }

      if (index >= 44 && index <=213) {
        // build a string from the char array
        plcData[i].shipping_label += data[key];
      }
       // normal key
        plcData[i].data[Keys[index]] = data[key];
      //remove the white space
      plcData[i].barcode = plcData[i].barcode.trim();
      plcData[i].shipping_label = plcData[i].shipping_label.trim();
    });
    console.log(plcData)
  }

  return plcData;
}

module.exports = process
