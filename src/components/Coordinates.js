import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { css } from "@emotion/core";

import { Container } from "./Container";

import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2
} from "react-html-parser";

import DotLoader from "react-spinners/DotLoader";

import "./pages/Coordinates/css/blockade.css";
import "../App.css";

class Location {
    constructor(val) {
        this.id = val;
        this.active = false;
    }
}

class Coordinates extends Component {

    componentDidMount() {
        this.init(this.NAVETTES, this.RACK, this.SHELF);
    }

    state = {
        rack: [],
        navs: [],
        shelf: []
    };

    NAVETTES = [
        1111,
        1112,
        1113,
        1114,
        1211,
        1212,
        1213,
        1214,
        2111,
        2112,
        2113,
        2114,
        2211,
        2212,
        2213,
        2214,
        3111,
        3112,
        3113,
        3114,
        3211,
        3212,
        3213,
        3214,
        4111,
        4112,
        4113,
        4114,
        4211,
        4212,
        4213,
        4214,
        5111,
        5112,
        5113,
        5114,
        5211,
        5212,
        5213,
        5214,
        6111,
        6112,
        6113,
        6114,
        6211,
        6212,
        6213,
        6214
    ];

    xValues = [
        0,
        2880,
        5760,
        8640,
        11520,
        14400,
        17280,
        20160,
        23040,
        25920,
        28800,
        31680,
        34560,
        37440,
        40320,
        43200,
        46080,
        48960,
        51840,
        54720,
        57600,
        60480,
        63360,
        66240,
        69120,
        72000,
        74880,
        77760,
        80640,
        83520,
        86400,
        89280,
        92160,
        95040,
        97920,
        100800,
        103680,
        106560,
        109440,
        112320,
        115200
    ];

    RACK = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];

    HEIGHT = ["01", "02", "03", "04", "05"];

    SHELF = [
        "l01",
        "l02",
        "l03",
        "l04",
        "l05",
        "r01",
        "r02",
        "r03",
        "r04",
        "r05"
    ];

    TRANSFERS = {
        pos1: {
            min: 40320,
            max: 43140
        },
        pos2: {
            min: 46080,
            max: 48900
        },
        pos3: {
            min: 60480,
            max: 63300
        },
        pos4: {
            min: 66240,
            max: 69060
        }
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
        const override = css`
            margin: 300px 50%;
            display: block;
            border-color: #d2d2d2;
        `;

        return <div style={this.getStyle()}></div>;
    }
}

export default Coordinates;
