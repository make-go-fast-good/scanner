//for i in range(1): print("\'var[%d]\'," % i)
// Use this to rename the integer keys intially read from the PLC to match what is actually in the PLC
const DB421KEYS = [
    'V_FPNR',
    'V_SCANNER',
    'VISU_SCANNER',
    'LADDR',
    'E_STO_SC',
    'E_ZAEH_RESET',
    'E_EIN_NO_VISU',
    'A_STO_SC',
    'A_GOODREAD',
    'A_NOREAD',
    'RECV_STAT',
    'ERROR_RECV',
    'ERROR_EXT_R',
    'ERROR_TELE',
    'ERROR_EXT_T',
    'ERROR_DH',
    'ERROR_EXT_DH',
    'ANZ_TELEGR',
    'puff_db',
    'puff_dbb',
    'puff_len',
    'len_fp',
    'len_scanner',
    'len_platz',
    'len_visu_scanner',
    'len_ta_data',
    'len_tele',
    'len_bc',
    'anz_startz',
    'anz_endez',
    'startzeichen[1]',
    'startzeichen[2]',
    'startzeichen[3]',
    'startzeichen[4]',
    'startzeichen[5]',
    'endezeichen[1]',
    'endezeichen[2]',
    'endezeichen[3]',
    'endezeichen[4]',
    'endezeichen[5]',
    'sick_timeout',
    'sc_stg_fpnr',
    'sc_stg_scanner',
    'sc_stg_zeitstempel',
    'fpnr',
    'scanner',
    'status',
    'err_info',
    'tele_typ',
    'x_noread',
    'x_bc_lang',
    'x_recv_ndr',
    'x_recv_440_ndr',
    'x_recv_error',
    'x_anz_goodread',
    'x_anz_noread',
    'letzte_lesung[1]',
    'letzte_lesung[2]',
    'letzte_lesung[3]',
    'letzte_lesung[4]',
    'letzte_lesung[5]',
    'letzte_lesung[6]',
    'letzte_lesung[7]',
    'letzte_lesung[8]',
    'letzte_lesung[9]',
    'letzte_lesung[10]',
    'letzte_lesung[11]',
    'letzte_lesung[12]',
    'letzte_lesung[13]',
    'letzte_lesung[14]',
    'letzte_lesung[15]',
    'letzte_lesung[16]',
    'letzte_lesung[17]',
    'letzte_lesung[18]',
    'letzte_lesung[19]',
    'letzte_lesung[20]',
    'letzte_lesung[21]',
    'letzte_lesung[22]',
    'letzte_lesung[23]',
    'letzte_lesung[24]',
    'letzte_lesung[25]',
    'letzte_lesung[26]',
    'letzte_lesung[27]',
    'letzte_lesung[28]',
    'letzte_lesung[29]',
    'letzte_lesung[30]',
    'letzte_lesung[31]',
    'letzte_lesung[32]',
    'letzte_lesung[33]',
    'letzte_lesung[34]',
    'letzte_lesung[35]',
    'letzte_lesung[36]',
    'letzte_lesung[37]',
    'letzte_lesung[38]',
    'letzte_lesung[39]',
    'letzte_lesung[40]',
    'I_RECV_440_EN_R',
    'I_RECV_440_R',
    'I_RECV_440_LADDR',
    'I_RECV_440_DB_NO',
    'I_RECV_440_DBB_NO',
    'I_RECV_440_NDR',
    'I_RECV_440_ERROR',
    'I_RECV_440_LEN',
    'I_RECV_440_STATUS',
    'I_RECV_440_SFCERR',
    'I_RECV_440_b_KOM_FEHLER',
    'I_RECV_440_b_FP_R',
    'I_RECV_440_b_IMP_R',
    'I_RECV_440_b_FN_ENR',
    'I_RECV_440_b_IMP_ENR',
    'I_RECV_440_b_TG_P_HAVE_DATA',
    'I_RECV_440_b_TG_P_QUIT',
    'I_RECV_440_b_BLOCKUNG',
    'I_RECV_440_y_BEARB_STATUS',
    'I_RECV_440_y_CP_STATUS',
    'I_RECV_440_y_CP_CONTROL',
    'I_RECV_440_y_CP_RECNUM',
    'I_RECV_440_w_BLOCK_LEN',
    'I_RECV_440_w_REST_LEN',
    'I_RECV_440_w_ANZW',
    'I_RECV_440_d_DST_PTR',
    'I_RECV_440_d_BASE_BG',
    'I_SIM_SC_E_PN',
    'I_SIM_SC_VISU_SCANNER',
    'I_SIM_SC_A_RECV_440_NDR',
    'I_SIM_SC_A_TELE_STAT',
    'I_SIM_SC_A_BC_LANG',
    'I_SIM_SC_A_NOREAD',
    'I_SIM_SC_STATUS',
    'I_SIM_SC_LEN_TELE',
    'I_SIM_SC_ERROR_CODE',
    'I_SIM_SC_ERROR_EXT',
    'I_SIM_SC_SC_STG',
    'I_SIM_SC_SC_PN',
    'I_SIM_SC_PUFFER',
    'I_SIM_SC_LETZTE_LESUNG',
    'I_SIM_SC_len_visu_scanner',
    'I_SIM_SC_anz_startz',
    'I_SIM_SC_anz_endez',
    'I_SIM_SC_startzeichen[1]',
    'I_SIM_SC_startzeichen[2]',
    'I_SIM_SC_startzeichen[3]',
    'I_SIM_SC_startzeichen[4]',
    'I_SIM_SC_startzeichen[5]',
    'I_SIM_SC_endezeichen[1]',
    'I_SIM_SC_endezeichen[2]',
    'I_SIM_SC_endezeichen[3]',
    'I_SIM_SC_endezeichen[4]',
    'I_SIM_SC_endezeichen[5]',
    'I_SIM_SC_bc_len',
    'I_SIM_SC_sick_scanner',
    'I_SIM_SC_leuze_scanner',
    'I_SIM_SC_sick_timeout',
    'I_SIM_SC_sick_trennzeichen',
    'I_SIM_SC_sick_separator',
    'I_SIM_SC_sick_block',
    'I_SIM_SC_leuze_start_zeichen',
    'I_SIM_SC_leuze_warn_zeichen',
    'I_SIM_SC_leuze_fehler_zeichen',
    'I_SIM_SC_leuze_separator',
    'I_SIM_SC_data_length',
    'I_SIM_SC_start_sc',
    'I_SIM_SC_end_sc',
    'I_SIM_SC_can_adr',
    'I_SIM_SC_x_init',
    'init',
    'puffer[1]',
    'puffer[2]',
    'puffer[3]',
    'puffer[4]',
    'puffer[5]',
    'puffer[6]',
    'puffer[7]',
    'puffer[8]',
    'puffer[9]',
    'puffer[10]',
    'puffer[11]',
    'puffer[12]',
    'puffer[13]',
    'puffer[14]',
    'puffer[15]',
    'puffer[16]',
    'puffer[17]',
    'puffer[18]',
    'puffer[19]',
    'puffer[20]',
    'puffer[21]',
    'puffer[22]',
    'puffer[23]',
    'puffer[24]',
    'puffer[25]',
    'puffer[26]',
    'puffer[27]',
    'puffer[28]',
    'puffer[29]',
    'puffer[30]',
    'puffer[31]',
    'puffer[32]',
    'puffer[33]',
    'puffer[34]',
    'puffer[35]',
    'puffer[36]',
    'puffer[37]',
    'puffer[38]',
    'puffer[39]',
    'puffer[40]',
    'puffer[41]',
    'puffer[42]',
    'puffer[43]',
    'puffer[44]',
    'puffer[45]',
    'puffer[46]',
    'puffer[47]',
    'puffer[48]',
    'puffer[49]',
    'puffer[50]',
    'puffer[51]',
    'puffer[52]',
    'puffer[53]',
    'puffer[54]',
    'puffer[55]',
    'puffer[56]',
    'puffer[57]',
    'puffer[58]',
    'puffer[59]',
    'puffer[60]',
    'puffer[61]',
    'puffer[62]',
    'puffer[63]',
    'puffer[64]',
    'puffer[65]',
    'puffer[66]',
    'puffer[67]',
    'puffer[68]',
    'puffer[69]',
    'puffer[70]',
    'puffer[71]',
    'puffer[72]',
    'puffer[73]',
    'puffer[74]',
    'puffer[75]',
    'puffer[76]',
    'puffer[77]',
    'puffer[78]',
    'puffer[79]',
    'puffer[80]',
    'puffer[81]',
    'puffer[82]',
    'puffer[83]',
    'puffer[84]',
    'puffer[85]',
    'puffer[86]',
    'puffer[87]',
    'puffer[88]',
    'puffer[89]',
    'puffer[90]',
    'puffer[91]',
    'puffer[92]',
    'puffer[93]',
    'puffer[94]',
    'puffer[95]',
    'puffer[96]',
    'puffer[97]',
    'puffer[98]',
    'puffer[99]',
    'puffer[100]',
    'puffer[101]',
    'puffer[102]',
    'puffer[103]',
    'puffer[104]',
    'puffer[105]',
    'puffer[106]',
    'puffer[107]',
    'puffer[108]',
    'puffer[109]',
    'puffer[110]',
    'puffer[111]',
    'puffer[112]',
    'puffer[113]',
    'puffer[114]',
    'puffer[115]',
    'puffer[116]',
    'puffer[117]',
    'puffer[118]',
    'puffer[119]',
    'puffer[120]',
    'puffer[121]',
    'puffer[122]',
    'puffer[123]',
    'puffer[124]',
    'puffer[125]',
    'puffer[126]',
    'puffer[127]',
    'puffer[128]',
    'puffer[129]',
    'puffer[130]',
    'puffer[131]',
    'puffer[132]',
    'puffer[133]',
    'puffer[134]',
    'puffer[135]',
    'puffer[136]',
    'puffer[137]',
    'puffer[138]',
    'puffer[139]',
    'puffer[140]',
    'puffer[141]',
    'puffer[142]',
    'puffer[143]',
    'puffer[144]',
    'puffer[145]',
    'puffer[146]',
    'puffer[147]',
    'puffer[148]',
    'puffer[149]',
    'puffer[150]',
    'puffer[151]',
    'puffer[152]',
    'puffer[153]',
    'puffer[154]',
    'puffer[155]',
    'puffer[156]',
    'puffer[157]',
    'puffer[158]',
    'puffer[159]',
    'puffer[160]',
    'puffer[161]',
    'puffer[162]',
    'puffer[163]',
    'puffer[164]',
    'puffer[165]',
    'puffer[166]',
    'puffer[167]',
    'puffer[168]',
    'puffer[169]',
    'puffer[170]',
    'puffer[171]',
    'puffer[172]',
    'puffer[173]',
    'puffer[174]',
    'puffer[175]',
    'puffer[176]',
    'puffer[177]',
    'puffer[178]',
    'puffer[179]',
    'puffer[180]',
    'puffer[181]',
    'puffer[182]',
    'puffer[183]',
    'puffer[184]',
    'puffer[185]',
    'puffer[186]',
    'puffer[187]',
    'puffer[188]',
    'puffer[189]',
    'puffer[190]',
    'puffer[191]',
    'puffer[192]',
    'puffer[193]',
    'puffer[194]',
    'puffer[195]',
    'puffer[196]',
    'puffer[197]',
    'puffer[198]',
    'puffer[199]',
    'puffer[200]'
]

module.exports = DB421KEYS;
