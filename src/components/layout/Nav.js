import React, { Component } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export class Nav extends Component {
  render() {
    return (
      <Menu>
        <div>
          <Link style={linkStyle} to="/">
            Home
          </Link>{" "}
          |
        </div>
        <div>
          <Link style={linkStyle} to="/about">
            About
          </Link>
        </div>
      </Menu>
    );
  }
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default Nav;
