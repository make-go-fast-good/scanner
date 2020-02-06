import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
    options: {}
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
        paging: true,
        pageSize: 10,
        search: true
      }
    });
  };

  // Select Connection
  getData = (conn, area) => {
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

  render() {

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
