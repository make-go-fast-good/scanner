/* import React from 'react'; */
/* import Viewer, {SpecialZoomLevel, Worker} from '@phuocng/react-pdf-viewer'; */
/* import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css'; */

/* interface SinglePageViewExampleProps { */
/*     fileUrl: string; */
/* } */

/* const SinglePageViewExample: React.FC<SinglePageViewExampleProps> = ({fileUrl}) => { */
/*     return ( */

/*         <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js"> */
/*             <div> */
/*                 <Viewer */
/*                     fileUrl={fileUrl} */
/*                     defaultScale={SpecialZoomLevel.PageFit} */
/*                 /> */
/*             </div> */
/*         </Worker> */
/*     ); */
/* }; */

/* export default SinglePageViewExample; */

import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Viewer, {
    Button,
    defaultLayout,
    Position,
    RenderToolbar,
    Slot,
    ToolbarSlot,
    Tooltip,
    SpecialZoomLevel,
    Worker,
    ScrollMode,
} from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

import CloseIcon from './CloseIcon';

interface SinglePageViewExampleProps {
    fileUrl: string;
    myTitle: string;
}
const ModalExample: React.FC<SinglePageViewExampleProps> = ({fileUrl, myTitle}) => {
    const [shown, setShown] = useState(false);

    const renderToolbar = (toolbarSlot: ToolbarSlot): React.ReactElement => {
        return (
            <div
                style={{
                    alignItems: 'center',
                    position: 'absolute',
                    display: 'flex',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexGrow: 1,
                        flexShrink: 1,
                        justifyContent: 'center',
                    }}
                >
                    <div></div>
                    <div style={{marginLeft: 'auto', padding: '0 2px'}}>
                        {toolbarSlot.previousPageButton}
                    </div>
                    <div style={{padding: '0 2px'}}>
                        {toolbarSlot.currentPage + 1} / {toolbarSlot.numPages}
                    </div>
                    <div style={{padding: '0 2px'}}>
                        {toolbarSlot.nextPageButton}
                    </div>
                    <div style={{padding: '0 2px'}}>
                        {toolbarSlot.zoomOutButton}
                    </div>
                    <div style={{padding: '0 2px'}}>
                        {toolbarSlot.zoomPopover}
                    </div>
                    <div style={{padding: '0 2px'}}>
                        {toolbarSlot.zoomInButton}
                    </div>
                    <div style={{marginLeft: 'auto', padding: '0 2px'}}>
                        <Tooltip
                            position={Position.BottomRight}
                            target={<Button onClick={() => setShown(false)}><CloseIcon /></Button>}
                            content={() => 'Close'}
                            offset={{left: 0, top: 0}}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const layout = (
        isSidebarOpened: boolean,
        container: Slot,
        main: Slot,
        toolbar: RenderToolbar,
        sidebar: Slot,
    ): React.ReactElement => {
        return defaultLayout(
            isSidebarOpened,
            container,
            main,
            toolbar(renderToolbar),
            sidebar,
        );
    };

    const modalBody = () => (
        <div
            style={{
                /* Fixed position */
                backgroundColor: '#fff',
                top: '50%',
                left: '75%',
                position: 'absolute',
                padding: '1em',
                borderRadius: '1em',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',

                /* Take full size */
                height: '80%',
                width: '50%',

                /* Displayed on top of other elements */
                zIndex: 9999,

                /* Make the content scrollable */
                overflow: 'auto',
            }}
        >

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                <div>
                    <Viewer
                        fileUrl={fileUrl}
                        defaultScale={SpecialZoomLevel.ActualSize}
                        layout={layout}
                    />
                </div>
            </Worker>
        </div >
    );

    return (
        <>
            <button
                style={{
                    cursor: 'pointer',
                    borderColor: "#E3E3E3",
                    borderRadius: "5px",
                    flexDirection: "row",
                    flex: "1",
                    background: "#7A8B99",
                    color: "#EEE",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 10px ",
                    margin: "10px 10px ",
                    minHeight: "10px",
                    minWidth: "200px",
                }}
                onClick={() => setShown(true)}
            >
                {myTitle}
            </button>
            {shown && ReactDOM.createPortal(modalBody(), document.body)}
        </>
    );
};

export default ModalExample;
