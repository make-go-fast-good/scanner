import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import DataTableContainer from "./components/DataTableContainer";
import Home from "./components/Home";
import AppBar from "./components/layout/Appbar";
import Config from "./components/pages/Config/Config";
import Bookmarks from "./components/pages/Bookmarks/Bookmarks.js";
import Hex from "./components/pages/Hex/Hex.js";

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
              path="/aglink"
              render={() => (
                <React.Fragment>
                  <AppBar title="AG-Link" />
                  <DataTableContainer
                    type="aglink"
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
              path="/error"
              render={() => (
                <React.Fragment>
                  <AppBar title="Error Log" />
                  <DataTableContainer
                    type="error"
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
              path="/bookmarks"
              render={() => (
                <React.Fragment>
                  <AppBar title="Bookmarks" minWidth="98%" />
                  <Bookmarks />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/scanners"
              render={() => (
                <React.Fragment>
                  <AppBar title="Scanners" />
                  <DataTableContainer
                    type="scanners"
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
              path="/hex"
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
              path="/config"
              render={() => (
                <React.Fragment>
                  <AppBar title="Config Editor" />
                  <Config />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/about"
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
