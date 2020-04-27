import React, { Component } from 'react'
//import { Link } from 'react-router-dom'

export class Header extends Component {
    render() {
        return (
        <header style={headerStyle}>
            <div>
                {this.props.title}
                <img src=" data:image/png;base64,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" alt="Cannot load image" style={ ssi_logo }>
                </img>
            </div>
        </header>
        )
    }
}

const ssi_logo = {
   float: 'right',
    height: '15px',
    margin: '8px',
    display: 'inline'
}

const headerStyle = {
	textAlign: 'left',
	fontSize: '20px',
	margin: '8px 0px',
	padding: '10px 25px 10px 25px',
	background: 'yellow'
}

export default Header
