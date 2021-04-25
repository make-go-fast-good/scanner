import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import "./css/navettes.css";

class Navettes extends Component {
  state = {
    rack: [],
    navs: [],
    aisle: [],
  };

  render() {
    return (
      <div style={getStyle}>
        <Typography variant="h5" align="center">
          Navette Location
        </Typography>
        <table style={navStyle}>
          <tbody>
            <tr>
              <td ref="6214" className="navette_shut">
                6{"\n"}2{"\n"}1{"\n"}4
              </td>
              <td className="invisible_td"></td>
              <td ref="6114" className="navette_shut">
                6{"\n"}1{"\n"}1{"\n"}4
              </td>
              <td ref="5214" className="navette_shut">
                5{"\n"}2{"\n"}1{"\n"}4
              </td>
              <td className="invisible_td"></td>
              <td ref="5114" className="navette_shut">
                5{"\n"}1{"\n"}1{"\n"}4
              </td>
              <td ref="4214" className="navette_shut">
                4{"\n"}2{"\n"}1{"\n"}4
              </td>
              <td className="invisible_td"></td>
              <td ref="4114" className="navette_shut">
                4{"\n"}1{"\n"}1{"\n"}4
              </td>
              <td ref="3214" className="navette_shut">
                3{"\n"}2{"\n"}1{"\n"}4
              </td>
              <td className="invisible_td"></td>
              <td ref="3114" className="navette_shut">
                3{"\n"}1{"\n"}1{"\n"}4
              </td>
              <td ref="2214" className="navette_shut">
                2{"\n"}2{"\n"}1{"\n"}4
              </td>
              <td className="invisible_td"></td>
              <td ref="2114" className="navette_shut">
                2{"\n"}1{"\n"}1{"\n"}4
              </td>
              <td ref="1214" className="navette_shut">
                1{"\n"}2{"\n"}1{"\n"}4
              </td>
              <td className="invisible_td"></td>
              <td ref="1114" className="navette_shut">
                1{"\n"}1{"\n"}1{"\n"}4
              </td>
            </tr>
            <tr>
              <td ref="6213" className="navette_shut">
                6{"\n"}2{"\n"}1{"\n"}3
              </td>
              <td className="invisible_td"></td>
              <td ref="6113" className="navette_shut">
                6{"\n"}1{"\n"}1{"\n"}3
              </td>
              <td ref="5213" className="navette_shut">
                5{"\n"}2{"\n"}1{"\n"}3
              </td>
              <td className="invisible_td"></td>
              <td ref="5113" className="navette_shut">
                5{"\n"}1{"\n"}1{"\n"}3
              </td>
              <td ref="4213" className="navette_shut">
                4{"\n"}2{"\n"}1{"\n"}3
              </td>
              <td className="invisible_td"></td>
              <td ref="4113" className="navette_shut">
                4{"\n"}1{"\n"}1{"\n"}3
              </td>
              <td ref="3213" className="navette_shut">
                3{"\n"}2{"\n"}1{"\n"}3
              </td>
              <td className="invisible_td"></td>
              <td ref="3113" className="navette_shut">
                3{"\n"}1{"\n"}1{"\n"}3
              </td>
              <td ref="2213" className="navette_shut">
                2{"\n"}2{"\n"}1{"\n"}3
              </td>
              <td className="invisible_td"></td>
              <td ref="2113" className="navette_shut">
                2{"\n"}1{"\n"}1{"\n"}3
              </td>
              <td ref="1213" className="navette_shut">
                1{"\n"}2{"\n"}1{"\n"}3
              </td>
              <td className="invisible_td"></td>
              <td ref="1113" className="navette_shut">
                1{"\n"}1{"\n"}1{"\n"}3
              </td>
            </tr>
            <tr>
              <td ref="6212" className="navette_shut">
                6{"\n"}2{"\n"}1{"\n"}2
              </td>
              <td className="invisible_td"></td>
              <td ref="6112" className="navette_shut">
                6{"\n"}1{"\n"}1{"\n"}2
              </td>
              <td ref="5212" className="navette_shut">
                5{"\n"}2{"\n"}1{"\n"}2
              </td>
              <td className="invisible_td"></td>
              <td ref="5112" className="navette_shut">
                5{"\n"}1{"\n"}1{"\n"}2
              </td>
              <td ref="4212" className="navette_shut">
                4{"\n"}2{"\n"}1{"\n"}2
              </td>
              <td className="invisible_td"></td>
              <td ref="4112" className="navette_shut">
                4{"\n"}1{"\n"}1{"\n"}2
              </td>
              <td ref="3212" className="navette_shut">
                3{"\n"}2{"\n"}1{"\n"}2
              </td>
              <td className="invisible_td"></td>
              <td ref="3112" className="navette_shut">
                3{"\n"}1{"\n"}1{"\n"}2
              </td>
              <td ref="2212" className="navette_shut">
                2{"\n"}2{"\n"}1{"\n"}2
              </td>
              <td className="invisible_td"></td>
              <td ref="2112" className="navette_shut">
                2{"\n"}1{"\n"}1{"\n"}2
              </td>
              <td ref="1212" className="navette_shut">
                1{"\n"}2{"\n"}1{"\n"}2
              </td>
              <td className="invisible_td"></td>
              <td ref="1112" className="navette_shut">
                1{"\n"}1{"\n"}1{"\n"}2
              </td>
            </tr>
            <tr>
              <td ref="6211" className="navette_shut">
                6{"\n"}2{"\n"}1{"\n"}1
              </td>
              <td className="invisible_td"></td>
              <td ref="6111" className="navette_shut">
                6{"\n"}1{"\n"}1{"\n"}1
              </td>
              <td ref="5211" className="navette_shut">
                5{"\n"}2{"\n"}1{"\n"}1
              </td>
              <td className="invisible_td"></td>
              <td ref="5111" className="navette_shut">
                5{"\n"}1{"\n"}1{"\n"}1
              </td>
              <td ref="4211" className="navette_shut">
                4{"\n"}2{"\n"}1{"\n"}1
              </td>
              <td className="invisible_td"></td>
              <td ref="4111" className="navette_shut">
                4{"\n"}1{"\n"}1{"\n"}1
              </td>
              <td ref="3211" className="navette_shut">
                3{"\n"}2{"\n"}1{"\n"}1
              </td>
              <td className="invisible_td"></td>
              <td ref="3111" className="navette_shut">
                3{"\n"}1{"\n"}1{"\n"}1
              </td>
              <td ref="2211" className="navette_shut">
                2{"\n"}2{"\n"}1{"\n"}1
              </td>
              <td className="invisible_td"></td>
              <td ref="2111" className="navette_shut">
                2{"\n"}1{"\n"}1{"\n"}1
              </td>
              <td ref="1211" className="navette_shut">
                1{"\n"}2{"\n"}1{"\n"}1
              </td>
              <td className="invisible_td"></td>
              <td ref="1111" className="navette_shut">
                1{"\n"}1{"\n"}1{"\n"}1
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Navettes;

const navStyle = {
  padding: ".5em",
  margin: "0 0 1em 0",
};

const getStyle = {
  padding: "1em 0 0 0",
  margin: "1em 1em 0 0 ",
  color: "black",
};
