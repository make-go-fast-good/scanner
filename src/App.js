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

  /*
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }
  */
  barcodeConcat = data => {

  }
  // Select Connection
  selConn = conn => {
    console.log(conn);
    // Optionally the request above could also be done as
    axios
      .get("http://localhost:8080/tt13", {
        params: {
          conn: conn
        }
      })
      .then(res => {
        this.setState.plcData = res.data
        console.log('In App.js res: ')
        console.log(res);
        console.log('In App.js res.data: ')
        console.log(res.data)
      })
        /*
      //merge char array into string 
      .then( () => {
        console.log('_plcData: ')
        console.log(this.state.plcData)
        for(const row of _plcData){
          for(const barcode of row){
            console.log(barcode);
          }
        }
      })

        */
      .catch(function(error) {
        console.log(error);
      });
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
                  <SelectConn selConn={this.selConn} />{" "}
                  <MaterialTable
                    options={{
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
