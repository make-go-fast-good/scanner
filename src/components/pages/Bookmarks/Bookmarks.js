import axios from "axios";
import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "../../../App.css";
import bookmarksConfig from "../../../config/bookmarks/Bookmarks.json";
import "./Bookmarks.css";
import BookmarksModal from "./BookmarksModal";

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

class Bookmarks extends Component {
  componentDidMount() {
    bookmarksConfig.machine.map((m) => {
      return this.getStatus(m.ip, m.ref);
    });
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
          console.log(res.data);
          let updateComponent = findDOMNode(this.refs[res.data.name]);
          if (updateComponent !== null) {
            updateComponent.style.color = "rgb(255,255,255)";
            resolve(
              (updateComponent.style.backgroundColor = res.data.backgroundColor)
            );
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

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
        <div style={{ alignSelf: "flex-end", margin: "1em" }}>
          <BookmarksModal />
        </div>
        <div class="gridContainer">{MATRIX}</div>
      </div>
    );
  }
}

export default Bookmarks;
