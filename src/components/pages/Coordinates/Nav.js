import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "../App.css";

class Navettes extends Component {

  state = {
      navs: [],
      rack: [],
      aisle:[]
  };


  navStyle = (props) => {
      return {
      borderColor: "#E3E3E3",
      background: "#7A8B99",
      color: "#EEE",
      fontSize: "14px",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "space-around",
      flex: "1",
      alignItems: "center",
      margin: "15px auto",
      padding: "15px auto",
      minHeight: "15vh",
      minWidth: "6vh",
    };
  };

  render() {
     return (
            <div style={this.getStyle()}>
            </div>
      );
    }
}

export default Navettes;
