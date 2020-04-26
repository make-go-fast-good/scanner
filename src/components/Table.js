import React, { Component } from "react";
import MaterialTable from "material-table";
import DefaultTable from "./DefaultTable";
import TT13Columns from "../config/TT13Columns";
import DB171Columns from "../config/DB171Columns";
import DB421Columns from "../config/DB421Columns";
import DB1852Columns from "../config/DB1852Columns";
import ERRORColumns from "../config/ERRORColumns";
export class Table extends Component {
  state = {
    extended: false
  };
  render() {
    let _columns;
    let tableColumns;
      /*
          console.log('this.props.area');
          console.log(this.props.area);
          console.log('this.props.data');
          console.log(this.props.data);
          console.log('area: ');
          console.log(area);
          */
      switch (this.props.type) {
          case 'TT13':
              tableColumns = TT13Columns
              break;
          case 'ERROR':
              tableColumns = ERRORColumns
              break;
          case 'OVERHEAD':
              switch (this.props.area) {
                 case 'C08':
                      console.log('Table columns here: ');
                      console.log('DB1852Columns');
                      tableColumns = DB1852Columns
                      break;
                   case 'C09':
                   case 'C10':
                   case 'C12':
                      console.log('Table columns here: ');
                      console.log('DB421Columns');
                      tableColumns = DB421Columns
                      break;
                   case 'C11':
                      console.log('Table columns here: ');
                      console.log('DB171Columns');
                      tableColumns = DB171Columns
                      break;
                      /*
                  default:
                      console.log('Table columns here: ');
                      console.log('DB1852Columns');
                      tableColumns = DB1852Columns
                      */
              }
      }
/*
    if(this.props.type === 'TT13') tableColumns = TT13Columns
    if(this.props.type === 'OVERHEAD') tableColumns = DB1852Columns
    if(this.props.type === 'ERROR') tableColumns = ERRORColumns
*/

    if (this.props.loading === true) {
      return <DefaultTable loading={this.props.loading} css={this.props.css} />;
    } else if (this.props.error !== undefined) {
      return <DefaultTable error={this.props.error} />;
    } else if (this.props.data === undefined) {
      return <DefaultTable />;
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
              icon: this.state.extended === false ? "add" : "remove",
              tooltip: this.state.extended === false ? "Extended Data View" : "Condensed Data View",
              isFreeAction: true,
              onClick: event => this.setState({ extended: !this.state.extended })
            }
          ]}
        />
      );
    }
  }
}

export default Table;
