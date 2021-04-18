import React, {Component} from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import "./App.css";
import DataTableContainer from "./components/DataTableContainer";
import Home from "./components/Home";
import AppBar from "./components/layout/Appbar";
import Blockade from "./components/pages/Blockade/Blockade";
import Bookmarks from "./components/pages/Bookmarks/Bookmarks";
import Config from "./components/pages/Config/Config";
import Hex from "./components/pages/Hex/Hex.js";
import About from "./components/pages/About/About"


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
                  <AppBar title="Bookmarks MFS Hex Decoder" />
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
              path="/blockade"
              render={() => (
                <React.Fragment>
                  <AppBar title="Blockade Checklist" />
                  <Blockade />
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
                    {/* <DataTableContainer type="About" /> */}
                    <About />
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
