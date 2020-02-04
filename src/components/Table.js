import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import SelectConn from "./SelectConn";

export class BasicSearch extends Component {

  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
  }

  getData = conn => {
    console.log(conn);
    axios
      .get("http://localhost:8080/tt13", {
        params: {
          conn: conn
        }
      })
      .then(res => {
        this.setState({ plcData: res.data })
        console.log(this.state.plcData)
      })
      /*
      .then(() => {
        this.MaterialTable.setState({ data: this.state.plcData})
        console.log(this.MaterialTable.data)
      })
      */
      .catch(function(error) {
        console.log(error);
      });
  };

/*
  state = {
    rows: {
      tableData: {}
    }
  };

  onChange = e => {
    this.rows.setState({
      tableData: this.props.rows
    });
  };

  //  onChange = (e) => this.setState({ data: e.target.value });
*/
  render() {
    console.log("from table.js: ");
    console.log(this.props);

    return (
      <MaterialTable
        onChange={this.onChange}
        title="TT13 Send"
        columns={[
          { title: "Index", field: "index" },
          { title: "Type", field: "type" },
          { title: "Date_start", field: "start_date" },
          { title: "Time_start", field: "time" },
          { title: "Date_last", field: "last_access" },
          { title: "Time_last", field: "time_2" },

          { title: "FP", field: "fp_number" },
          { title: "Scanner", field: "scanner" },
          { title: "Barcode", field: "barcode" },
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
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'localhost:8080/tt13'
            axios.get(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                })
              })
          })
        }
        options={{
          search: true
        }}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () =>
              this.tableRef.current && this.tableRef.current.onQueryChange()
          }
        ]}
      />
    );
  }
}

export default BasicSearch;
