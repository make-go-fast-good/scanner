import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { css } from "@emotion/core";
import axios from "axios";
import { Container } from "./Container";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DotLoader from "react-spinners/DotLoader";

import "./pages/Coordinates/css/blockade.css"
import "./pages/Coordinates/css/sheetjs.css"
// import "./pages/Coordinates/css/w3.css"
import "../App.css";

// import "./pages/coordinates/js/main.js"
// import "./pages/coordinates/js/coordparse.js"
// import "./pages/coordinates/lib/Blob.js"
// import "./pages/coordinates/lib/canvas-datagrid.js"
// import "./pages/coordinates/lib/dropsheet.js"
// import "./pages/coordinates/lib/FileSaver.js"
// import "./pages/coordinates/lib/sheetjsw.js"
// import "./pages/coordinates/lib/shim.js"
// import "./pages/coordinates/lib/spin.js"
// import "./pages/coordinates/lib/xlsx.full.min.js"

class Coordinates extends Component {

  componentDidMount(){
      // this.getData();
  }

  state = {
    loading: false,
    error: undefined,
    data: undefined
  };

  // Select Connection
  // getData = (area) => {
  //   this.setState({ loading: true});
  //   axios
  //     .get("http://localhost:8080/COORDINATES")
  //     .then((res) => {
  //       this.setState({
  //             loading: false,
  //             data: res.data,
  //           });
  //       console.log("res.data");
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({
  //         loading: false,
  //         error: "Connection Error: Verify server is running.",
  //       });
  //     });
  // };

  getStyle = (props) => {
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

     return (
            <div style={this.getStyle()}>
                {/* <div class= "w3-center" style={{width: "100%"}}> */}
                {/*     <div  class="w3-third w3-container w3-mobile "> */}
                {/*         <h4 class="w3-left!important">Single Coordinate Check:</h4> */}
                {/*     </div> */}
                {/*     <div  class="w3-third w3-container w3-mobile"> */}
                {/*         <h4>Rack Location</h4> */}
                {/*     </div> */}
                {/*     <div  class="w3-third w3-container w3-mobile"> */}
                {/*         <h4>Navette Location</h4> */}
                {/*     </div> */}
                {/* </div> */}
            <div id="one" class="w3-third w3-container w3-mobile" style={{marginBottom: "auto"}}>
                <div class="w3-container w3-margin-left">
                    <h4>Single Coordinate Check:</h4>
                    <input type="text" name="filename" value="" id="inputText" style={{width: "auto"}}></input>
                    <h4>Message:</h4>
                    <input type="text" name="filename" value="" id="resultText" style={{width: "auto"}} readonly></input>
                    <input type="button" style={{display: "block"}} class="smbutton w3-margin-top" id="ParseButton" value="Check Coordinate" onclick="
                        parseData()"></input>
                    <h4 class="w3-margin-top">Select Blockade Checklist File:</h4>
                    <input class="file" id='file' type="file"></input>
                    <h4>Filename:</h4>
                        <input type="text" class="filename" value="" id="wbName" style={{width: "auto"}}></input>
                        <input type="button" style={{display: "block"}} class="smbutton w3-margin-top" id="save" value="Save Blockade Checklist"></input>
                    <label for="file"></label>
                    <div id="buttons"></div>
                </div>
            </div>
            <div id="two" class="w3-third w3-container w3-mobile w3-center container" style={{marginBottom: "auto"}}>
                <div class="">
                    <h4 class="w3-center">Rack Location</h4>
                    <table class="w3-container container">
                        <tr>
                            <td>
                                <div id="left_side">
                                    <ul>
                                        <li>
                                            <div id="l05" class="shelf"></div></li>
                                        <li>
                                            <div id="l04" class="shelf"></div></li>
                                        <li>
                                            <div id="l03" class="shelf"></div></li>
                                        <li>
                                            <div id="l02" class="shelf"></div></li>
                                        <li>
                                            <div id="l01" class="shelf"></div></li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div id="left_side">
                                    <ul>
                                        <li>
                                            <div id="x18" class="location">Z18</div></li>
                                        <li>
                                            <div id="x16" class="location">Z16</div></li>
                                        <li>
                                            <div id="x14" class="location">Z14</div></li>
                                        <li>
                                            <div id="x12" class="location">Z12</div></li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div id="left_side">
                                    <ul>
                                        <li>
                                            <div id="x17" class="location">Z17</div></li>
                                        <li>
                                            <div id="x15" class="location">Z15</div></li>
                                        <li>
                                            <div id="x13" class="location">Z13</div></li>
                                        <li>
                                            <div id="x11" class="location">Z11</div></li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div id="aisle_center">
                                    <ul>
                                        <li>
                                            <span style={{fontSize:"3em"}}>&#8679;</span> <br />
                                            <p id="aisle">Aisle</p>
                                            <span style={{fontSize:"3em"}}>&#8679;</span> <br />
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div id="right_side">
                                    <ul>
                                        <li>
                                            <div id="x27" class="location">Z27</div></li>
                                        <li>
                                            <div id="x25" class="location">Z25</div></li>
                                        <li>
                                            <div id="x23" class="location">Z23</div></li>
                                        <li>
                                            <div id="x21" class="location">Z21</div></li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div id="right_side">
                                  <ul>
                                      <li>
                                          <div id="x28" class="location">Z28</div></li>
                                      <li>
                                          <div id="x26" class="location">Z26</div></li>
                                      <li>
                                          <div id="x24" class="location">Z24</div></li>
                                      <li>
                                          <div id="x22" class="location">Z22</div></li>
                                  </ul>
                                </div>
                            </td>
                            <td>
                                <div id="right_side">
                                    <ul>
                                        <li>
                                            <div id="r05" class="shelf"></div></li>
                                        <li>
                                            <div id="r04" class="shelf"></div></li>
                                        <li>
                                            <div id="r03" class="shelf"></div></li>
                                        <li>
                                            <div id="r02" class="shelf"></div></li>
                                        <li>
                                            <div id="r01" class="shelf"></div></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <table class="w3-container w3-center container w3-table-all w3-small">
                        <thead>
                            <tr class="w3-white">
                                <td>Field: </td>
                                <td id="ftable"></td>
                            </tr>
                        </thead>
                        <tr>
                            <td>X coordinate: </td>
                            <td id="xtable"></td>
                        </tr>
                        <tr>
                            <td>Y coordinate: </td>
                            <td id="ytable"></td>
                        </tr>
                        <tr>
                            <td>Z coordinate: </td>
                            <td id="ztable"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="three" class="w3-third w3-container w3-mobile w3-center container" style={{marginBottom: "auto"}}>
                <div class="">
                    <h4 class="w3-center">Navette Location</h4>
                    <table class="w3-container container">
                        <tr>
                            <td id="6214" rowspan="2" class="navette_shut"><div>6<br />2<br />1<br />4</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="6114" rowspan="2" class="navette_shut"><div>6<br />1<br />1<br />4</div></td>
                            <td id="5214" rowspan="2" class="navette_shut"><div>5<br />2<br />1<br />4</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="5114" rowspan="2" class="navette_shut"><div>5<br />1<br />1<br />4</div></td>
                            <td id="4214" rowspan="2" class="navette_shut"><div>4<br />2<br />1<br />4</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="4114" rowspan="2" class="navette_shut"><div>4<br />1<br />1<br />4</div></td>
                            <td id="3214" rowspan="2" class="navette_shut"><div>3<br />2<br />1<br />4</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="3114" rowspan="2" class="navette_shut"><div>3<br />1<br />1<br />4</div></td>
                            <td id="2214" rowspan="2" class="navette_shut"><div>2<br />2<br />1<br />4</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="2114" rowspan="2" class="navette_shut"><div>2<br />1<br />1<br />4</div></td>
                            <td id="1214" rowspan="2" class="navette_shut"><div>1<br />2<br />1<br />4</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="1114" rowspan="2" class="navette_shut"><div>1<br />1<br />1<br />4</div></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td id="6213" rowspan="2" class="navette_shut"><div>6<br />2<br />1<br />3</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="6113" rowspan="2" class="navette_shut"><div>6<br />1<br />1<br />3</div></td>
                            <td id="5213" rowspan="2" class="navette_shut"><div>5<br />2<br />1<br />3</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="5113" rowspan="2" class="navette_shut"><div>5<br />1<br />1<br />3</div></td>
                            <td id="4213" rowspan="2" class="navette_shut"><div>4<br />2<br />1<br />3</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="4113" rowspan="2" class="navette_shut"><div>4<br />1<br />1<br />3</div></td>
                            <td id="3213" rowspan="2" class="navette_shut"><div>3<br />2<br />1<br />3</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="3113" rowspan="2" class="navette_shut"><div>3<br />1<br />1<br />3</div></td>
                            <td id="2213" rowspan="2" class="navette_shut"><div>2<br />2<br />1<br />3</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="2113" rowspan="2" class="navette_shut"><div>2<br />1<br />1<br />3</div></td>
                            <td id="1213" rowspan="2" class="navette_shut"><div>1<br />2<br />1<br />3</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="1113" rowspan="2" class="navette_shut"><div>1<br />1<br />1<br />3</div></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td id="6212" rowspan="2" class="navette_shut"><div>6<br />2<br />1<br />2</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="6112" rowspan="2" class="navette_shut"><div>6<br />1<br />1<br />2</div></td>
                            <td id="5212" rowspan="2" class="navette_shut"><div>5<br />2<br />1<br />2</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="5112" rowspan="2" class="navette_shut"><div>5<br />1<br />1<br />2</div></td>
                            <td id="4212" rowspan="2" class="navette_shut"><div>4<br />2<br />1<br />2</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="4112" rowspan="2" class="navette_shut"><div>4<br />1<br />1<br />2</div></td>
                            <td id="3212" rowspan="2" class="navette_shut"><div>3<br />2<br />1<br />2</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="3112" rowspan="2" class="navette_shut"><div>3<br />1<br />1<br />2</div></td>
                            <td id="2212" rowspan="2" class="navette_shut"><div>2<br />2<br />1<br />2</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="2112" rowspan="2" class="navette_shut"><div>2<br />1<br />1<br />2</div></td>
                            <td id="1212" rowspan="2" class="navette_shut"><div>1<br />2<br />1<br />2</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="1112" rowspan="2" class="navette_shut"><div>1<br />1<br />1<br />2</div></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td id="6211" rowspan="2" class="navette_shut"><div>6<br />2<br />1<br />1</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="6111" rowspan="2" class="navette_shut"><div>6<br />1<br />1<br />1</div></td>
                            <td id="5211" rowspan="2" class="navette_shut"><div>5<br />2<br />1<br />1</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="5111" rowspan="2" class="navette_shut"><div>5<br />1<br />1<br />1</div></td>
                            <td id="4211" rowspan="2" class="navette_shut"><div>4<br />2<br />1<br />1</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="4111" rowspan="2" class="navette_shut"><div>4<br />1<br />1<br />1</div></td>
                            <td id="3211" rowspan="2" class="navette_shut"><div>3<br />2<br />1<br />1</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="3111" rowspan="2" class="navette_shut"><div>3<br />1<br />1<br />1</div></td>
                            <td id="2211" rowspan="2" class="navette_shut"><div>2<br />2<br />1<br />1</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="2111" rowspan="2" class="navette_shut"><div>2<br />1<br />1<br />1</div></td>
                            <td id="1211" rowspan="2" class="navette_shut"><div>1<br />2<br />1<br />1</div></td>
                            <td id="" class="invisible_td"><a></a></td>
                            <td id="1111" rowspan="2" class="navette_shut"><div>1<br />1<br />1<br />1</div></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="w3-container w3-center w3-margin">
                <h4>Blockade Checklist</h4>
                <h2>
                    <div id="drop">Drop file here.</div>
                </h2>
                <div class="container" id="grid"></div>
    </div>


            </div>
      );
    }
}

export default Coordinates;
