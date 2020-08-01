import React, { Component } from "react";
import { Typography } from '@material-ui/core';

// import "../../../App.css";

class Navettes extends Component {

  state = {
      rack: [],
      navs: [],
      aisle:[]
  };


  navStyle = (props) => {
      return {
      borderColor: "#E3E3E3",
      background: "#7A8B99",
      color: "#EEE",
      fontSize: "14px",
      flexWrap: "wrap",
      display: "flex",
      flex: "1",
      justifyContent: "center",
      alignItems: "center",
      margin: "5px auto",
      padding: "5px auto",
      minHeight: "10vh",
      minWidth: "2vh",
    };
  };

 VerticalText = props => (
  <div style={{ flex: 1, flexDirection: 'column' }}>
      {props.string.split('').map(char => <Typography>{char}</Typography>)}
  </div>
)

  render() {
     return (
                this.props.nav.map(_nav =>{
                    return(
                        <div style={this.navStyle()}>
                           this.VerticalText({_nav.id + ""})
                        </div>
                    )
                })
      );
    }
}

export default Navettes;
