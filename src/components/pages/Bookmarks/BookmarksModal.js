import React, { Component } from "react";
import Modal from "react-modal";
import "../../../App.css";

class BookmarksModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  headerStyle = (props) => {
    return {
      background: props,
      display: "flex",
      flex: "1",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFF",
      fontSize: "18px",
      flexWrap: "wrap",
      margin: "15px",
      minHeight: "10vh",
    };
  };

  render() {
    return (
      <div>
        <div>
          <button style={openStyle} onClick={this.handleOpenModal}>
            More Details
          </button>
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          onRequestClose={this.handleCloseModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
            overlay: {
              backdropFilter: "blur(2px)",
              backdropFilter: "brightness(60%)",
              backdropFilter: "contrast(40%)",
              backdropFilter: "grayscale(30%)",
              backdropFilter: "invert(70%)",
              backdropFilter: "opacity(20%)",
              backdropFilter: "sepia(90%)",
              backdropFilter: "saturate(80%)",
            },
          }}
        >
          <button style={closeStyle} onClick={this.handleCloseModal}>
            X
          </button>

          <div style={contentStyle}>
            <div style={this.headerStyle("rgba(0, 215, 0, 0.7)")}>
              Auto Mode
            </div>
            <div style={this.headerStyle("rgba(200, 0, 0, 0.7)")}>Faulted</div>
            <div style={this.headerStyle("rgba(249, 141, 59, 1)")}>
              No orders in an hour
            </div>
            <div style={this.headerStyle("rgba(160, 160, 160, 0.7)")}>
              Semi mode
            </div>
            <div style={this.headerStyle("#7A8B99")}>Unavailable</div>
          </div>
        </Modal>
      </div>
    );
  }
}
const contentStyle = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "10px",
  margin: "20px",
};

const closeStyle = {
  display: "flex",
  flex: "1",
  background: "#666",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
  float: "right",
};

const openStyle = {
  display: "flex",
  flex: "1",
  background: "#666",
  color: "#fff",
  border: "none",
  padding: "8px",
  cursor: "pointer",
  float: "right",
};

export default BookmarksModal;
