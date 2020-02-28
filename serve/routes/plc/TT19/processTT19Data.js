const Keys = require("./getTT19Keys");
class dataRow {
  constructor(_index = 0) {
    this.index = _index;
    this.barcode = "";
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
  for (i = 0; i < 200; i++) {

    //Add one so the index starts at one in the table.
    plcData[i] = new dataRow(i + 1);

    //row is an array of the raw object keys from the callback function
    let row = dataKeys.filter(val => {

      //We want the keys to be between (6.0 - 186.0) - (i * 182)
      return parseFloat(val) <= i * 182 + 186 && parseFloat(val) >= 6 + i * 182;
    });

    //iterate through the dataKeys array and create a sensible structure
    let barcode = [];
    // milliseconds in a day
    let day = 86400000;
    // milliseconds between jan 1, 1970 & jan 1, 1990
    let elapsed = 631152000000;

    row.forEach((key, index) => {
      // change from boolean to string representation so the data table can read.
      if (data[key] === true) data[key] = "true";
      if (data[key] === false) data[key] = "false";

      if (index >= 32 && index <= 71) {
        // build a string from the char array
        plcData[i].barcode += data[key];
      }

      //Siemens Date data type return a hex value for number of days since Jan 1, 1990
      //Convert that value to milliseconds since Jan 1, 1990, then add ms between 1990 & 1970.
      //86,400,000 milliseconds in every day.
      //631,152,000,000 milliseconds between 1970 to 1990
      if (index === 1 || index === 3) {
        let byte_0 = data[key][0];
        let byte_1 = data[key][1];

        //combine the two bytes to create a word.
        let word = ((byte_0 & 0xff) << 8) | (byte_1 & 0xff);

        // (num of days since 1-1-1990 * 86400000) + 631,152,000,000
        let ms_date = word * day + elapsed;
        let date = new Date(ms_date);

        //cut off the time of day, we only care about the date here. 
        plcData[i].data[Keys[index]] = date.toJSON().slice(0, 10);
      } else if (index === 2 || index === 4) {
        //Siemens Time data type returns the number of milliseconds since the beginning of the day.
        let byte_0 = data[key][0];
        let byte_1 = data[key][1];
        let byte_2 = data[key][2];
        let byte_3 = data[key][3];

        //combine the two bytes to create a word.
        let word_0 = ((byte_0 & 0xff) << 8) | (byte_1 & 0xff);
        let word_1 = ((byte_2 & 0xff) << 8) | (byte_3 & 0xff);

        //combine words for double word
        let ms_time = ((word_0 & 0xffff) << 16) | (word_1 & 0xffff);
        let time = new Date(ms_time);

        //cut off that 1970 date, we only care about time of day.
        plcData[i].data[Keys[index]] = time.toJSON().slice(11, 19);
      } else {
        // normal key
        plcData[i].data[Keys[index]] = data[key];
      }
      //remove the white space
      plcData[i].barcode = plcData[i].barcode.trim();
    });
  }

  return plcData;
}

module.exports = process