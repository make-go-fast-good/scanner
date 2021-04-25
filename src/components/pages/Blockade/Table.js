import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    // minWidth: 500,
    boxShadow: '0 3px 5px 2px rgba(204, 204, 204, .9)',
  },
});

function createData(name, val) {
  return { name, val };
}

const rows = [
  createData("Field", ""),
  createData("X Coordinate", ""),
  createData("Y Coordinate", ""),
  createData("Z Coordinate", ""),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow style ={ idx % 2? { background : "white" }:{ background : "rgb(244,244,244)" }} key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
