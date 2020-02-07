import React, { Component } from "react";
import MaterialTable from "material-table";
import DefaultTable from "./DefaultTable";
export class TT13Table extends Component {
  state = {
  };

  render() {
    console.log('In Table.js here are my props')
    console.log(this.props)

    if (this.props.loading === true){
      return (null);
    }
    else if (this.props.data === undefined) {
      console.log("no table");
      return (<DefaultTable />)
    } else {
      console.log("should be a table");
      console.log(this.props.data);
      return  (
        <MaterialTable
          key={this.props.key}
          title={this.props.area + " TT13 Send"}
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
            { title: "No Weight", field: "data.ta_data_order_ext_kein_gewicht" },
            { title: "No Contour", field: "data.ta_data_order_ext_kein_kontur" },
            { title: "Special 1", field: "data.ta_data_order_ext_sonder_1" },
            { title: "Special 2", field: "data.ta_data_order_ext_sonder_2" },
            { title: "Special 3", field: "data.ta_data_order_ext_sonder_3" },
            { title: "TA for SC", field: "data.ta_data_order_ext_ta_for_sc" },
            { title: "Dont Delete", field: "data.ta_data_order_ext_kein_del" },
            { title: "Ack", field: "data.ta_data_ack" },

            { title: "Busy", field: "busy" },
            { title: "Order Rec", field: "order_rec" },
            { title: "Blocked", field: "blocked" },
            { title: "Released", field: "released" },
            { title: "Dest OK", field: "dest_ok" },
            { title: "TDB Known", field: "tdb_known" },
            { title: "RES 06", field: "res_06" },
            { title: "Ndr", field: "ndr" },
            { title: "No scan", field: "no_scan" },
            { title: "No read", field: "no_read" },
            { title: "Barcode", field: "barcode" },
            { title: "Bc_Length", field: "bc_length" },
            { title: "RES_14", field: "res_14" },
            { title: "RES_15", field: "res_15" },
            { title: "Complete", field: "complete" },
            { title: "Zombie", field: "zombie" }
          ]}
          data={this.props.data}
          options={this.props.options}
          /*
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh Data",
              isFreeAction: true,
              onClick: () =>
                this.tableRef.current && this.tableRef.current.onQueryChange()
            }
          ]}
          */
        />
      );
    }
  }
}

export default TT13Table;
