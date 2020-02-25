import React, { Component } from "react";
import MaterialTable from "material-table";
import DefaultTable from "./DefaultTable";
import Columns from "../config/Columns";
export class TT13Table extends Component {
  state = {
    extended: false
  };
  render() {
    let _columns;

    if (this.props.loading === true) {
      return <DefaultTable loading={this.props.loading} css={this.props.css} />;
    } else if (this.props.error !== undefined) {
      return <DefaultTable error={this.props.error} />;
    } else if (this.props.data === undefined) {
      return <DefaultTable />;
    } else {
      this.state.extended === false
        ? (_columns = Columns.condensed)
        : (_columns = Columns.extended);
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

export default TT13Table;
