import React, { Component } from "react";

import Params from "../../../config/VisuHex.json";
import VisuTitle from "./VisuTitle.js";
import VisuHex from "./VisuHex.js";
import VisuImg from "./VisuImg.js";

class Location {
    constructor(val) {
        this.id = val.id;
        this.title = val.title;
        this.placeholder = "0x00";
        this.str = "";
    }
}

class Image {
    constructor(val) {
        this.img = val[0];
        this.title = val[1];
    }
}

class Hex extends Component {
    componentDidMount() {
        this.init(Params);
    }

    state = {
        string: "",
        stringArr: [],
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
            }),
            stringArr: this.state.general.placeholder
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

        // this.state.stringArr.map((_val, index) => {
        //     this.setState({ [this.state.general[index].str]: _val[index] });
        // });
    };

    onChange = e => {
        let tmp = [];
        let str = e.target.value;
        // remove whitespace from string
        str = str.replace(/\s+/g, "");

        do {
            tmp.push(str.substring(0, 2));
        } while ((str = str.substring(2, str.length)) !== "");

        this.setState({ [e.target.name]: e.target.value });
        this.setState({ stringArr: tmp });
        this.setState(general => {
            general.general.map((_obj, index) => {
                let update = Object.assign({}, general); // creating copy of state variable general
                update.general[index].str = general.stringArr[index]; // update the name property, assign a new value
                // console.log(update);
                return { update };
            });
        });
    };

    render() {
        return (
            <React.Fragment>
                {/* <div style={{ margin: "5px", padding: "5px" }}> Visu Parser</div> */}
                {/*  */}
                <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
                    <input
                        type="text"
                        name="string"
                        placeholder="Visu Hex string here..."
                        style={{ flex: "10", padding: "5px" }}
                        value={this.state.string}
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
                        <VisuTitle genProp={this.state.general} />
                    </div>
                    <div>
                        <VisuHex strProp={this.state.general} />
                    </div>
                    <div>
                        <VisuImg imgProp={this.state.image} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Hex;
