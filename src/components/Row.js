import React, { Component } from "react";
import MaterialTable from 'material-table';

export class Row extends Component {
    render() {
      return (
        <MaterialTable
          title="TT13 Send"
          columns={[
            { title: "Index", field: "index" },
            { title: "Type", field: "type" },
            { title: "Start-Date", field: "start_date" },
            { title: "Time", field: "time" },
            { title: "Last-Access", field: "last_access" },
            { title: "Time", field: "time_2" },

            { title: "FP-Number", field: "fp_number" },
            { title: "Scanner", field: "scanner" },
            { title: "Barcode 1-10", field: "bc_10" },
            { title: "Barcode 11-20", field: "bc_20" },
            { title: "Barcode 21-30", field: "bc_30" },
            { title: "Barcode 31-40", field: "bc_40" },
            { title: "Order", field: "order" },

            { title: "Origin", field: "origin" },
            { title: "Location", field: "location" },
            { title: "Destination", field: "destination" },
            { title: "Forced Dest", field: "forced_dest" },

            { title: "Overflow", field: "overflow" },
            { title: "No Weight", field: "no_weight" },
            { title: "No Contour", field: "no_contour" },
            { title: "Special 1", field: "special1" },
            { title: "Special 2", field: "special2" },
            { title: "Special 3", field: "special3" },
            { title: "TA for SC", field: "ta_for_sc" },
            { title: "Dont Delete", field: "dont_delete" },
            { title: "Ack", field: "ack" },

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
          data={[{ name: "Mehmet", surname: "Baran", birthYear: 1987 }]}
          options={{
            search: true
          }}
        />
      );
    }
}

export default Row