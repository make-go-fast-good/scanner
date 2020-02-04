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

handleChange = e => {
  console.log('from handle Change');
  console.log(e);
  this.setState({
      [e.target.name]: e.target.value
  })
}


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
      /*
      .then(() => {
        this.MaterialTable.setState({ data: this.state.plcData})
        console.log(this.MaterialTable.data)
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
                  <SelectConn getData={this.getData} />{" "}
                  <MaterialTable
                    rows={ 
                       this.state.plcData 
                    }
                    onChange={ this.handleChange }
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
