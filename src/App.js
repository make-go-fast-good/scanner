import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import SelectConn from "./components/SelectConn";
import About from "./components/pages/About";
import MaterialTable from "./components/Table";

import "./App.css";

class App extends Component {
  state = {
    connections: [],
    plcData: []
  };

  // Select Connection
  getData = conn => {
    console.log(conn);
    axios
      .get("http://localhost:8080/tt13", {
        params: {
          conn: conn
        }
      })
      .then(res => {
        this.setState({ plcData: res.data })
        console.log(this.state.plcData)
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({connections: conn})
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
                  <SelectConn getData={this.getData} />{" "}
                  <MaterialTable
                    getData={this.getData}
                    connections={this.state.connections}
                    data={this.state.plcData}
                    options={{
                      paging: true,
                      pageSize: 10,
                      search: true
                    }}
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
