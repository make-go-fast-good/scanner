import React, { Component } from "react";
import { Typography } from "@material-ui/core";
// import './css/w3.css';
// import parseData from './js/coordparse';
// import './js/main';

class Inputs extends Component {
  state = {
    coordinate: "",
    result: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div style={getStyle}>
        <Typography variant="h5" align="left">
          Coordinate Check
        </Typography>
        <input
          type="text"
          name="coordinate"
          placeholder="Paste coordinate here"
          style={inputStyle}
          value={this.state.coordinate}
          onChange={this.onChange}
        ></input>
        <Typography variant="h7" align="left">
          Result
        </Typography>
        <input
          type="text"
          name="result"
          style={inputStyle}
          value={this.state.result}
          readOnly
        ></input>
        <input
          type="button"
          id="ParseButton"
          value="Check Coordinate"
          // onClick={parseData()}
          style={buttonStyle}
        ></input>
        <Typography variant="h7" align="left">
          Upload Blockade Checklist File
        </Typography>
        <input className="file" id="file" type="file" style={fileStyle}></input>
        <Typography variant="h7" align="left">
          Filename
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
  WebkitUserSelect: "none",
  msUserSelect: "none",
  MozUserSelect: "none",
  userSelect: "none",
};

const inputStyle = {
  borderColor: "#E3E3E3",
  padding: ".25em",
  margin: "1em 0 1em 0",
  width: "80%",
  WebkitUserSelect: "none",
  msUserSelect: "none",
  MozUserSelect: "none",
  userSelect: "none",
};

const buttonStyle = {
  borderColor: "#E3E3E3",
  borderRadius: "5px",
  fontSize: "1em",
  background: "yellow",
  padding: ".5em",
  margin: "1em 0 1em 0",
  width: "70%",
  cursor: "pointer",
  WebkitUserSelect: "none",
  msUserSelect: "none",
  MozUserSelect: "none",
  userSelect: "none",
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
