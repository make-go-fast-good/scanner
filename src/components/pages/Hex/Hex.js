import React, {Component} from "react";

import HexTitle from "./HexTitle.js";
import HexVal from "./HexVal.js";
import HexImg from "./HexImg.js";
import HexDoc from "./HexPdf.js"

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
        let str = e.target.value;
        let i = 0;
        let reset = false;
        let tmpLen = 0;
        // remove whitespace from string
        str = str.replace(/\s+/g, "");

        console.log("before loop str here: \n" + str)

        do {
            if (!reset) {
                tmpLen = HEXPARAMS.GENERAL[i].len * 2
                console.log("len here: " + HEXPARAMS.GENERAL[i].len);
                console.log("str here: \n" + str)
                arr.push(str.substring(0, tmpLen));
            } else if (reset && HEXPARAMS.TT1413[i] !== undefined) {
                tmpLen = HEXPARAMS.TT1413[i].len * 2
                console.log("len here: " + HEXPARAMS.TT1413[i].len);
                console.log("str here: \n" + str)
                console.log("in 1413 heres i " + i)
                if (i !== 1) arr.push(str.substring(0, tmpLen)); // want to skip movement options 1

            }
            if (i === 4 && reset === false) {
                reset = true
                i = 0;
                continue;
            }
            i++;
        } while ((str = str.substring(tmpLen, str.length)) !== "");

        console.log("Here's your debug thanks\n");
        console.log("str here: \n" + str)
        console.log(arr);

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
                update.tt1413[index].str = tt1413.stringArr[index + 5];
                // console.log(update);
                return {update};
            });
        });
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
                        <HexPdf />
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
