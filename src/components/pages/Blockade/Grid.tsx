import { useState, useCallback, useMemo } from "react";
import { Typography } from "@material-ui/core";

import uuid from 'uuid';

import DataGrid, {  TextEditor } from "react-data-grid";

/* // eslint-disable-next-line */
/* import DataGrid, { SelectColumn, TextEditor } from "react-data-grid"; */
/* import SelectCellFormatter from "react-data-grid"; */
/* import SelectEditor from "react-data-grid"; */
/* import stopPropagation from "react-data-grid"; */

import type { Column, SortDirection } from "react-data-grid";

interface Row {
  id: string;
  stoloc: string;
  expectedluid: string;
  verifiedluid: string;
}

function getColumns(): readonly Column<Row>[] {
  return [
    { key: "stoloc", name: "STOLOC", editor: TextEditor },
    {
      key: "expectedluid",
      name: "EXPECTED LUID",
      editor: TextEditor,
    },
    {
      key: "verifiedluid",
      name: "VERIFIED LUID",
      editor: TextEditor,
    },
  ];
}

function rowKeyGetter(row: Row) {
  return row.id;
}

function createRows(): readonly Row[] {
  const rows: Row[] = [];

  rows.push(
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "", expectedluid: "", verifiedluid: "" },
    { id: uuid.v4(), stoloc: "NRA1102", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1103", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "", expectedluid: "", verifiedluid: "" },
    { id: uuid.v4(), stoloc: "NRA1104", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1102", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1103", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "", expectedluid: "", verifiedluid: "" },
    { id: uuid.v4(), stoloc: "NRA1104", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1102", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "", expectedluid: "", verifiedluid: "" },
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" },
    { id: uuid.v4(), stoloc: "NRA1101", expectedluid: "empty", verifiedluid: "empty" }
  );

  return rows;
}

export default function Grid() {
  const [rows, setRows] = useState(createRows);
  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(["id", "NONE"]);
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());

  const columns = useMemo(() => getColumns(), []);

  const sortedRows: readonly Row[] = useMemo(() => {
    if (sortDirection === "NONE") return rows;

    let sortedRows: Row[] = [...rows];

    return sortDirection === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [rows, sortDirection, sortColumn]);

  const handleSort = useCallback(
    (columnKey: string, direction: SortDirection) => {
      setSort([columnKey, direction]);
    },
    []
  );

  return (
    <>
      <div style={headerStyle}>
        <Typography variant="h5" align="center">
          Blockade Checklist
        </Typography>
      </div>
      <DataGrid
        style={gridStyle}
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={sortedRows}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onRowsChange={setRows}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        className="fill-grid"
      />
    </>
  );
}

const gridStyle = {
  minHeight: "22vh",
  maxHeight: "22vh",
  Width: "80",
  overflow: "auto",
};

const headerStyle = {};
