import React, { Component } from "react";
import ModalImage from "react-modal-image";

class visuImg extends Component {
    imgStyle = props => {
        return {
            borderColor: "#E3E3E3",
            borderRadius: "5px",
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

    render() {
        return this.props.imgProp.map(_val => {
            return (
                <div style={this.imgStyle()}>
                    <ModalImage
                        large={_val.img}
                        alt={_val.txt}
                        hideDownload="true"
                    />
                </div>
            );
        });
    }
}

export default visuImg;
