import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'

export class burgerMenu extends Component {

showSettings = (e) =>  {
    e.preventDefault();
}

    render() {

        return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/">TT13</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="/">Settings</a>
            </Menu>
        )
    }
}

export default burgerMenu
