import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from "axios";
import Header from "./components/layout/Header";
import SelectConn from "./components/SelectConn";
import About from "./components/pages/About";
import { TT13Table } from "./components/Table";

import "./App.css";

class App extends Component {
  state = {
    area: undefined,
    data: undefined,
    options: {},
    loading: false
  };

  makeTable = (plcData, area) => {
    if (plcData && area) {
      console.log("in makeTable should be plcData & area");
      console.log(plcData);
      console.log(area);
    }

    this.setState({
      area: area,
      data: plcData,
      options: {
        paging: false,
        pageSize: 5,
        search: true,
        grouping: false
      },
      loading: false
    });
  };

  // Select Connection
  getData = (conn, area) => {
    this.setState({ loading: true });
    axios
      .get("http://localhost:8080/tt13", {
        params: {
          conn: conn
        }
      })
      .then(res => {
        this.makeTable(res.data, area);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

      //margin: 300px auto;
  render() {
    const override = css`
      margin: 300px 50%;
      display: block;
      border-color: #d2d2d2;
    `;
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <SelectConn getData={this.getData} />
                  <TT13Table
                    area={this.state.area}
                    data={this.state.data}
                    options={this.state.options}
                    key={this.state.key}
                    loading={this.state.loading}
                  />
                  <PropagateLoader
                    css={override}
                    size={20}
                    color={"#d2d2d2"}
                    loading={this.state.loading}
                  />
                </React.Fragment>
              )}
            ></Route>{" "}
            <Route path="/about" component={About}></Route>{" "}
          </div>{" "}
        </div>{" "}
      </Router>
    );
  }
}

export default App;
