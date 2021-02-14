import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "./components/layout/Appbar";
import Home from "./components/Home";
import DataTableContainer from "./components/DataTableContainer";
import Hex from "./components/pages/Hex/Hex.js";
import Bookmarks from "./components/pages/Bookmarks/Bookmarks.js";
import About from "./components/pages/About";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              strict
              path="/"
              render={() => (
                <React.Fragment>
                  <AppBar title="Homepage" />
                  <Home home={true} />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/TT13"
              render={() => (
                <React.Fragment>
                  <AppBar title="AG-Link" />
                  <DataTableContainer
                    type="TT13"
                    grouping={true}
                    exportButton={true}
                    bodyHeight="67vh"
                    // paging={true}
                    // pageSize="50"
                    // pageOptions="5, 10, 25, 50"
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/ERROR"
              render={() => (
                <React.Fragment>
                  <AppBar title="Error Log" />
                  <DataTableContainer
                    type="ERROR"
                    grouping={true}
                    exportButton={true}
                    bodyHeight="67vh"
                    // paging={true}
                    // pageSize="50"
                    // pageOptions="[5, 10, 25, 50]"
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/BOOKMARKS"
              render={() => (
                <React.Fragment>
                  <AppBar title="Bookmarks" minWidth="1200px" />
                  <Bookmarks />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/SCANNERS"
              render={() => (
                <React.Fragment>
                  <AppBar title="Scanners" />
                  <DataTableContainer
                    type="SCANNERS"
                    grouping={false}
                    paging={false}
                    bodyHeight="74vh"
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/HEX"
              render={() => (
                <React.Fragment>
                  <AppBar title="MFS Hex Decoder (tt14xx only)" />
                  <Hex />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/ABOUT"
              render={() => (
                <React.Fragment>
                  <AppBar title="About" />
                  <DataTableContainer type="ABOUT" />
                </React.Fragment>
              )}
            ></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
