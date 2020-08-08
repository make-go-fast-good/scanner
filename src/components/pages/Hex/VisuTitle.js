import React, { Component } from "react";

class visuTitle extends Component {
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

    genProp = gen =>
        gen.map(_val => {
            // console.log(_val);
            return (
                <div>
                    <div style={this.getStyle()}>{_val.title}</div>
                </div>
            );
        });

    render() {
        return this.genProp(this.props.genProp);
    }
}

export default visuTitle;
