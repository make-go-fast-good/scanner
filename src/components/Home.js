import React, {Component} from "react";

import PropagateLoader from "react-spinners/PropagateLoader";

// import BookmarksTwoToneIcon from "@material-ui/icons/BookmarksTwoTone";
// import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
// import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
// import ScannerTwoToneIcon from "@material-ui/icons/ScannerTwoTone";
// import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
// import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import Card from "./Card";

export class Home extends Component {
  getStyle = (props) => {
    return {
      background: "#F4F4F4",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      border: "1px dashed #BBB",
      margin: "5px auto",
      color: "#555",
      minHeight: props || "85vh",
    };
  };

  render() {
    if (this.props.loading === true) {
      return (
        <div style={this.getStyle()}>
          <PropagateLoader
            css={this.props.css}
            size={35}
            color={"#D2D2D2"}
            loading={this.props.loading}
          />
        </div>
      );
    } else if (this.props.error !== undefined) {
      return <h2 style={this.getStyle()}>{this.props.error}</h2>;
    } else if (this.props.home === true) {
      return (
        <h2 style={this.getStyle("89.5vh")}>
          <Card
            to="/aglink"
            primary="AG-Link"
            // icon={<EmailTwoToneIcon style={{ fontSize: "38px" }} />}
            icon={<FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "38px" }} />}
          />
          <Card
            to="/scanners"
            primary="Scanner Data"
            icon={<FontAwesomeIcon icon={faBarcode} style={{ fontSize: "38px" }} />}
          />
          <Card
            to="/bookmarks"
            primary="Bookmarks"
            // icon={<BookmarksTwoToneIcon style={{ fontSize: "38px" }} />}
            icon={<FontAwesomeIcon icon={faBookmark} style={{ fontSize: "38px" }} />}
          />
          <Card
            to="/blockade"
            primary="Blockade Checklist"
            // icon={<CheckCircleTwoToneIcon style={{ fontSize: "38px" }} />}
            icon={<FontAwesomeIcon icon={faTasks} style={{ fontSize: "38px" }} />}
          />
          <Card
            to="/error"
            primary="PLC Error Log"
            icon={<FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: "38px" }} />}
          />
          <Card
            to="/hex"
            primary="Matrix Hex parser"
            // icon={<FindInPageTwoToneIcon style={{ fontSize: "38px" }} />}
            icon={<FontAwesomeIcon icon={faRetweet} style={{ fontSize: "38px" }} />}
          />
        </h2>
      );
    } else {
      return (
        <h2 style={this.getStyle()}>
          <div>Select a connection from above to read from the PLC</div>
        </h2>
      );
    }
  }
}

export default Home;
