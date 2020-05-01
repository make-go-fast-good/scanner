import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { css } from "@emotion/core";
import axios from "axios";
import { Container } from "./Container";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import DotLoader from "react-spinners/DotLoader";

import "../App.css";
// import "./pages/coordinates/css/blockade.css"
// import "./pages/coordinates/css/sheetjs.css"
// import "./pages/coordinates/css/w3.css"
// 
// import "./pages/coordinates/js/main.js"
// import "./pages/coordinates/js/coordparse.js"
// import "./pages/coordinates/lib/Blob.js"
// import "./pages/coordinates/lib/canvas-datagrid.js"
// import "./pages/coordinates/lib/dropsheet.js"
// import "./pages/coordinates/lib/FileSaver.js"
// import "./pages/coordinates/lib/sheetjsw.js"
// import "./pages/coordinates/lib/shim.js"
// import "./pages/coordinates/lib/spin.js"
// import "./pages/coordinates/lib/xlsx.full.min.js"

class Coordinates extends Component {

  componentDidMount(){
      this.getData();
  }

  state = {
    loading: false,
    error: undefined,
    data: undefined
  };

  // Select Connection
  getData = (area) => {
    this.setState({ loading: true});
    axios
      .get("http://localhost:8080/COORDINATES")
      .then((res) => {
        this.setState({
              loading: false,
              data: res.data,
            });
        console.log("res.data");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: "Connection Error: Verify server is running.",
        });
      });
  };

  getStyle = (props) => {
      return {
      background: "#F4F4F4",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      border: "1px dashed #BBB",
      margin: "15px auto",
      color: "#555",
      minHeight: "88vh"
    };
  };


  render() {
    const override = css`
      margin: 300px 50%;
      display: block;
      border-color: #d2d2d2;
    `;

     return (
            <div style={this.getStyle()}>
              { ReactHtmlParser(this.state.data) }
            </div>
      );
    }
}

export default Coordinates;
