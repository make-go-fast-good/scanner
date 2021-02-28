import React, {Component} from "react";
import DataGrid, {TextEditor} from "react-data-grid";

const columns = [
  { key: "stoloc", name: "STOLOC", editor: TextEditor },
  { key: "expectedluid", name: "EXPECTED LUID", editor: TextEditor },
  { key: "verifiedluid", name: "VERIFIED LUID", editor: TextEditor },
];

const rows = [
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
  { stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
];

class Grid extends Component {
  render() {
    return <DataGrid columns={columns} rows={rows} className="fill-grid" />;
  }
}

export default Grid;
