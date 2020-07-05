import React, { Component } from "react";
import Iframe from 'react-iframe'

import "../App.css";

class BookmarksIframe extends Component {

 constructor(props) {
    super(props);
        this.state = {
            url: props
        };
    this.handleLoad = this.handleLoad.bind(this);
 }

 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }

 componentWillUnmount() {
   window.removeEventListener('load', this.handleLoad)
 }

    componentDidUpdate() {
        this.handleLoad()
    }

 handleLoad(val) {
    const table = document.getElementById('myFrame');
    window.localStorage.setItem('fault', table)
 }

    openLink = (_url) => {
           this.setState({ url: _url })
    };

    render() {
        return (
            <>
                <Iframe url={this.props.url}
                        width="450px"
                        height="450px"
                        id="myFrame"
                        className="myClassname"
                        position="relative"
                        sandbox="allow-same-origin"
                />
            </>
        );
    }
}

export default BookmarksIframe;
