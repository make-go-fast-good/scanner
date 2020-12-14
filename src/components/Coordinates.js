import React, { Component } from "react";
import PARAMS from "../config/Coordinates.json";
import Nav from "./pages/Coordinates/Navettes.js";

class Location {
    constructor(val) {
        this.id = val;
        this.active = false;
    }
}

class Coordinates extends Component {

    componentDidMount() {
        this.init(PARAMS.NAVETTES, PARAMS.RACK, PARAMS.SHELF);
    }

    state = {
        rack: [],
        navs: [],
        shelf: []
    };

    init = (navs, rack, shelf) => {
        this.setState({
            navs: navs.map(_obj => {
                return new Location(_obj);
            }),
            rack: rack.map(_obj => {
                return new Location(_obj);
            }),
            shelf: shelf.map(_obj => {
                return new Location(_obj);
            })
        })
    };

    markActive = nav => {
        this.setState({
            navs: this.state.navs.map(nav => {
                if (nav.id === nav) {
                    nav.active = !nav.active;
                }
                return nav;
            })
        });
    };


    getStyle = props => {
        return {
            background: "#F4F4F4",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px dashed #BBB",
            margin: "15px auto",
            color: "#555",
            minHeight: "88vh"
        };
    };

    render() {

        return(
             <div style={this.getStyle()}>
                 <div id="one">
                 </div>
                 <div id="two">
                 </div>
                 <div id="three">
                     <Nav
                         nav={this.state.navs}
                     />
                 </div>
            </div>
        )
    }
}

export default Coordinates;
