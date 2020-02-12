import React, { Component } from "react";
import MaterialTable from "material-table";
import DefaultTable from "./DefaultTable";
export class TT13Table extends Component {
  state = {};

  render() {
    if (this.props.loading === true) {
      return <DefaultTable loading={this.props.loading} css={this.props.css} />;
    } else if (this.props.data === undefined) {
      return <DefaultTable />;
    } else {
      return (
        <MaterialTable
          style={{ marginTop: "15px" }}
          key={this.props.key}
          title={this.props.area}
          columns={[
            { title: "Index", field: "index" },
            { title: "Type", field: "data.tele_typ" },
            { title: "Date_start", field: "data.datum_start" },
            { title: "Time_start", field: "data.uhr_start" },
            { title: "Date_last", field: "data.datum" },
            { title: "Time_last", field: "data.uhr" },

            { title: "FP", field: "data.ta_data_ident_fpnr" },
            { title: "Scanner", field: "data.ta_data_ident_scanner" },
            { title: "Barcode", field: "barcode" },
            { title: "Order", field: "data.ta_data_order" },

            { title: "Origin", field: "data.ta_data_herkunft" },
            { title: "Location", field: "data.ta_data_standort" },
            { title: "Destination", field: "data.ta_data_ziel" },
            { title: "Forced Dest", field: "data.ta_data_zwangsziel" },

            { title: "Overflow", field: "data.ta_data_order_ext_ueberlauf" },
            {
              title: "No Weight",
              field: "data.ta_data_order_ext_kein_gewicht"
            },
            {
              title: "No Contour",
              field: "data.ta_data_order_ext_kein_kontur"
            },
            { title: "Special 1", field: "data.ta_data_order_ext_sonder_1" },
            { title: "Special 2", field: "data.ta_data_order_ext_sonder_2" },
            { title: "Special 3", field: "data.ta_data_order_ext_sonder_3" },
            { title: "TA for SC", field: "data.ta_data_order_ext_ta_for_sc" },
            { title: "Dont Delete", field: "data.ta_data_order_ext_kein_del" },
            { title: "Ack", field: "data.ta_data_ack" },

            { title: "Busy", field: "data.ta_data_status_belegt" },
            { title: "Order Rec", field: "data.ta_data_status_order_empf" },
            { title: "Blocked", field: "data.ta_data_status_gesperrt" },
            { title: "Released", field: "data.ta_data_status_freigabe" },
            { title: "Dest OK", field: "data.ta_data_status_ziel_ok" },
            { title: "TDB Known", field: "data.ta_data_status_tdb_bekannt" },
            { title: "RES 06", field: "data.ta_data_status_res_0_6" },
            { title: "No data", field: "data.ta_data_status_ndr" },
            { title: "No scan", field: "data.ta_data_status_noscan" },
            { title: "No read", field: "data.ta_data_status_noread" },
            { title: "Barcode", field: "data.ta_data_status_barcode" },
            { title: "Bc_Length", field: "data.ta_data_status_bc_lang" },
            { title: "RES_14", field: "data.ta_data_status_res_1_4" },
            { title: "RES_15", field: "data.ta_data_status_res_1_5" },
            { title: "Complete", field: "data.ta_data_status_data_komplett" },
            { title: "Zombie", field: "data.ta_data_status_ta_zombie" }
          ]}
          data={this.props.data}
          options={this.props.options}
        />
      );
    }
  }
}

export default TT13Table;
