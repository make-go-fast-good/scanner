import MaterialTable from "material-table";
import React, { Component } from "react";
import ErrorColumns from "../config/error/ErrorColumns";
import ScannerColumns from "../config/scanner/ScannerColumns.js";
import AgLinkColumns from "../config/aglink/AgLinkColumns";
import Home from "./Home";

export class DataTable extends Component {
  state = {
    extended: false,
    paging: true,
  };

  render() {
    let columns;
    let tableColumns;

    switch (this.props.type) {
      case "aglink":
        tableColumns = AgLinkColumns;
        break;
      case "scanners":
        tableColumns = ScannerColumns;
        break;
      case "error":
        tableColumns = ErrorColumns;
        break;
      default:
        break;
    }

    if (this.props.loading === true) {
      return <Home loading={this.props.loading} css={this.props.css} />;
    } else if (this.props.error !== undefined) {
      return <Home error={this.props.error} />;
    } else if (this.props.data === undefined) {
      return <Home />;
    } else {
      this.state.extended === false
        ? (columns = tableColumns.condensed)
        : (columns = tableColumns.extended);
      return (
        <MaterialTable
          style={{ marginTop: "15px" }}
          key={this.props.key}
          title={this.props.area}
          columns={columns}
          data={this.props.data}
          options={this.props.options}
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh PLC Data",
              isFreeAction: true,
              onClick: (e) => {
                // console.log(e)
                let conn = this.props.area;
                e.preventDefault();
                this.props.getData({ conn });
              },
            },
            {
              icon: this.state.extended === false ? "add" : "remove",
              tooltip:
                this.state.extended === false
                  ? "Extended Data View"
                  : "Condensed Data View",
              isFreeAction: true,
              onClick: () =>
                this.setState({
                  extended: !this.state.extended,
                }),
            },
            // {
            //   icon: this.state.paging === false ? "add" : "remove",
            //   tooltip:
            //     this.state.paging === false
            //       ? "Enable pagination"
            //       : "Disable pagination",
            //   isFreeAction: true,
            //   onClick: () => {
            //     this.setState({
            //       paging: !this.state.paging,
            //     });
            //     this.props.options.paging = this.state.paging;
            //     if (this.state.paging) {
            //       this.props.options.maxBodyHeight = "61vh";
            //     } else {
            //       this.props.options.maxBodyHeight = "68vh";
            //     }
            //     console.log("this.state");
            //     console.log(this.state);
            //   },
            // },
          ]}
        />
      );
    }
  }
}

export default DataTable;
