import React, {Component} from "react";

import HexTitle from "./HexTitle.js";
import HexVal from "./HexVal.js";
import HexImg from "./HexImg.js";
import HexDoc from "./HexPdf.js";

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

    onChange = (e) => {
        let arr = [];
        let str = e.target.value;
        let i = 0;
        let reset = false;
        let tmpLen = 0;
        // remove whitespace from string
        str = str.replace(/\s+/g, "");

        do {
            if (!reset) {
                tmpLen = HEXPARAMS.GENERAL[i].len * 2;
                arr.push(str.substring(0, tmpLen));
            } else if (reset && HEXPARAMS.TT1413[i] !== undefined) {
                tmpLen = HEXPARAMS.TT1413[i].len * 2;
                if (tmpLen === 40) {
                    var hexBarcode = str.toString();
                    let tmpBarcode = "";
                    for (var n = 0; n < hexBarcode.length; n += 2) {
                        tmpBarcode += String.fromCharCode(parseInt(hexBarcode.substr(n, 2), 16));
                        str = tmpBarcode
                    }
                    str = str.substring(0, 9)
                    console.log("should be charcode");
                    console.log(str);
                }
                arr.push(str.substring(0, tmpLen));
            }
            if (i === 4 && reset === false) {
                reset = true;
                i = 0;
                continue;
            }
            i++;
        } while ((str = str.substring(tmpLen, str.length)) !== "");

        console.log("Here's your debug thanks\n");
        console.log("str here: \n" + str);
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
                        style={{flex: "12", padding: "5px"}}
                        value={this.state.string}
                        onChange={this.onChange}
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
                    {/* <div> */}
                    {/*     <HexDoc /> */}
                    {/* </div> */}
                    <div>
                        <HexImg imgProp={this.state.image} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Hex;
