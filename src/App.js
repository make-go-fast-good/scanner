import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from "./components/layout/Appbar";

import Default from "./components/Default";
import DataTable from "./components/DataTable";

import About from "./components/pages/About";
import Hex from "./components/pages/Hex/Hex.js";
import Bookmarks from "./components/pages/Bookmarks/Bookmarks.js";
// import Worker from "./components/pages/Hex/assets/pdf.worker.min"
// import Coordinates from ".components/pages/Coordinates/Coordinates.js";

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
                  <Default home={true} />
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
                  <DataTable type="TT13" />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/OVERHEAD"
              render={() => (
                <React.Fragment>
                  <AppBar title="Overhead Scanner Data" />
                  <DataTable type="OVERHEAD" />
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
                  <DataTable type="ERROR" />
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
                  <DataTable type="SCANNERS" />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/HEX"
              render={() => (
                <React.Fragment>
                  <AppBar title="Hex Parser (WIP tt1413,tt1430,tt1434 ONLY)" />
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
                  <DataTable type="ABOUT" />
                </React.Fragment>
              )}
            ></Route>
            {/* <Route */}
            {/*     exact */}
            {/*     strict */}
            {/*     path="/WORKER" */}
            {/*     render={() => ( */}
            {/*         <React.Fragment> */}
            {/*             {Worker} */}
            {/*         </React.Fragment> */}
            {/*     )} */}
            {/* ></Route> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
