import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class visuHex extends Component {
    state = {
        general: []
    };

    getStyle = props => {
        return {
            borderColor: "#E3E3E3",
            flexDirection: "row",
            flex: "1",
            background: "#7A8B99",
            color: "#EEE",
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            padding: "10px 10px ",
            margin: "10px 10px ",
            minHeight: "10px",
            minWidth: "200px"
        };
    };

    resStyle = props => {
        return {
            borderColor: "#E3E3E3",
            display: "flex",
            flex: "1",
            color: "#000",
            background: "#FFF",
            fontSize: "14px",
            justifyContent: "center",
            padding: "10px 10px ",
            margin: "10px 10px ",
            minHeight: "10px",
            minWidth: "100px"
        };
    };

    Text = props => (
        <div style={{ flex: 1, flexDirection: "column" }}>
            {props.string.split("").map(char => (
                <Typography>{char}</Typography>
            ))}
        </div>
    );

    render() {
        return this.props.genprop.map(_val => {
            return (
                <React.Fragment>
                    <div style={this.resStyle()}>{_val.placeholder + ""}</div>
                    <div style={this.getStyle()}>{_val.id + ""}</div>
                </React.Fragment>
            );
        });
    }
}

export default visuHex;
