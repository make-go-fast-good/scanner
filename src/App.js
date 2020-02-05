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

  makeTable = (plcData, area) => {

    console.log(plcData)
    console.log(area)
    let table;

    if (!plcData || !area) {
      table = (<div>Select a connection to create a table</div>);
    } else {
      table = (
        <MaterialTable
          data={ plcData }
          title={ area }
          options={{
            paging: true,
            pageSize: 10,
            search: true
          }}
        />
      );
    }

    return table;
  };
  // Select Connection
  getData = (conn, area) => {
    if(conn && area){
      console.log(conn);
      console.log(area);
    }
    axios
      .get("http://localhost:8080/tt13", {
        params: {
          conn: conn
        }
      })
      .then(res => {
        this.setState({ plcData: res.data });
        console.log(this.state.plcData);
      })
      .then( () => {
        this.makeTable(this.state.plcData, area)
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {

    console.log('before makeTable')

    let table = this.makeTable();

    console.log('after makeTable')
    console.log(table);

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
                  { table }
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
