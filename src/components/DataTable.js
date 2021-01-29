import {css} from "@emotion/core";
import axios from "axios";
import React, {Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "../App.css";
import {Container} from "./Container";
import PlcConnections from "./PlcConnections";

class DataTable extends Component {
  state = {
    type: this.props.type,
    area: undefined,
    data: undefined,
    options: {},
    loading: false,
    paging: true,
        pageSize: 20,
    error: undefined,
    bodyHeight: "61vh",
  };

  pagination = () => {
    this.setState({
      paging: !this.state.paging,
    });
  };

  bodyHeight = () => {
    if (this.state.paging == true) {
      this.setState({
        bodyHeight: "61vh",
      });
    } else {
      this.setState({
        bodyHeight: "62vh",
      });
    }
  };

  makeTable = (plcData, area) => {
    this.setState({
      area: area,
      data: plcData,
      pagination: this.pagination.bind(this, true),
      options: {
        // maxBodyHeight: this.bodyHeight.bind(this), // makes the headers fixed if the body size is larger.
        maxBodyHeight: this.state.bodyHeight,
        paging: this.state.paging,
        exportButton: true,
        pageSize: this.state.pageSize,
        search: true,
        grouping: true,
        sorting: true,
        headerStyle: {
          backgroundColor: "#555",
          color: "#FFF",
          textAlign: "center",
        },
        cellStyle: {
          textAlign: "center",
        },
      },
      loading: false,
    });
  };

  // Select Connection
  getData = (area) => {
    this.setState({ loading: true, area: area.conn });
    axios
      .get("http://localhost:8080/" + this.state.type + "/connect", {
        params: {
          area: area,
        },
      })
      .then((res) => {
        this.makeTable(res.data, area.conn);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: "Connection Error: Verify connection to the PLC network.",
        });
      });
  };

  render() {
    const override = css`
      margin: 300px 50%;
      display: block;
      border-color: #d2d2d2;
    `;

    return (
      <Router>
        <React.Fragment>
          <PlcConnections getData={this.getData} area={this.state.type} />
          <Container
            getData={this.getData}
            area={this.state.area}
            data={this.state.data}
            options={this.state.options}
            key={this.state.key}
            loading={this.state.loading}
            css={override}
            error={this.state.error}
            type={this.state.type}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default DataTable;
