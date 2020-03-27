import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import DefaultTable from "./components/DefaultTable";
import DataTable from "./components/pages/DataTable";

import "./App.css";

class App extends Component {
  state = {
    
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              strict
              path="/"
              render={props => (
                <React.Fragment>
                  <Header title="Telegram Homepage" />
                  <DefaultTable home={true} />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/TT13"
              render={props => (
                <React.Fragment>
                  <Header title="TT13 Data" />
                  <DataTable type="TT13" />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/OVERHEAD"
              render={props => (
                <React.Fragment>
                  <Header title="Overhead Scanner Data" />
                  <DataTable type="OVERHEAD" />
                </React.Fragment>
              )}
            ></Route>
             <Route
              exact
              strict
              path="/TT31"
              render={props => (
                <React.Fragment>
                  <Header title="TT31 Data" />
                  <DataTable type="TT31" />
                </React.Fragment>
              )}
            ></Route>
             <Route
              exact
              strict
              path="/ERROR"
              render={props => (
                <React.Fragment>
                  <Header title="Error Log" />
                  <DataTable type="ERROR" />
                </React.Fragment>
              )}
            ></Route>
            <Route path="/about" component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
