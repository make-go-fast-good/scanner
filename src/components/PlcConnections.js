import React, {Component} from "react";
import PropTypes from "prop-types";

export class SelectConn extends Component {
    state = {};

    getStyle = (val) => {
        if (val) {
            return {
                WebkitUserSelect: "none",
                msUserSelect: "none",
                MozUserSelect: "none",
                userSelect: "none",
                flex: "2",
                marginRight: ".2%",
            };
        } else {
            return {
                WebkitUserSelect: "none",
                msUserSelect: "none",
                MozUserSelect: "none",
                userSelect: "none",
                flex: "1",
                marginRight: ".2%",
            };
        }
    };

    onSubmit = (e) => {
        let conn = e.target.value;
        e.preventDefault();
        this.props.getData({conn});
    };

    render() {
        if (this.props.area === "OVERHEAD") {
            return (
                <form onSubmit={this.onSubmit} style={{display: "flex"}}>
                    <input
                        type="submit"
                        value="C08"
                        className="btn"
                        style={this.getStyle(1)}
                        onClick={this.onSubmit}
                    ></input>
                </form>
            );
        } else {
            return (
                <form onSubmit={this.onSubmit} style={{display: "flex"}}>
                    <input
                        type="submit"
                        value="C01"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C02"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C03"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C04"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C05"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C06"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C07"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C08"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C09"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C10"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C11"
                        className="btn"
                        style={this.getStyle()}
                        onClick={this.onSubmit}
                    ></input>
                    <input
                        type="submit"
                        value="C12"
                        className="btn"
                        style={{flex: "1"}}
                        onClick={this.onSubmit}
                    ></input>
                </form>
            );
        }
    }
}

// PropTypes
SelectConn.propTypes = {
    getData: PropTypes.func.isRequired,
};

export default SelectConn;
