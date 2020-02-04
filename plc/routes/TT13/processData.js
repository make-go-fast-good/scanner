function processedPlcData(data) {

    if (!data) {
        let data = {};
    }

    return new Promise((resolve, reject) => {

        //Since data is one big object we want to grab all the keys to use array functions (36400 keys)
        const dataKeys = Object.keys(data);

        let plcData = {};

        for (i = 0; i < 200; i++) {
            //lets construct our object
            plcData[i] = new dataRow(i);
            //row is an array of the raw object keys from the callback function
            let row = dataKeys.filter(val => {
                //We want the keys to be between (6.0 - 186.0) - (i * 182)
                return (parseFloat(val) <= ((i * 182) + 186)) && (parseFloat(val) >= (6 + (i * 182)))
            })
            //iterate through the dataKeys array and create a sensible structure
            let barcode = [];
            row.forEach((key, index) => {
                if (index >= 32 && index <= 71) {
                    //console.log(data[key]);
                    plcData[i].barcode += data[key];
                    //barcode.join(data[key]);
                }
                //TODO: converty S7 Date data type to js dates. 
                if (index === (1 || 3)) {
                    //console.log("We need date here:");
                    //console.log(data[key]);
                    plcData[i].data[Keys[index]] = data[key];
                } else if (index === (2 || 4)) {
                    //console.log("We need time here:");
                    //console.log(data[key]);
                    plcData[i].data[Keys[index]] = data[key];
                }

                /* 
                 else if (index >= 32 && index <= 72) {
                     console.log(data[key]);
                     //barcode.join(data[key]);
                 } 
                */
                else {
                    plcData[i].data[Keys[index]] = data[key];
                }

                plcData[i].barcode = plcData[i].barcode.trim();
            })
            console.log(barcode);
        }

        resolve(plcData)
    })
}

module.exports = processedPlcData()