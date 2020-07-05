import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "./components/layout/Appbar";
import About from "./components/pages/About";
import Default from "./components/Default";
import DataTable from "./components/DataTable";
import Coordinates from "./components/Coordinates.js";
import Bookmarks from "./components/Bookmarks.js";

import BookmarksSwitch from "./components/Switch.js";

import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              strict
              path="/"
              render={(props) => (
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
              render={(props) => (
                <React.Fragment>
                  <AppBar title="TT13 Data" />
                  <DataTable type="TT13" />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/OVERHEAD"
              render={(props) => (
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
              render={(props) => (
                <React.Fragment>
                  <AppBar title="Error Log" />
                  <DataTable type="ERROR" />
                </React.Fragment>
              )}
            ></Route>
            {/* <Route */}
            {/*   exact */}
            {/*   strict */}
            {/*   path="/TT31" */}
            {/*   render={(props) => ( */}
            {/*     <React.Fragment> */}
            {/*       <AppBar title="TT31 Data" /> */}
            {/*       <DataTable type="TT31" /> */}
            {/*     </React.Fragment> */}
            {/*   )} */}
            {/* ></Route> */}
            <Route
              exact
              strict
              path="/BOOKMARKS"
              render={(props) => (
                <React.Fragment>
                  <AppBar title="Bookmarks" minWidth="1200px"/>
                  <Bookmarks />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              strict
              path="/SCANNERS"
              render={(props) => (
                <React.Fragment>
                  <AppBar title="Scanners"/>
                  <DataTable type="SCANNERS" />
                </React.Fragment>
              )}
            ></Route>
            {/* <Route */}
            {/*   exact */}
            {/*   strict */}
            {/*   path="/COORDINATES" */}
            {/*   render={(props) => ( */}
            {/*     <React.Fragment> */}
            {/*       <AppBar title="Matrix Coordinates" /> */}
            {/*       <Coordinates /> */}
            {/*     </React.Fragment> */}
            {/*   )} */}
            {/* ></Route> */}
            <Route
              exact
              strict
              path="/ABOUT"
              render={(props) => (
                <React.Fragment>
                  <AppBar title="About" />
                  <DataTable type="ABOUT" />
                </React.Fragment>
              )}
            ></Route>
            {/*
            <Route path="/about" component={About}></Route>
            */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
