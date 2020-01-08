import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import SelectConn from "./components/SelectConn";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import nodes7 from "nodes7";
import uuid from "uuid";

import "./App.css";

class App extends Component {
  state = {
    todos: [],
    connections: []
  };

  /*
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }
  */

  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
    console.log(id + " id");
  };

  // Select Connection
  selConn = conn => {
    let plc = new nodes7();
    var doneReading = false;
    var doneWriting = false;

    var variables = {
      TEST1: "MR4", // Memory real at MD4
      TEST2: "M32.2", // Bit at M32.2
      TEST3: "M20.0", // Bit at M20.0
      TEST4: "DB1,REAL0.20", // Array of 20 values in DB1
      TEST5: "DB1,REAL4", // Single real value
      TEST6: "DB1,REAL8", // Another single real value
      TEST7: "DB1,INT12.2", // Two integer value array
      TEST8: "DB1,LREAL4" // Single 8-byte real value
    };

    plc.initiateConnection(conn, connected);

    function connected(err) {
      if (typeof err !== "undefined") {
        // We have an error.  Maybe the PLC is not reachable.
        console.log(err);
        process.exit();
      }
      plc.setTranslationCB(function(tag) {
        return variables[tag];
      }); // This sets the "translation" to allow us to work with object names

      plc.addItems(["TEST1", "TEST4"]);
      plc.addItems("TEST6");
      //	plc.removeItems(['TEST2', 'TEST3']);  // We could do this.
      //	plc.writeItems(['TEST5', 'TEST6'], [ 867.5309, 9 ], valuesWritten);  // You can write an array of items as well.
      //  plc.writeItems("TEST7", [666, 777], valuesWritten); // You can write a single array item too.
      //  plc.readAllItems(valuesReady);
    }

    function valuesReady(anythingBad, values) {
      if (anythingBad) {
        console.log("SOMETHING WENT WRONG READING VALUES!!!!");
      }
      console.log(values);
      doneReading = true;
      if (doneWriting) {
        process.exit();
      }
    }

    function valuesWritten(anythingBad) {
      if (anythingBad) {
        console.log("SOMETHING WENT WRONG WRITING VALUES!!!!");
      }
      console.log("Done writing.");
      doneWriting = true;
      if (doneReading) {
        process.exit();
      }
    }

    console.log(conn);

    // Return all the todos that do not match the id of the one passed into this function.
    // ... "spread operator" cant just change the array , use the spread operator to make a copy of it.
    /*
    this.setState({
      connections: [...this.state.connections.filter(conn => conn.id === id)]
    });
    */
  };

  // Delete Todo
  delTodo = id => {
    /*
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter
    (todo => todo.id !== id)] }))
    */
    // Return all the todos that do not match the id of the one passed into this function.
    // ... "spread operator" cant just change the array , use the spread operator to make a copy of it.
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  // Add Todo
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });

    /*
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: 
    [...this.state.todos, res.data] }))
    */
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
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />{" "}
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
