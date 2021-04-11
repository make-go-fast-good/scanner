import React, { Component } from "react";

import HexTitle from "./HexTitle.js";
import HexVal from "./HexVal.js";
import HexDoc from "./HexPdf.tsx";

import HEXPARAMS from "../../../config/hex/HexVal.json";

import pdf1413 from "./assets/TT1413.pdf";
import pdf1430 from "./assets/TT1430.pdf";
import pdf1434 from "./assets/TT1434.pdf";
import pdf750 from "./assets/TT750.pdf";
import pdf751 from "./assets/TT751.pdf";

class General {
  constructor(val) {
    this.id = val.id;
    this.len = val.len;
    this.title = val.title;
    this.placeholder = "0x00";
    this.str = "";
  }
}

class TT750_1 {
  constructor(val) {
    this.id = val.id;
    this.len = val.len;
    this.title = val.title;
    this.placeholder = "0x00";
    this.str = "";
  }
}

class TT750_2 {
  constructor(val) {
    this.id = val.id;
    this.len = val.len;
    this.title = val.title;
    this.placeholder = "0x00";
    this.str = "";
  }
}

class TT750_5 {
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

class TT1430 {
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

class Hex extends Component {
  componentDidMount() {
    this.init(HEXPARAMS);
  }

  state = {
    general: [],
    tt750_1: [],
    tt750_2: [],
    tt750_5: [],
    tt1413: [],
    tt1430: [],
    tt1434: [],
    stringArr: [],
  };

  getStyle = (props) => {
    return {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "flex-start",
      background: "#F4F4F4",
      border: "1px dashed #BBB",
      margin: "15px auto",
      padding: "15px auto",
      color: "#555",
      height: "83vh",
      overflowY: "scroll",
    };
  };

  init = (val) => {
    // console.log(val)
    this.setState({
      general: val.GENERAL.map((_obj) => {
        return new General(_obj);
      }),
      tt750_1: val.TT750_1.map((_obj) => {
        return new TT750_1(_obj);
      }),
      tt750_2: val.TT750_2.map((_obj) => {
        return new TT750_2(_obj);
      }),
      tt750_5: val.TT750_5.map((_obj) => {
        return new TT750_5(_obj);
      }),
      tt1413: val.TT1413.map((_obj) => {
        return new TT1413(_obj);
      }),
      tt1430: val.TT1430.map((_obj) => {
        return new TT1430(_obj);
      }),
      tt1434: val.TT1434.map((_obj) => {
        return new TT1434(_obj);
      }),

      stringArr: this.state.general.placeholder,
    });
    console.log(this.state);
  };

