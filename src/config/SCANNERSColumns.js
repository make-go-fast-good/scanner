import React from "react";

const cols = {
  condensed: [
    { title: "FPNR", field: "data.fpnr", defaultSort: "asc" },
    { title: "Scanner", field: "data.scanner" },
    { title: "Barcode", field: "barcode" },
    {
      title: "Read History",
      field: "bitField",
      render: (rowData) => [
        ...rowData.bitField
          .split("")
          .map((char) =>
            char === "0" ? (
              <div
                style={{
                  display: "inline-block",
                  margin: "1px",
                  width: 3,
                  height: 24,
                  backgroundColor: "limegreen ",
                }}
              ></div>
            ) : (
              <div
                style={{
                  display: "inline-block",
                  margin: "1px",
                  width: 3,
                  height: 24,
                  backgroundColor: "red ",
                }}
              ></div>
            )
          ),
      ],
      cellStyle: { whiteSpace: "nowrap" },
      grouping: false,
    },
    { title: "Floating Read_rate", field: "data.leserate_100" },
    { title: "Overall Read_rate", field: "data.leserate" },
    { title: "Reads", field: "data.anz_read" },
    { title: "No reads", field: "data.anz_noread" },
  ],
  extended: [
    { title: "FPNR", field: "data.fpnr", defaultSort: "asc" },
    { title: "Scanner", field: "data.scanner" },
    { title: "Barcode", field: "barcode" },
    {
      title: "Read History",
      field: "bitField",
      render: (rowData) => [
        ...rowData.bitField
          .split("")
          .map((char) =>
            char === "0" ? (
              <div
                style={{
                  display: "inline-block",
                  margin: "1px",
                  width: 3,
                  height: 24,
                  backgroundColor: "limegreen ",
                }}
              ></div>
            ) : (
              <div
                style={{
                  display: "inline-block",
                  margin: "1px",
                  width: 3,
                  height: 24,
                  backgroundColor: "red ",
                }}
              ></div>
            )
          ),
      ],
      cellStyle: { whiteSpace: "nowrap" },
      grouping: false,
    },
    { title: "Floating Read_rate", field: "data.leserate_100" },
    { title: "Overall Read_rate", field: "data.leserate" },
    { title: "Reads", field: "data.anz_read" },
    { title: "No reads", field: "data.anz_noread" },
    { title: "Max_NoScan until_fault", field: "data.max_noscan" },
    { title: "Subsequent amount_NoScan", field: "data.anz_noscan_ff" },
    { title: "Max_NoRead until_fault", field: "data.max_noread" },
    { title: "Subsequent amount_NoRead", field: "data.anz_noread_ff" },
    { title: "Amount_of_reads (100 max)", field: "data.anz_lesungen" },
    { title: "Scanner_name", field: "scannerName" },
    { title: "Error_status of_Scanner", field: "data.status" },
    { title: "Collective_fault", field: "data.sasto" },
    {
      title: "Fault_maximum_amount NoScan_in_series",
      field: "data.max_noscan",
    },
    {
      title: "Fault_maximum_amount NoRead_in_series",
      field: "data.max_noread",
    },
    { title: "Fault_Timeout Communication", field: "data.timeout" },
    {
      title: "Fault_last_100_reads fallen_below_threshold",
      field: "data.leserate_100",
    },
    {
      title: "No_fault_threshold last_100_reads",
      field: "data.no_leserate_100",
    },
  ],
};

export default cols;
