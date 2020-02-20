import React, { Component } from "react";
import PropTypes from "prop-types";
import connections from '../config/Connections';

export class SelectConn extends Component {
  state = {
    connections: connections 
  };

  onSubmit = e => {
    e.preventDefault();
    let conn = this.state.connections[e.target.value];
    this.props.getData(conn, e.target.value);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="submit"
          value="C01"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C02"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C03"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C04"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C05"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C06"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C07"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C08"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C09"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C10"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C11"
          className="btn"
          style={{ flex: "1", marginRight: ".2%" }}
          onClick={this.onSubmit}
        ></input>
        <input
          type="submit"
          value="C12"
          className="btn"
          style={{ flex: "1" }}
          onClick={this.onSubmit}
        ></input>
      </form>
    );
  }
}

// PropTypes
SelectConn.propTypes = {
  getData: PropTypes.func.isRequired
};

export default SelectConn;
