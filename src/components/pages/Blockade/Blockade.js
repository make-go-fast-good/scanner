import React, { Component } from "react";
import Grid from "./Grid.tsx";
import Inputs from "./Input";
import Navettes from "./Navettes";
import Aisle from "./Aisle";
import "./styles.css";
import "./js/coordparse"
import config from "../../../config/blockade/Blockade.json";

class Location {
  constructor(val) {
    this.id = val;
    this.active = false;
  }
}

const containerSytle = {
  background: "#F4F4F4",
  border: "1px dashed #BBB",
  margin: "15px auto",
  color: "#555",
  minHeight: "700px",
  maxHeight: "87vh",
  minWidth: "1200px",
  overflow: "auto",
};


class Blockade extends Component {
  // markActive = (nav) => {
  //   this.setState({
  //     navs: this.state.navs.map((nav) => {
  //       if (nav.id === nav) {
  //         nav.active = !nav.active;
  //       }
  //       return nav;
  //     }),
  //   });
  // };


  init = (navs, rack, shelf) => {
    this.setState({
      navs: [...navs.map((_obj) => {
        return new Location(_obj)
      })]
    });
    this.setState({
      rack: rack.map((_obj) => {
        return new Location(_obj);
      })
      });
    this.setState({
      shelf: [...shelf.map((_obj) => {
        return new Location(_obj);
      })]
    });
  };

  state = {};

  componentDidMount() {
    this.init(config.NAVETTES, config.RACK, config.SHELF);
      // console.log(this.state)
  }

  render() {
    return (
      <div style={containerSytle} className="grid-container">
        <div className="Left">
          <Inputs />
        </div>
        <div className="Mid">
          <Aisle />
        </div>
        <div className="Right">
          <Navettes nav={this.state.navs} />
        </div>
        <div className="Bottom">
          <Grid />
        </div>
      </div>
    );
  }
}

export default Blockade;
