import React, { Component } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Header from "./layout/Header"
import Card from './Card'
export class DefaultTable extends Component {
  makeCard = e => {
    
  }

  getStyle = (props) => {
    let _height; 

    props ? _height = "88.5vh" : _height = "83vh"

    return {
      background: "#F4F4F4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: _height,

      border: "1px dashed #BBB",
      width: "100%",
      margin: "15px auto",
      color: "#555"
    };
  };

  render() {
    if (this.props.loading === true) {
      return (
        <div style={this.getStyle()}>
          <PropagateLoader
            css={this.props.css}
            size={20}
            color={"#d2d2d2"}
            loading={this.props.loading}
          />
        </div>
      );
    } else if (this.props.error !== undefined) {
      return (
        <h2 style={this.getStyle()}>
         {this.props.error} 
        </h2>
      );
    } else if (this.props.home === true) {
      return (
        <h2 style={this.getStyle(this.props.home)}>
          <Card />
        </h2>
      );
    }else {
      return (
        <h2 style={this.getStyle()}>
          Select a connection from above to read from the PLC
        </h2>
      );
    }
  }
}

export default DefaultTable;
