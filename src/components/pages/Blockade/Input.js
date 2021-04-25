import React, { Component } from "react";
import { Typography } from "@material-ui/core";
// import './css/w3.css';
// import parseData from './js/coordparse';
// import './js/main';

class Inputs extends Component {
  render() {
    return (
      <div style={getStyle}>
        <Typography variant="h6" align="left">
          Single Coordinate Check:
        </Typography>
        <input
          type="text"
          name="filename"
          value=""
          id="inputText"
          style={inputStyle}
        ></input>
        <Typography variant="h6" align="left">
          Message
        </Typography>
        <input
          type="text"
          name="result"
          value=""
          id="resultText"
          style={inputStyle}
          readOnly
        ></input>
        <input
          type="button"
          id="ParseButton"
          value="Check Coordinate"
          // onClick={parseData()}
          style={buttonStyle}
        ></input>
        <Typography variant="h6" align="left">
          Select Blockade Checklist File:
        </Typography>
        <input className="file" id="file" type="file"
          style={fileStyle}
        ></input>
        <Typography variant="h6" align="left">
          Filename:
        </Typography>
        <input
          type="text"
          className="filename"
          value=""
          id="wbName"
          style={inputStyle}
        ></input>
        <input
          type="button"
          id="save"
          value="Save Blockade Checklist"
          style={buttonStyle}
        ></input>
        <label for="file"></label>
        <div id="buttons"></div>
      </div>
    );
  }
}

export default Inputs;

const getStyle = {
  borderColor: "#E3E3E3",
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1em",
  margin: "1em",
};

const inputStyle = {
  borderColor: "#E3E3E3",
  padding: ".25em",
  margin: "1em 0 1em 0",
  width: "80%",
};

const buttonStyle = {
  borderColor: "#E3E3E3",
  borderRadius: "5px",
  fontSize: "1em",
  background: "yellow",
  padding: ".5em",
  margin: "1em 0 1em 0",
  width: "70%",
    cursor: "pointer"
};

const fileStyle = {
  borderColor: "#E3E3E3",
  borderRadius: "5px",
  fontSize: ".75em",
  background: "lightgrey",
  padding: ".5em",
  margin: ".5em 0 .5em 0",
  width: "80%",
};
