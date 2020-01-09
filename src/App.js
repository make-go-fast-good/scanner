import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import SelectConn from "./components/SelectConn";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import readData from "./connect.js";

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

    readData(conn);
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
