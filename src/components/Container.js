import MaterialTable from "material-table";
import React, {Component} from "react";
import DB171Columns from "../config/DB171Columns";
import DB1852Columns from "../config/DB1852Columns";
import DB421Columns from "../config/DB421Columns";
import ERRORColumns from "../config/ERRORColumns";
import SCANNERSColumns from "../config/SCANNERSColumns.js";
import TT13Columns from "../config/TT13Columns";
import Home from "./Home";

export class Container extends Component {
  state = {
    extended: false,
    paging: true,
  };

  render() {
    let _columns;
    let tableColumns;

    switch (this.props.type) {
      case "TT13":
        tableColumns = TT13Columns;
        break;
      case "SCANNERS":
        tableColumns = SCANNERSColumns;
        break;
      case "ERROR":
        tableColumns = ERRORColumns;
        break;
      case "OVERHEAD":
        switch (this.props.area) {
          case "C08":
            tableColumns = DB1852Columns;
            break;
          case "C09":
          case "C10":
          case "C12":
            tableColumns = DB421Columns;
            break;
          case "C11":
            tableColumns = DB171Columns;
        }
    }

    if (this.props.loading === true) {
      return <Home loading={this.props.loading} css={this.props.css} />;
    } else if (this.props.error !== undefined) {
      return <Home error={this.props.error} />;
    } else if (this.props.data === undefined) {
      return <Home />;
    } else {
      this.state.extended === false
        ? (_columns = tableColumns.condensed)
        : (_columns = tableColumns.extended);
      return (
        <MaterialTable
          style={{ marginTop: "15px" }}
          key={this.props.key}
          title={this.props.area}
          columns={_columns}
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

export default Container;
