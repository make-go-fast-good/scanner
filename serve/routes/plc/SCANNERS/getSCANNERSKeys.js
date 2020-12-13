// use this to rename the integer keys intially read from the plc to match what is actually in the plc
const SCANNERKEYS = [
  "fpnr",
  "scanner",
  "sc_name[1]",
  "sc_name[2]",
  "sc_name[3]",
  "sc_name[4]",
  "sc_name[5]",
  "sc_name[6]",
  "sc_name[7]",
  "sc_name[8]",
  "anz_read",
  "anz_noread",
  "leserate",
  "max_noscan",
  "anz_noscan_ff",
  "max_noread",
  "anz_noread_ff",
  "anz_lesungen",
  "leserate_100",
  "bitfield[1]",
  "bitfield[2]",
  "bitfield[3]",
  "bitfield[4]",
  "bitfield[5]",
  "bitfield[6]",
  "bitfield[7]",
  "bitfield[8]",
  "bitfield[9]",
  "bitfield[10]",
  "bitfield[11]",
  "bitfield[12]",
  "bitfield[13]",
  "bitfield[14]",
  "bitfield[15]",
  "bitfield[16]",
  "bitfield[17]",
  "bitfield[18]",
  "bitfield[19]",
  "bitfield[20]",
  "bitfield[21]",
  "bitfield[22]",
  "bitfield[23]",
  "bitfield[24]",
  "bitfield[25]",
  "bitfield[26]",
  "bitfield[27]",
  "bitfield[28]",
  "bitfield[29]",
  "bitfield[30]",
  "bitfield[31]",
  "bitfield[32]",
  "bitfield[33]",
  "bitfield[34]",
  "bitfield[35]",
  "bitfield[36]",
  "bitfield[37]",
  "bitfield[38]",
  "bitfield[39]",
  "bitfield[40]",
  "bitfield[41]",
  "bitfield[42]",
  "bitfield[43]",
  "bitfield[44]",
  "bitfield[45]",
  "bitfield[46]",
  "bitfield[47]",
  "bitfield[48]",
  "bitfield[49]",
  "bitfield[50]",
  "bitfield[51]",
  "bitfield[52]",
  "bitfield[53]",
  "bitfield[54]",
  "bitfield[55]",
  "bitfield[56]",
  "bitfield[57]",
  "bitfield[58]",
  "bitfield[59]",
  "bitfield[60]",
  "bitfield[61]",
  "bitfield[62]",
  "bitfield[63]",
  "bitfield[64]",
  "bitfield[65]",
  "bitfield[66]",
  "bitfield[67]",
  "bitfield[68]",
  "bitfield[69]",
  "bitfield[70]",
  "bitfield[71]",
  "bitfield[72]",
  "bitfield[73]",
  "bitfield[74]",
  "bitfield[75]",
  "bitfield[76]",
  "bitfield[77]",
  "bitfield[78]",
  "bitfield[79]",
  "bitfield[80]",
  "bitfield[81]",
  "bitfield[82]",
  "bitfield[83]",
  "bitfield[84]",
  "bitfield[85]",
  "bitfield[86]",
  "bitfield[87]",
  "bitfield[88]",
  "bitfield[89]",
  "bitfield[90]",
  "bitfield[91]",
  "bitfield[92]",
  "bitfield[93]",
  "bitfield[94]",
  "bitfield[95]",
  "bitfield[96]",
  "bitfield[97]",
  "bitfield[98]",
  "bitfield[99]",
  "bitfield[100]",
  "bitfield[101]",
  "bitfield[102]",
  "bitfield[103]",
  "bitfield[104]",
  "bitfield[105]",
  "bitfield[106]",
  "bitfield[107]",
  "bitfield[108]",
  "bitfield[109]",
  "bitfield[110]",
  "bitfield[111]",
  "bitfield[112]",
  "bitfield[113]",
  "bitfield[114]",
  "bitfield[115]",
  "bitfield[116]",
  "bitfield[117]",
  "bitfield[118]",
  "bitfield[119]",
  "bitfield[120]",
  "bitfield[121]",
  "bitfield[122]",
  "bitfield[123]",
  "bitfield[124]",
  "bitfield[125]",
  "bitfield[126]",
  "bitfield[127]",
  "bitfield[128]",
  "status",
  "barcode[0]",
  "barcode[1]",
  "barcode[2]",
  "barcode[3]",
  "barcode[4]",
  "barcode[5]",
  "barcode[6]",
  "barcode[7]",
  "barcode[8]",
  "barcode[9]",
  "barcode[10]",
  "barcode[11]",
  "barcode[12]",
  "barcode[13]",
  "barcode[14]",
  "barcode[15]",
  "barcode[16]",
  "barcode[17]",
  "barcode[18]",
  "barcode[19]",
  "barcode[20]",
  "barcode[21]",
  "barcode[22]",
  "barcode[23]",
  "barcode[24]",
  "barcode[25]",
  "barcode[26]",
  "barcode[27]",
  "barcode[28]",
  "barcode[29]",
  "barcode[30]",
  "barcode[31]",
  "barcode[32]",
  "barcode[33]",
  "barcode[34]",
  "barcode[35]",
  "barcode[36]",
  "barcode[37]",
  "barcode[38]",
  "barcode[39]",
  "barcode[40]",
  "sasto",
  "max_noscan",
  "max_noread",
  "timeout",
  "leserate_100",
  "no_leserate_100",
];

module.exports = SCANNERKEYS;
