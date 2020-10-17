import React, {Component} from "react";
import {Document, Page} from "react-pdf";
import base64TT1413 from './assets/TT1413.txt'
import DOCTT1413 from './assets/TT1413.pdf'

export default class HexDoc extends Component {

    state = {numPages: null, pageNumber: 1};

    onDocumentLoadSuccess = ({numPages}) => {
        this.setState({numPages});
    };

    goToPrevPage = () =>
        this.setState(state => ({pageNumber: state.pageNumber - 1}));
    goToNextPage = () =>
        this.setState(state => ({pageNumber: state.pageNumber + 1}));

    render() {
        const {pageNumber, numPages} = this.state;
        console.log(typeof (base64TT1413))

        return (
            <div>
                <nav>
                    <button onClick={this.goToPrevPage}>Prev</button>
                    <button onClick={this.goToNextPage}>Next</button>
                </nav>

                <div style={{width: 600}}>
                    <Document
                        file={`data:application/pdf;base64,${base64TT1413}`}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={1} width={600} />
                    </Document>
                </div>

                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        );
    }
}
