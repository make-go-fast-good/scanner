import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import Table from "./Table";
import "./css/aisle.css";

class Aisle extends Component {
  state = {
    rack: [],
    navs: [],
    aisle: [],
  };

  render() {
    return (
      <div style={getStyle}>
        <Typography variant="h5" align="center">
          Rack Location
        </Typography>
        <table className="container">
          <tbody>
            <tr>
              <td>
                <div ref="left_side">
                  <ul>
                    <li>
                      <div ref="l05" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="l04" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="l03" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="l02" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="l01" className="shelf"></div>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <div ref="left_side">
                  <ul>
                    <li>
                      <div ref="x18" className="location">
                        Z18
                      </div>
                    </li>
                    <li>
                      <div ref="x16" className="location">
                        Z16
                      </div>
                    </li>
                    <li>
                      <div ref="x14" className="location">
                        Z14
                      </div>
                    </li>
                    <li>
                      <div ref="x12" className="location">
                        Z12
                      </div>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <div ref="left_side">
                  <ul>
                    <li>
                      <div ref="x17" className="location">
                        Z17
                      </div>
                    </li>
                    <li>
                      <div ref="x15" className="location">
                        Z15
                      </div>
                    </li>
                    <li>
                      <div ref="x13" className="location">
                        Z13
                      </div>
                    </li>
                    <li>
                      <div ref="x11" className="location">
                        Z11
                      </div>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <div id="aisle_center">
                  <ul>
                    <li>
                      <span style={{ fontSize: "56px" }}>
                        &#11014;
                        <p style={{ fontSize: "20px" }}>
                          <br />
                          A i s l e
                          <br />
                          <br />
                        </p>
                        &#11014;
                      </span>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <div ref="right_side">
                  <ul>
                    <li>
                      <div ref="x27" className="location">
                        Z27
                      </div>
                    </li>
                    <li>
                      <div ref="x25" className="location">
                        Z25
                      </div>
                    </li>
                    <li>
                      <div ref="x23" className="location">
                        Z23
                      </div>
                    </li>
                    <li>
                      <div ref="x21" className="location">
                        Z21
                      </div>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <ul>
                  <li>
                    <div ref="x28" className="location">
                      Z28
                    </div>
                  </li>
                  <li>
                    <div ref="x26" className="location">
                      Z26
                    </div>
                  </li>
                  <li>
                    <div ref="x24" className="location">
                      Z24
                    </div>
                  </li>
                  <li>
                    <div ref="x22" className="location">
                      Z22
                    </div>
                  </li>
                </ul>
              </td>
              <td>
                <div ref="right_side">
                  <ul>
                    <li>
                      <div ref="r05" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="r04" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="r03" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="r02" className="shelf"></div>
                    </li>
                    <li>
                      <div ref="r01" className="shelf"></div>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={tableStyle}>
          <Table />
        </div>
      </div>
    );
  }
}

export default Aisle;

const tableStyle = {
  display: "flex",
  flex: "1",
  justifyContent: "center",
  alignItems: "center",
  // width: "75%",
  padding: "0 8em 0 8em",
  margin: "1em 0 0  0",
};

const getStyle = {
  padding: "1em 0 0 0",
  margin: "1em 0 0 0 ",
  color: "black",
};
