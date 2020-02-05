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

  makeTable = () => {
    console.log("makeTable yes table");
    this.setState({key: this.props.key})
    this.setState({
      options: {
        paging: true,
        pageSize: 10,
        search: true
      }
    });
    return (
      <TT13Table
        data={this.state.plcData}
        title={this.state.area}
        key={this.state.key}
        options={this.state.options}
      />
    );
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
        this.setState({ plcData: res.data });
        this.setState({ area: area });
        this.makeTable();
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
