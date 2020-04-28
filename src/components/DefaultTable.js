import React, { Component } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Card from "./Card";

import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import ScannerTwoToneIcon from "@material-ui/icons/ScannerTwoTone";

export class DefaultTable extends Component {
  getStyle = (props) => {
    let _height;

    props ? (_height = "88.5vh") : (_height = "83vh");

    return {
      background: "#F4F4F4",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: _height,

      border: "1px dashed #BBB",
      width: "100%",
      margin: "15px auto",
      color: "#555",
    };
  };

  render() {
    if (this.props.loading === true) {
      return (
        <div style={this.getStyle()}>
          <ClimbingBoxLoader
            css={this.props.css}
            size={20}
            color={"#d2d2d2"}
            loading={this.props.loading}
          />
        </div>
      );
    } else if (this.props.error !== undefined) {
      return <h2 style={this.getStyle()}>{this.props.error}</h2>;
    } else if (this.props.home === true) {
      return (
        <h2 style={this.getStyle(this.props.home)}>
            <Card 
              to="/TT13"
              primary="TT13 Data"
              icon={<EmailTwoToneIcon style={{ fontSize: "38px" }} />}
            />
            <Card
              to="/OVERHEAD"
              primary="Overhead Scanner Data"
              icon={<ScannerTwoToneIcon style={{ fontSize: "38px" }} />}
            />
            <Card
              to="/ERROR"
              primary="Error Log"
              icon={<ErrorTwoToneIcon style={{ fontSize: "38px" }} />}
            />
        </h2>
      );
    } else {
      return (
        <h2 style={this.getStyle()}>
          Select a connection from above to read from the PLC
        </h2>
      );
    }
  }
}

export default DefaultTable;
