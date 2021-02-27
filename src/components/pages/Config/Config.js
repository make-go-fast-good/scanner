import React, {Component} from "react";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const code = `function add(a, b) {
  return a + b;
}
`;

const containerStyle = {
  background: "#F4F4F4",
  border: "1px dashed #BBB",
  margin: "5px auto",
  color: "#555",
  minHeight: "89vh",
  minWidth: "98%",
  overflow: "auto",
};

class Config extends Component {

  state = { code };

  render() {
    return (
      <div style={containerStyle}>
      <Editor
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      </div>
    );
  }
}
export default Config;
