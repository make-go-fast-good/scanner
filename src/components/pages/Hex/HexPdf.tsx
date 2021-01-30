import React, { useState } from "react";
import ReactDOM from "react-dom";
import Viewer, {
  Button,
  Position,
  Tooltip,
  SpecialZoomLevel,
  Worker,
} from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

interface SinglePageViewExampleProps {
  fileUrl: string;
  myTitle: string;
}

const ModalExample: React.FC<SinglePageViewExampleProps> = ({
  fileUrl,
  myTitle,
}) => {
  const [shown, setShown] = useState(false);

  const modalBody = () => (
    <div
      style={{
        /* Fixed position */
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        top: "56%",
        left: "72%",
        position: "absolute",
        padding: "1em",
        borderRadius: "1em",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        /* Modal size */
        height: "80%",
        width: "48%",
      }}
    >
      {/* <Worker workerUrl="./assets/pdf.worker.min.js"> */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
        <div style={{ float: "right" }}>
          <Tooltip
            position={Position.BottomRight}
            target={
              <Button onClick={() => setShown(false)}>
                <CloseSharpIcon style={{ fontSize: "36px" }} />
              </Button>
            }
            content={() => "Close"}
            offset={{ left: 0, top: 0 }}
          />
        </div>
        <div style={{ height: "90%" }}>
          <Viewer fileUrl={fileUrl} defaultScale={SpecialZoomLevel.PageWidth} />
        </div>
      </Worker>
    </div>
  );

  return (
    <>
      <button
        style={{
          cursor: "pointer",
          borderColor: "#E3E3E3",
          borderRadius: "10px",
          flexDirection: "row",
          flex: "1",
          background: "#7A8B99",
          color: "#EEE",
          fontSize: "14px",
          display: "flex",
          justifyContent: "center",
          padding: "8.25px 8px ",
          margin: "6px 10px ",
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
