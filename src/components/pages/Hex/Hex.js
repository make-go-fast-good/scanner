import React, { Component } from "react";

import Params from "../../../config/VisuHex.json";
import VisuHex from "./VisuHex.js";
import VisuImg from "./VisuImg.js";

class Location {
    constructor(val) {
        this.id = val;
        this.placeholder = "0x00";
    }
}

class Image {
    constructor(val) {
        console.log(val);
        this.img = val[0];
        this.txt = val[1];
    }
}

class Coordinates extends Component {
    componentDidMount() {
        this.init(Params);
    }

    state = {
        title: "",
        general: [],
        image: []
    };

    init = val => {
        this.setState({
            general: val.GENERAL.map(_obj => {
                return new Location(_obj);
            }),
            image: val.IMAGE.map(_obj => {
                return new Image(_obj);
            })
        });
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
                {/* <div style={{ margin: "5px", padding: "5px" }}> Visu Parser</div> */}
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
                        <VisuHex genProp={this.state.general} />
                    </div>
                    <div>
                        <VisuImg imgProp={this.state.image} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Coordinates;
