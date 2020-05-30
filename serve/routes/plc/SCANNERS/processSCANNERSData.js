const Keys = require("./getSCANNERSKeys");
class dataRow {
    constructor(_index = 0) {
        this.index = _index;
        this.barcode = "";
        this.scannerName = "";
        this.bitField = "";
        this.reversedBitField = "";
        this.numberScanners = 0;
        this.readRateUntilFault = 0;
        this.data = {};
    }
}

const process = function processPlcData(data, _num) {
    //if there's no data leave.
    if (!data) return;

    //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
    const dataKeys = Object.keys(data);

    let plcData = [];

    //lets construct our object we pass the amount of scanners in as _num and we add 5 to give room for filter later. Some of the scanners are just empty.
    for (let i = 0; i < parseInt(_num) + 5; i++) {
        //Add one so the index starts at one in the table.
        plcData[i] = new dataRow(i + 1);

        //row is an array of the raw object keys from the callback function
        let row = dataKeys.filter(val => {
            //We want the keys to be between (20004.0 - 20096.0) - (i * 92)
            return (
                parseFloat(val) >= 20004 + i * 92 &&
                parseFloat(val) <= i * 92 + 20092
            );
        });

        row.forEach((key, index) => {
            if (data[key] === true) data[key] = "true";
            if (data[key] === false) data[key] = "false";

            if (index >= 2 && index <= 9) {
                plcData[i].scannerName += data[key];
            } else if (index >= 19 && index <= 146) {
                data[key] === "true" ? (data[key] = 1) : (data[key] = 0);
                // build a string from the char array
                plcData[i].bitField += data[key] + "";
            } else if (index >= 148 && index <= 188) {
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

        //bitField string is 128 chars long
        //every byte needs to be reversed
        //split the string into 16 8 char long strings

        let reverseString = str => {
            return str === ""
                ? ""
                : reverseString(str.substr(1)) + str.charAt(0);
        };

        let tmpBitField = plcData[i].bitField.trim();
        let tmpString = "";
        let start, end;

        for (let j = 0; j < 16; j++) {
            start = j * 8;
            end = start + 8;
            tmpString = tmpBitField.slice(start, end);
            plcData[i].reversedBitField += reverseString(tmpString);
            start += 8;
        }

        // Now that every byte is reversed the whole string needs to be reversed in order to read the most recent from left to right
        tmpString = reverseString(plcData[i].reversedBitField);
        plcData[i].bitField = tmpString;

        tmpString = "";

        // Rearranging Dwords order to read correctly on table
        // 4 => 1
        // 3 => 2
        // 2 => 3
        // 1 => 4

        for (let j = 3; j >= 0; j--) {
            start = j * 32;
            end = start + 32;
            tmpString += plcData[i].bitField.slice(start, end);
        }
        plcData[i].bitField = tmpString;

        // Number of scanners
        plcData[i].numberScanners = data["20000.0"];
        //read rate until fault threshold
        plcData[i].readRateUntilFault = data["20002.0"];
        if (plcData[i].data["anz_read"] < 0) plcData[i].data["anz_read"] += 65535
        if (plcData[i].data["anz_noread"] < 0) plcData[i].data["anz_noread"] += 65535
    }
    return plcData;
};

module.exports = process;
