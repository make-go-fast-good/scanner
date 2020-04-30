import React, { Component } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import DotLoader from "react-spinners/DotLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Card from "./Card";

import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import TelegramIcon from '@material-ui/icons/Telegram';
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import ScannerTwoToneIcon from "@material-ui/icons/ScannerTwoTone";
import BookmarksTwoToneIcon from '@material-ui/icons/BookmarksTwoTone';
import MyLocationTwoToneIcon from '@material-ui/icons/MyLocationTwoTone';

export class DefaultTable extends Component {

  updateDimensions() {
      let update_height;
      let update_width  = window.innerWidth-100;
        if (window.innerWidth < 500) {
            let update_height = "180vh";
             this.setState({ width: update_width, height: update_height });
        } else {
            let update_height = "90vh";
            this.setState({ width: update_width, height: update_height });
        }
          this.setState({ width: update_width, height: update_height });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }


  getStyle = (props) => {
      return {
      background: "#F4F4F4",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      border: "1px dashed #BBB",
      margin: "15px auto",
      color: "#555",
      minHeight: "86vh"
    };
  };

  render() {
    if (this.props.loading === true) {
      return (
        <div style={this.getStyle()}>
          <DotLoader
            css={this.props.css}
            size={110}
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
            <Card
              to="/COORDINATES"
              primary="Matrix Coordinates"
              icon={<MyLocationTwoToneIcon style={{ fontSize: "38px" }} />}
            />
            <Card
              to="/BOOKMARKS"
              primary="Bookmarks"
              icon={<BookmarksTwoToneIcon style={{ fontSize: "38px" }} />}
            />
        </h2>
      );
    } else {
      return (
        <h2 style={this.getStyle()} height="90vh">
            <div>
              Select a connection from above to read from the PLC
            </div>
        </h2>
      );
    }
  }
}

export default DefaultTable;