  onChange = (e) => {
    let arr = [];
    let str = e.target.value;
    let i = 0;
    let reset = false;
    let tmpLen = 0;

    // remove MFS key from string
    str = str.replace("MFS SRM1:", "");
    // remove whitespace from string
    str = str.replace(/\s+/g, "");

    do {
      if (!reset) {
        tmpLen = HEXPARAMS.GENERAL[i].len * 2;
        arr.push(str.substring(0, tmpLen));
      } else if (
        reset &&
        HEXPARAMS["TT" + parseInt(arr[2], 16)][i] !== undefined
      ) {
        console.log("telegram type should be here: " + parseInt(arr[2], 16));
        console.log("TT" + parseInt(arr[2], 16));
        tmpLen = HEXPARAMS["TT" + parseInt(arr[2], 16)][i].len * 2;
        if (tmpLen === 40) {
          var hexBarcode = str.toString();
          let tmpBarcode = "";
          for (var n = 0; n < hexBarcode.length; n += 2) {
            tmpBarcode += String.fromCharCode(
              parseInt(hexBarcode.substr(n, 2), 16)
            );
            str = tmpBarcode;
          }
          str = str.substring(0, 9);
          // console.log("should be charcode");
          // console.log(str);
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

    // console.log("Here's your debug thanks\n");
    // console.log("str here: \n" + str);
    // console.log(arr);

    this.setState({
      [e.target.name]: e.target.value,
      stringArr: arr,
    });

    this.setState((general) => {
      general.general.map((_obj, index) => {
        // creating copy of state variable general
        let update = Object.assign({}, general);
        // update the name property, assign a new value
        update.general[index].str = general.stringArr[index];
        // console.log(update);
        return { update };
      });
    });

    if (arr[2].length > 1) {
      let tmpTT = parseInt(arr[2], 16);
      let targetState = "";
      // console.log(tmpTT)

      switch (tmpTT) {
        case 750:
          // console.log("yes 750");
          break;
        case 751:
          // console.log("yes 751");
          break;
        case 1413:
          // console.log("yes 1413");
          targetState = "tt1413";
          this.setState((targetState) => {
            targetState.tt1413.map((_obj, index) => {
              // creating copy of state variable general
              let update = Object.assign({}, targetState);
              // update the name property, assign a new value
              update.tt1413[index].str = targetState.stringArr[index + 5];
              // console.log(update);
              return { update };
            });
          });
          break;
        case 1430:
          console.log("yes 1430");
          break;
        case 1434:
          console.log("yes 1434");
          targetState = "tt1434";
          this.setState((targetState) => {
            targetState.tt1434.map((_obj, index) => {
              // creating copy of state variable general
              let update = Object.assign({}, targetState);
              // update the name property, assign a new value
              update.tt1434[index].str = targetState.stringArr[index + 5];
              // console.log(update);
              return { update };
            });
          });
          break;
        default:
          console.log("no");
      }
    }

    // console.log("from Onchange")
    console.log(this.state);
    // console.log(arr)
  };

  myBody = (val) => {
    if (val.length > 1 && parseInt(val[2].str, 16) > 0)
      console.log(parseInt(val[2].str, 16));
    return;
  };

  render() {
    if (this.state.string) {
      // this.state.general[2].str is hex val of telegram type, convert to int
      console.log(this.state["tt" + parseInt(this.state.general[2].str, 16)]);
      return (
        <React.Fragment>
          {this.myBody(this.state.general)}
          <form style={{ display: "flex" }}>
            <input
              type="text"
              name="string"
              placeholder="Paste Hex string here..."
              style={{ flex: "12", padding: "5px" }}
              value={this.state.string}
              onChange={this.onChange}
            />
          </form>
          <div style={this.getStyle()}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  fontSize: "24px",
                }}
              >
                Field
              </div>
              <HexTitle genProp={this.state.general} />
              <HexTitle
                genProp={
                  this.state["tt" + parseInt(this.state.general[2].str, 16)]
                }
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  fontSize: "24px",
                }}
              >
                Value
              </div>
              <HexVal strProp={this.state.general} />
              <HexVal
                strProp={
                  this.state["tt" + parseInt(this.state.general[2].str, 16)]
                }
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  fontSize: "24px",
                }}
              >
                Documentation
              </div>
              <HexDoc myTitle="TT1413" fileUrl={pdf1413} />
              <HexDoc myTitle="TT1430" fileUrl={pdf1430} />
              <HexDoc myTitle="TT1434" fileUrl={pdf1434} />
              {/* <HexDoc myTitle="TT750" fileUrl={pdf750} /> */}
              {/* <HexDoc myTitle="TT751" fileUrl={pdf751} /> */}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {this.myBody(this.state.general)}
          <form style={{ display: "flex" }}>
            <input
              type="text"
              name="string"
              placeholder="Paste Hex string here..."
              style={{ flex: "12", padding: "5px" }}
              value={this.state.string}
              onChange={this.onChange}
            />
          </form>
          <div style={this.getStyle()}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  fontSize: "24px",
                }}
              >
                Field
              </div>
              <HexTitle genProp={this.state.general} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  fontSize: "24px",
                }}
              >
                Value
              </div>
              <HexVal strProp={this.state.general} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  fontSize: "24px",
                }}
              >
                Documentation
              </div>
              <HexDoc myTitle="TT1413" fileUrl={pdf1413} />
              <HexDoc myTitle="TT1430" fileUrl={pdf1430} />
              <HexDoc myTitle="TT1434" fileUrl={pdf1434} />
              {/* <HexDoc myTitle="TT750" fileUrl={pdf750} /> */}
              {/* <HexDoc myTitle="TT751" fileUrl={pdf751} /> */}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Hex;
