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
} from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

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
                    <div style={{padding: '0 2px'}}>
                        {toolbarSlot.downloadButton}
                    </div>
                    <div >
                        <Tooltip
                            position={Position.LeftCenter}
                            target={<Button onClick={() => setShown(false)}><CloseSharpIcon /></Button>}
                            content={() => 'Close'}
                            offset={{left: 0, top: 10}}
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
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                top: '58%',
                left: '72%',
                position: 'absolute',
                padding: '1em',
                borderRadius: '1em',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',

                /* Modal size */
                height: '75%',
                width: '50%',


                /* Make the content scrollable */
                overflow: 'auto',
            }}
        >
            {/* <Worker workerUrl="./assets/pdf.worker.min.js"> */}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                <Tooltip
                    position={Position.BottomLeft}
                    target={<Button onClick={() => setShown(false)}><CloseSharpIcon style={{fontSize: '36px'}} /></Button>}
                    content={() => 'Close'}
                    offset={{left: 0, top: 0}}
                />
                <div>
                    <Viewer
                        fileUrl={fileUrl}
                        defaultScale={SpecialZoomLevel.PageWidth}
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
