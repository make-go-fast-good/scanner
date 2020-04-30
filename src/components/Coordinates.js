import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { css } from "@emotion/core";
import axios from "axios";

import "../App.css";

class Coordinates extends Component {
  state = {
    loading: false,
    error: undefined
  };

  makeTable = (page) => {
      console.log("we makin")
    this.setState({ loading: false, });
    return page;
  };

  // Select Connection
  getData = (area) => {

    console.log("heres the url");
    this.setState({ loading: true});
    console.log("heres the url");
    console.log("http://localhost:8080/" + this.state.type + "/connect");
    axios
      .get("http://localhost:8080/COORDINATES")
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        this.makeTable(res.data);
        return res.data
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: "Connection Error: Verify connection to the PLC network.",
        });
      });
  };

  render() {
    const override = css`
      margin: 300px 50%;
      display: block;
      border-color: #d2d2d2;
    `;

    return (
      <Router>
        <React.Fragment>
            <div>
                this.getData();
            </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default Coordinates;
