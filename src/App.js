import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import SelectConn from "./components/SelectConn";
import About from "./components/pages/About";
import { TT13Table } from "./components/Table";

import "./App.css";
import DefaultTable from "./components/DefaultTable";

class App extends Component {
  state = {
    table: {},
    connections: [],
    plcData: [],
    area: ""
  };

  makeTable = (plcData, area) => {
    if (!plcData) {
      return <TT13Table />;
    } else {
      return (
        <TT13Table
          data={plcData}
          title={area}
          key={this.state.key}
          options={{
            paging: true,
            pageSize: 10,
            search: true
          }}
        />
      );
    }
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
        console.log("after get data here is the plcData");
        console.log(this.state.plcData);
      })
      /*
      .then(() => {
        this.makeTable(this.state.plcData, area);
      })
      */
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    console.log("in App render here are this.props");
    console.log(this.props);

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
                  <TT13Table />
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
