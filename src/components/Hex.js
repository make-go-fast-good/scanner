import React, { Component } from "react";
import ModalImage from "react-modal-image";

import Params from "../config/VisuHex.json";
import gen from "./pages/Hex/img/general.png";
import Visu from "./VisuHex.js";
import MFS from "./MFSHex.js";

//import "./pages/Coordinates/css/blockade.css";

//import "../App.css";

class Location {
    constructor(val) {
        this.id = val;
        this.placeholder = "0x00";
    }
}

class Coordinates extends Component {
    componentDidMount() {
        this.init(Params.general);
    }

    state = {
        title: "",
        general: []
    };

    init = val => {
        this.setState({
            general: val.map(_obj => {
                return new Location(_obj);
            })
        });
    };

    imgStyle = props => {
        return {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            flex: "1",
            justifyContent: "space-evenly",
            borderColor: "#E3E3E3",
            background: "#7A8B99",
            color: "#EEE",
            fontSize: "14px",
            alignItems: "center",
            padding: "10px 10px ",
            margin: "20px 10px ",
            minHeight: "10px",
            minWidth: "200px"
        };
    };

    getStyle = props => {
        return {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            flex: "1",
            justifyContent: "space-evenly",
            alignItems: "center",
            background: "#F4F4F4",
            border: "1px dashed #BBB",
            margin: "15px auto",
            padding: "15px auto",
            color: "#555",
            minHeight: "81vh"
        };
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: "" });
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <React.Fragment>
                <div> Visu Parser</div>
                <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Visu Hex string here..."
                        style={{ flex: "10", padding: "5px" }}
                        TodoItem
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn"
                        style={{ flex: "1" }}
                    />
                </form>
                <div style={this.getStyle()}>
                    <div>
                        <Visu
                            style={{
                                display: "flex",
                                flex: "1",
                                flexDirection: "row"
                            }}
                            genprop={this.state.general}
                        />
                    </div>
                    <div >
                        <div style={this.imgStyle()}>
                            <ModalImage
                                large={gen}
                                alt="TT0751 General Structure"
                            />
                        </div>
                        <div style={this.imgStyle()}>
                        <ModalImage
                            large={gen}
                            alt="TT0751 General Structure"
                        />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Coordinates;
