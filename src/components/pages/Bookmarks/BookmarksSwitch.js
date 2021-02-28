import React, { Component } from "react";
import Switch from "react-switch";

const style = {
  margin: "5px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
};

const marginStyle = {
  marginLeft: "5px",
};

class BookmarksSwitch extends Component {
  render() {
    return (
      <div style={style}>
        <Switch
          checked={this.props.checked}
          onChange={this.props.handleChange}
          onColor="#50C83C"
          height={17}
          width={42}
          handleDiameter={17}
          uncheckedIcon={false}
          checkedIcon={false}
          className="react-switch"
          id="material-switch"
        />
        <div style={marginStyle} class="switch">
          Auto Refresh
        </div>
      </div>
    );
  }
}

export default BookmarksSwitch;
