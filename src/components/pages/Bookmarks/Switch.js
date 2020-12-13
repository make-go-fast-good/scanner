import React, {Component} from "react";
import Switch from "react-switch";

class BookmarksSwitch extends Component {

    getStyle = props => {
        return {
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
        };
    };


    spanStyle = props => {
        return {
            margin: "5px",
        };
    };

    render() {
        return (
            <div style={this.getStyle()}>
                <span style={this.spanStyle()} >Bookmarks</span>
                <Switch
                    checked={this.props.checked}
                    onChange={this.props.handleChange}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={22}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={36}
                    className="react-switch"
                    id="material-switch"
                />
                <span style={this.spanStyle()} >Recent Faults</span>
            </div>
        );
    }
}

export default BookmarksSwitch;
