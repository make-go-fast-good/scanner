import React, {Component} from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Card from "./Card";

import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import ScannerTwoToneIcon from "@material-ui/icons/ScannerTwoTone";
import BookmarksTwoToneIcon from "@material-ui/icons/BookmarksTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import FlightTakeoffTwoToneIcon from "@material-ui/icons/FlightTakeoffTwoTone";

export class DefaultTable extends Component {
    getStyle = () => {
        return {
            background: "#F4F4F4",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px dashed #BBB",
            margin: "15px auto",
            color: "#555",
            minHeight: "83vh"
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
                <h2 style={this.getStyle()}>
                    <Card
                        to="/TT13"
                        primary="TT13 Data"
                        icon={<EmailTwoToneIcon style={{fontSize: "38px"}} />}
                    />
                    <Card
                        to="/SCANNERS"
                        primary="Scanner Data"
                        icon={
                            <ScannerTwoToneIcon style={{fontSize: "38px"}} />
                        }
                    />
                    <Card
                        to="/ERROR"
                        primary="Error Log"
                        icon={<ErrorTwoToneIcon style={{fontSize: "38px"}} />}
                    />
                    {/* <Card */}
                    {/*   to="/COORDINATES" */}
                    {/*   primary="Matrix Coordinates" */}
                    {/*   icon={<MyLocationTwoToneIcon style={{ fontSize: "38px" }} />} */}
                    {/* /> */}
                    <Card
                        to="/BOOKMARKS"
                        primary="Bookmarks"
                        icon={
                            <BookmarksTwoToneIcon
                                style={{fontSize: "38px"}}
                            />
                        }
                    />
                    <Card
                        to="/HEX"
                        primary="Matrix Hex parser"
                        icon={
                            <SearchTwoToneIcon
                                style={{fontSize: "38px"}}
                            />
                        }
                    />
                </h2>
            );
        } else {
            return (
                <h2 style={this.getStyle()}>
                    <div>
                        Select a connection from above to read from the PLC
                    </div>
                </h2>
            );
        }
    }
}

export default DefaultTable;
