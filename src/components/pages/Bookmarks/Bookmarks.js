import axios from "axios";
import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import "../../../App.css";
import bookmarksConfig from "../../../config/bookmarks/Bookmarks.json";
import "./Bookmarks.css";
import BookmarksModal from "./BookmarksModal";
import BookmarksSwitch from "./BookmarksSwitch";

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: true,
      error: undefined,
      data: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    bookmarksConfig.machine.map((m) => {
      return this.getStatus(m.ip, m.ref);
    });
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    /*
          stop getStatus() from continuing to run even
          after unmounting this component. Notice we are calling
          'clearTimeout()` here rather than `clearInterval()` as
          in the previous example.
        */
    clearTimeout(this.intervalID);
  }

  openLink = (addr) => {
    const url1 = "http://";
    const url2 = "/admin.html";
    window.open(url1 + addr + url2, "_self");
  };

  // Select Connection
  getStatus = (addr, m_name) => {
    return new Promise((resolve, reject) => {
      let keyMode = "http://" + addr + "/LevelControlKeySwitchMode?";
      let error = "http://" + addr + "/Srm1CurrErrors?";
      let srmStatus = "http://" + addr + "/srm1CurrSrmStatus.html?";
      let orderStatus = "http://" + addr + "/srm1OrderAckList.html?";

      axios
        .get("http://localhost:8080/bookmarks/connect", {
          params: {
            keyMode: keyMode,
            m_name: m_name,
            srmStatus: srmStatus,
            error: error,
            orderStatus: orderStatus,
            timeout: 15000,
          },
        })
        .then((res) => {
          this.setState({
            updateTime: new Date().toLocaleString(),
          });

          let updateComponent = findDOMNode(this.refs[res.data.name]);
          if (updateComponent !== null) {
            updateComponent.style.color = "rgb(255,255,255)";
            resolve(
              (updateComponent.style.backgroundColor = res.data.backgroundColor)
            );
          }
          if (this.state.checked === true) {
            // call getStatus() again in 60 seconds
            this.intervalID = setTimeout(
              this.getStatus.bind(this, addr, m_name),
              10000
            );
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  handleChange(checked) {
    this.setState({ checked });
    console.log(this.state.checked);
  }

  render() {
    const MATRIX = bookmarksConfig.machine.map((m) => {
      if (m.type === "nav") {
        return (
          <div class={m.name}>
            <button
              ref={m.ref}
              style={navStyle}
              onClick={() => this.openLink(m.ip)}
            >
              <div>{m.name.substring(1, 6)}</div>
            </button>
          </div>
        );
      } else if (m.type === "lift") {
        return (
          <div class={m.name}>
            <button
              ref={m.ref}
              style={liftStyle}
              onClick={() => this.openLink(m.ip)}
            >
              <div>
                {m.name.substring(2, 4)}
                <br />
                {m.name.substring(4, 6)}
              </div>
            </button>
          </div>
        );
      }
    });

    return (
      <div style={containerStyle}>
        <div class="headerContainer">
          <BookmarksSwitch
            checked={this.state.checked}
            handleChange={this.handleChange}
            updateTime={this.state.updateTime}
            style={switchStyle}
          />
          <div class="time">Last Updated: {this.state.updateTime}</div>
          <BookmarksModal />
        </div>
        <div class="gridContainer">{MATRIX}</div>
      </div>
    );
  }
}
export default Bookmarks;

const switchStyle = {
  flexWrap: "wrap",
  display: "flex",
  flex: "1",
  justifyContent: "flex-start",
  alignItems: "center",
  color: "#555",
  margin: "5px",
};

const navStyle = {
  borderColor: "#E3E3E3",
  background: "#7A8B99",
  color: "#EEE",
  fontSize: "18px",
  padding: "1em 1em",
  minHeight: "7em",
  minWidth: "3em",
  maxWidth: "3em",
  overflowWrap: "break-word",
  cursor: "pointer",
};

const liftStyle = {
  bordercolor: "#D3D3E3",
  background: "#6A7A88",
  color: "#EEE",
  fontSize: "16px",
  margin: "2em auto",
  padding: "1em auto",
  minHeight: "4em",
  maxHeight: "4em",
  minWidth: "4em",
  maxWidth: "4em",
  cursor: "pointer",
};

const containerStyle = {
  background: "#F4F4F4",
  border: "1px dashed #BBB",
  margin: "5px auto",
  color: "#555",
  minHeight: "89vh",
  minWidth: "98%",
  overflow: "auto",
};
