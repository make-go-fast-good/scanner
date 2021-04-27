import React, { Component } from "react";
import Grid from "./Grid";
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

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven
iam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
sequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do
lore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, s
unt in culpa qui officia deserunt mollit anim id est laborum.`;

class Blockade extends Component {
  state = {};

  componentDidMount() {
    this.init(config.NAVETTES, config.RACK, config.SHELF);
      console.log(this.state)
  }


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

  markActive = (nav) => {
    this.setState({
      navs: this.state.navs.map((nav) => {
        if (nav.id === nav) {
          nav.active = !nav.active;
        }
        return nav;
      }),
    });
  };

  render() {
    return (
      <div style={containerSytle} className="grid-container">
        <div className="Left">
          <Inputs />
        </div>
        <div className="Mid">
          {/* {lorem} */}
          <Aisle />
        </div>
        <div className="Right">
          {/* {lorem} */}
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
