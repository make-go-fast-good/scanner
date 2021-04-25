import React, { Component } from "react";
import DataGrid, { TextEditor } from "react-data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { key: "stoloc", name: "STOLOC", editor: TextEditor },
  { key: "expectedluid", name: "EXPECTED LUID", editor: TextEditor },
  { key: "verifiedluid", name: "VERIFIED LUID", editor: TextEditor },
];

const rows = [
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1102", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1103", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1104", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1102", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1103", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1104", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1102", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
];

class Grid extends Component {
  state = { rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    let rowlength = this.state.rows.length;

    console.log(rowlength);

    return (
      <>
        <div style={headerStyle}>
          <Typography variant="h5" align="center">
            Blockade Checklist
          </Typography>
        </div>
        <DataGrid
          style={gridStyle}
          columns={columns}
          rows={this.state.rows}
          rowGetter={(i) => this.state.rows[i]}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          className="fill-grid"
        />
      </>
    );
  }
}

export default Grid;

const gridStyle = {
  minHeight: "22vh",
  maxHeight: "22vh",
  overflow: "auto",
  color: "black",
};

const headerStyle = {
  color: "black",
};
