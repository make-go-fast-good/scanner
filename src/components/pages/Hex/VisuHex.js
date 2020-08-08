import React, { Component } from "react";

class visuHex extends Component {
    getStyle = props => {
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

    render() {
        return this.props.strProp.map((_str) => {
            // console.log(_str);
            return (
                <div id={_str.id} style={this.getStyle()}>
                    { parseInt("0x" + _str.str) ||_str.placeholder}
                </div>
            );
        });
    }
}

export default visuHex;
