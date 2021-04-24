import React, {Component} from "react";
import './css/w3.css';
// import './js/coordparse';
// import './js/main';
// import './js'


class Inputs extends Component {

  getStyle = (props) => {
    return {
      borderColor: "#E3E3E3",
      display: "flex",
      flex: "1",
      color: "#666",
      background: "#FFF",
      fontSize: "14px",
      justifyContent: "center",
      padding: "10px 10px ",
      margin: "10px 10px ",
      minHeight: "10px",
      minWidth: "100px",
    };
  };

  render() {
      return (
      <div style={this.getStyle()}>
            <h4>Single Coordinate Check:</h4>
            <input type="text" name="filename" value="" id="inputText" style="width: auto;"></input>
            <h4>Message:</h4>
            <input type="text" name="filename" value="" id="resultText" style="width: auto;" readonly></input>
            <input type="button" class="smbutton w3-margin-top" id="ParseButton" value="Check Coordinate" onclick="parseData()"></input>
            <h4 class="w3-margin-top">Select Blockade Checklist File:</h4>
            <input class="file" id='file' type="file"></input>
            <h4>Filename:</h4>
            <input type="text" class="filename" value="" id="wbName" style="width: auto;"></input>
            <input type="button" class="smbutton w3-margin-top" id="save" value="Save Blockade Checklist"></input>
            <label for="file"></label>
            <div id="buttons"></div>
        </div>
      );
  }
}

export default Inputs;
