import React, {Component} from "react";

import HexTitle from "./HexTitle.js";
import HexVal from "./HexVal.js";
import HexImg from "./HexImg.js";

import HEXPARAMS from "../../../config/HexVal.json";

class General {
    constructor(val) {
        this.id = val.id;
        this.len = val.len;
        this.title = val.title;
        this.placeholder = "0x00";
        this.str = "";
    }
}

class TT1413 {
    constructor(val) {
        this.id = val.id;
        this.len = val.len;
        this.title = val.title;
        this.placeholder = "0x00";
        this.str = "";
    }
}

class TT1434 {
    constructor(val) {
        this.id = val.id;
        this.len = val.len;
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
        this.init(HEXPARAMS);
    }

    state = {
        stringArr: [],
        general: [],
        tt1413: [],
        tt1434: [],
        image: [],
    };

    init = (val) => {
        this.setState({
            general: val.GENERAL.map((_obj) => {
                return new General(_obj);
            }),
            image: val.IMAGE.map((_obj) => {
                return new Image(_obj);
            }),
            tt1413: val.TT1413.map((_obj) => {
                return new TT1413(_obj);
            }),
            tt1434: val.TT1434.map((_obj) => {
                return new TT1434(_obj);
            }),

            stringArr: this.state.general.placeholder,
        });
    };

    getStyle = (props) => {
        return {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            flex: "1",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            background: "#F4F4F4",
            border: "1px dashed #BBB",
            margin: "15px auto",
            padding: "15px auto",
            color: "#555",
            minHeight: "81vh",
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
    };

    onChange = (e) => {
        let arr = [];
        let debug = [];
        let str = e.target.value;
        // remove whitespace from string
        str = str.replace(/\s+/g, "");

        let i = 0;
        let tmp = this.state.general[i];
        do {
            tmp = this.state.general[i];
            if (tmp !== undefined) {
                console.log(tmp);
                console.log(tmp.len);
                arr.push(str.substring(0, (parseInt(tmp.len) * 2)));
                debug.push(parseInt(str.substring(0, 4), 16));
            }
            i++
        } while ((str = str.substring(4, str.length)) !== "");

        // for (; (str = str.substring(4, str.length) !== "");) {
        //     arr.push(str.substring(0, 4));
        //     debug.push(parseInt(str.substring(0, 4), 16));
        //     i++;
        //     // idx += this.state.general[i].len
        //     console.log(str);
        // }
        console.log("Here's your debug thanks\n");
        console.log(arr);
        console.log(debug);

        this.setState({[e.target.name]: e.target.value});

        this.setState({stringArr: arr});

        this.setState((general) => {
            general.general.map((_obj, index) => {
                // creating copy of state variable general
                let update = Object.assign({}, general);
                // update the name property, assign a new value
                update.general[index].str = general.stringArr[index];
                // console.log(update);
                return {update};
            });
        });

        this.setState((tt1413) => {
            tt1413.tt1413.map((_obj, index) => {
                // creating copy of state variable general
                let update = Object.assign({}, tt1413);
                // update the name property, assign a new value
                update.tt1413[index].str = tt1413.stringArr[index + 7];
                // console.log(update);
                return {update};
            });
        });

        console.log("after while");
        console.log(this.state);
    };

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit} style={{display: "flex"}}>
                    <input
                        type="text"
                        name="string"
                        placeholder="Parse Hex string here..."
                        style={{flex: "10", padding: "5px"}}
                        value={this.state.string}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn"
                        style={{flex: "1"}}
                    />
                </form>
                <div style={this.getStyle()}>
                    <div>
                        <HexTitle genProp={this.state.general} />
                        <HexTitle genProp={this.state.tt1413} />
                    </div>
                    <div>
                        <HexVal strProp={this.state.general} />
                        <HexVal strProp={this.state.tt1413} />
                    </div>
                    <div>
                        <HexImg imgProp={this.state.image} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Hex;
