import React, {Component} from "react";
import config from "../../../config/blockade/Blockade.json";
import Grid from "./Grid";
import Inputs from "./Input";
import { Typography } from "@material-ui/core";
import "./styles.css";

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
  minHeight: "87vh",
  maxHeight: "87vh",
};

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven
iam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
sequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do
lore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, s
unt in culpa qui officia deserunt mollit anim id est laborum.`;

class Blockade extends Component {
  componentDidMount() {
    this.init(config.NAVETTES, config.RACK, config.SHELF);
  }

  state = {
    rack: [],
    navs: [],
    shelf: [],
  };

  init = (navs, rack, shelf) => {
    this.setState({
      navs: navs.map((_obj) => {
        return new Location(_obj);
      }),
      rack: rack.map((_obj) => {
        return new Location(_obj);
      }),
      shelf: shelf.map((_obj) => {
        return new Location(_obj);
      }),
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
              {lorem}
          </div>
          <div className="Right">
              {lorem}
          </div>
          <div className="Bottom">
            <Grid />
          </div>
      </div>
    );
  }
}

export default Blockade;
