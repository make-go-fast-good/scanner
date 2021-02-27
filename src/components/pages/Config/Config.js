import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
// import { KEYCODE_ENTER } from "./keyboard";

import config from "./exampleConnections.json";

const code = JSON.stringify(config, 0, 2);

const containerStyle = {
  background: "#F4F4F4",
  border: "1px dashed #BBB",
  margin: "5px auto",
  color: "#555",
  minHeight: "89vh",
  maxHeight: "89vh",
  minWidth: "98%",
};

const editorStyle = {
  background: "#FFF",
  border: "1px #000",
  margin: "15px",
  padding: "15px",
  color: "#555",
  minHeight: "75vh",
  maxHeight: "75vh",
  minWidth: "80%",
  overflow: "auto",
};

// const onKeyDown = (e) => {
//   if (e.shiftKey && e.keyCode === KEYCODE_ENTER) {
//     e.preventDefault();

//     this.onSubmit();
//   }
// };

class Config extends Component {
  state = { code };

  render() {
    return (
      <div style={containerStyle}>
        <p style={{ margin: "1em", padding: "1em" }}>
          Press Shift+Enter to save file.
        </p>
        <div style={editorStyle}>
          <Editor
            value={this.state.code}
            onValueChange={(code) => this.setState({ code })}
            highlight={(code) => Prism.highlight(code, 0)}
            className="language-json"
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
        </div>
      </div>
    );
  }
}
export default Config;
