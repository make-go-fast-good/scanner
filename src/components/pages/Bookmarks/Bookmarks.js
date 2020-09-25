import React, { Component } from "react";
import axios from "axios";
import BookmarksSwitch from "./Switch.js";
import "../../../App.css";

class Bookmarks extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            loading: false,
            error: undefined,
            data: undefined,
            url: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    // Select Connection
    getData = url => {
        this.setState({ loading: true, data: url });
        axios
            .get("http://localhost:8080/BOOKMARKS/connect", {
                params: {
                    url: url
                }
            })
            .then(res => {
                this.makeTable(res.data);
                console.log("res.data");
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    error:
                        "Connection Error: Verify connection to the PLC network."
                });
            });
    };

    openLink = (octet, m_name) => {
        const f_url1 =
            "http://10.136.17.191:8080/lighthouse-core/services/notification/table";

        const f_url2 =
            "?condition=(($%3C%3Cdefinition.severity%3E%3E+%3D+%27ERROR%27)+AND+($%3C%3Ctext%3E%3E+NOT+LIKE+%27%25afety%25%27)+AND+($%3C%3Ctext%3E%3E+NOT+LIKE+%27%25dmittance%25%27)+AND+($%3C%3Ctext%3E%3E+NOT+LIKE+%27Check%25%27)+AND+(($%3C%3CnodeId%3E%3E+IN+(%27";

        const f_url3 =
            "-PHYSICAL%27))))&firstResult=0&maxResults=15&orderBy=$%3C%3CstartTime%3E%3E+DESC";

        let f_url = f_url1 + f_url2 + m_name + f_url3;

        const url1 = "http://10.136.17.";
        const url2 = "/admin.html";

        this.state.checked === false
            ? window.open(url1 + octet + url2, "_self")
            : window.open(f_url);
        // : this.setState({ url: f_url })
    };

    switchStyle = props => {
        return {
            flexWrap: "wrap",
            display: "flex",
            flex: "1",
            justifyContent: "flex-end",
            alignItems: "center",
            color: "black",
            margin: "5px",
            minWidth: "1200px"
        };
    };

    getStyle = props => {
        return {
            background: "#FFF",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px dashed #BBB",
            margin: "15px auto",
            color: "#FFF",
            minHeight: "88vh",
            minWidth: "1200px"
        };
    };

    navStyle = props => {
        return {
            borderColor: "#E3E3E3",
            background: "#7A8B99",
            color: "#EEE",
            fontSize: "18px",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-around",
            flex: "1",
            alignItems: "center",
            margin: "15px auto",
            padding: "15px auto",
            minHeight: "15vh",
            minWidth: "6vh",
            cursor: "pointer"
        };
    };

    liftStyle = props => {
        return {
            bordercolor: "#D3D3E3",
            background: "#6A7A88",
            color: "#EEE",
            fontSize: "16px",
            flexWrap: "wrap",
            display: "flex",
            flex: "1",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "50px 20px auto",
            padding: "15px auto",
            minHeight: "8vh",
            minWidth: "8vh",
            cursor: "pointer"
        };
    };

    noStyle = props => {
        return {
            background: "#FFF",
            flexWrap: "wrap",
            display: "flex",
            flex: "1",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "43px 15px auto",
            padding: "10px auto",
            color: "#FFF",
            minHeight: "8vh",
            minWidth: "8vh"
        };
    };

    render() {
        return (
            <>
                <div style={this.getStyle()}>
                    <div style={this.switchStyle()}>
                        <BookmarksSwitch
                            checked={this.state.checked}
                            handleChange={this.handleChange}
                        />
                    </div>
                    <table>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(119, "N6214")}
                            >
                                <div>
                                    6<br />2<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(118, "N6213")}
                            >
                                <div>
                                    6<br />2<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(117, "N6212")}
                            >
                                <div>
                                    6<br />2<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(116, "N6211")}
                            >
                                <div>
                                    6<br />2<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(105, "NL6085")}
                            >
                                <div>
                                    60
                                    <br />
                                    85
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(104, "NL6084")}
                            >
                                <div>
                                    60
                                    <br />
                                    84
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(103, "NL6083")}
                            >
                                <div>
                                    60
                                    <br />
                                    83
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(102, "NL6082")}
                            >
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </button>
                            <div style={this.noStyle()}>
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(114, "N6114")}
                            >
                                <div>
                                    6<br />1<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(113, "N6113")}
                            >
                                <div>
                                    6<br />1<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(112, "N6112")}
                            >
                                <div>
                                    6<br />1<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(111, "N6111")}
                            >
                                <div>
                                    6<br />1<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(99, "N5214")}
                            >
                                <div>
                                    5<br />2<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(98, "N5213")}
                            >
                                <div>
                                    5<br />2<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(97, "N5212")}
                            >
                                <div>
                                    5<br />2<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(96, "N5211")}
                            >
                                <div>
                                    5<br />2<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(85, "NL5085")}
                            >
                                <div>
                                    50
                                    <br />
                                    85
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(84, "NL5084")}
                            >
                                <div>
                                    50
                                    <br />
                                    84
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(83, "NL5083")}
                            >
                                <div>
                                    50
                                    <br />
                                    83
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(82, "NL5082")}
                            >
                                <div>
                                    50
                                    <br />
                                    82
                                </div>
                            </button>
                            <div style={this.noStyle()}>
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(94, "N5114")}
                            >
                                <div>
                                    5<br />1<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(93, "N5113")}
                            >
                                <div>
                                    5<br />1<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(92, "N5112")}
                            >
                                <div>
                                    5<br />1<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(91, "N5111")}
                            >
                                <div>
                                    5<br />1<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(79, "N4214")}
                            >
                                <div>
                                    4<br />2<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(78, "N4213")}
                            >
                                <div>
                                    4<br />2<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(77, "N4212")}
                            >
                                <div>
                                    4<br />2<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(76, "N4211")}
                            >
                                <div>
                                    4<br />2<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(65, "NL4085")}
                            >
                                <div>
                                    40
                                    <br />
                                    85
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(64, "NL4084")}
                            >
                                <div>
                                    40
                                    <br />
                                    84
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(63, "NL4083")}
                            >
                                <div>
                                    40
                                    <br />
                                    83
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(62, "NL4082")}
                            >
                                <div>
                                    40
                                    <br />
                                    82
                                </div>
                            </button>
                            <div style={this.noStyle()}>
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(74, "N4114")}
                            >
                                <div>
                                    4<br />1<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(73, "N4113")}
                            >
                                <div>
                                    4<br />1<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(72, "N4112")}
                            >
                                <div>
                                    4<br />1<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(71, "N4111")}
                            >
                                <div>
                                    4<br />1<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(59, "N3214")}
                            >
                                <div>
                                    3<br />2<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(58, "N3213")}
                            >
                                <div>
                                    3<br />2<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(57, "N3212")}
                            >
                                <div>
                                    3<br />2<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(56, "N3211")}
                            >
                                <div>
                                    3<br />2<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(45, "NL3085")}
                            >
                                <div>
                                    30
                                    <br />
                                    85
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(44, "NL3084")}
                            >
                                <div>
                                    30
                                    <br />
                                    84
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(43, "NL3083")}
                            >
                                <div>
                                    30
                                    <br />
                                    83
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(42, "NL3082")}
                            >
                                <div>
                                    30
                                    <br />
                                    82
                                </div>
                            </button>
                            <div style={this.noStyle()}>
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(54, "N3114")}
                            >
                                <div>
                                    3<br />1<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(53, "N3113")}
                            >
                                <div>
                                    3<br />1<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(52, "N3112")}
                            >
                                <div>
                                    3<br />1<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(51, "N3111")}
                            >
                                <div>
                                    3<br />1<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(39, "N2214")}
                            >
                                <div>
                                    2<br />2<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(38, "N2213")}
                            >
                                <div>
                                    2<br />2<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(37, "N2212")}
                            >
                                <div>
                                    2<br />2<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(36, "N2211")}
                            >
                                <div>
                                    2<br />2<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(25, "NL2085")}
                            >
                                <div>
                                    20
                                    <br />
                                    85
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(24, "NL2084")}
                            >
                                <div>
                                    20
                                    <br />
                                    84
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(23, "NL2083")}
                            >
                                <div>
                                    20
                                    <br />
                                    83
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(22, "NL2082")}
                            >
                                <div>
                                    20
                                    <br />
                                    82
                                </div>
                            </button>
                            <div style={this.noStyle()}>
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(34, "N2114")}
                            >
                                <div>
                                    2<br />1<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(33, "N2113")}
                            >
                                <div>
                                    2<br />1<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(32, "N2112")}
                            >
                                <div>
                                    2<br />1<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(31, "N2111")}
                            >
                                <div>
                                    2<br />1<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(19, "N1214")}
                            >
                                <div>
                                    1<br />2<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(18, "N1213")}
                            >
                                <div>
                                    1<br />2<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(17, "N1212")}
                            >
                                <div>
                                    1<br />2<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(16, "N1211")}
                            >
                                <div>
                                    1<br />2<br />1<br />1
                                </div>
                            </button>
                        </td>
                        <td>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(5, "NL1085")}
                            >
                                <div>
                                    10
                                    <br />
                                    85
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(4, "NL1084")}
                            >
                                <div>
                                    10
                                    <br />
                                    84
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(3, "NL1083")}
                            >
                                <div>
                                    10
                                    <br />
                                    83
                                </div>
                            </button>
                            <button
                                style={this.liftStyle()}
                                onClick={() => this.openLink(2, "NL1082")}
                            >
                                <div>
                                    10
                                    <br />
                                    82
                                </div>
                            </button>
                            <div style={this.noStyle()}>
                                <div>
                                    60
                                    <br />
                                    82
                                </div>
                            </div>
                        </td>
                        <td>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(14, "N1114")}
                            >
                                <div>
                                    1<br />1<br />1<br />4
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(13, "N1113")}
                            >
                                <div>
                                    1<br />1<br />1<br />3
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(12, "N1112")}
                            >
                                <div>
                                    1<br />1<br />1<br />2
                                </div>
                            </button>
                            <button
                                style={this.navStyle()}
                                onClick={() => this.openLink(11, "N1111")}
                            >
                                <div>
                                    1<br />1<br />1<br />1
                                </div>
                            </button>
                        </td>
                    </table>
                </div>
            </>
        );
    }
}

export default Bookmarks;
