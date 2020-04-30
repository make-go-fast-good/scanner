import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { css } from "@emotion/core";
import axios from "axios";
import { Container } from "./Container";

import DotLoader from "react-spinners/DotLoader";

import "../App.css";

class Coordinates extends Component {

  componentDidMount(){
      this.getData();
  }

  state = {
    loading: false,
    error: undefined
  };

  returnPage = () => {
    this.setState({
      loading: false,
    });
  };

  // Select Connection
  getData = (area) => {
    this.setState({ loading: true});
    axios
      .get("http://localhost:8080/COORDINATES")
      .then((res) => {
        this.returnPage(res.data, area.conn);
        console.log("res.data");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: "Connection Error: Verify connection to the PLC network.",
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
      minHeight: "86vh"
    };
  };


  render() {
    const override = css`
      margin: 300px 50%;
      display: block;
      border-color: #d2d2d2;
    `;

     return (
          <Container
            loading={this.state.loading}
            css={override}
            error={this.state.error}
            type="Coordinates"
          />
      );
    }
}

export default Coordinates;
