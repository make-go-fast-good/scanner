import React, { Component } from "react";

class visuHex extends Component {
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
            color: "#666",
            background: "#FFF",
            fontSize: "14px",
            justifyContent: "center",
            padding: "10px 10px ",
            margin: "10px 10px ",
            minHeight: "10px",
            minWidth: "100px"
        };
    };

    genProp = gen =>
        gen.map(_val => {
            return (
                <React.Fragment>
                    <div style={this.resStyle()}>{_val.placeholder}</div>
                    <div style={this.getStyle()}>{_val.id}</div>
                </React.Fragment>
            );
        });

    render() {
        return (
            this.genProp(this.props.genProp)
        );
    }
}

export default visuHex;
