import { useRef } from "react";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import CreateDrawing from "../Create/CreateDrawing";
import "./DrawingModal.less";
import Draggable from "react-draggable";
function DrawingModal() {
  const { prevPage, setPage, setFullWindow } = useChartWidgets();

  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <div className="modal" ref={nodeRef}>
        <div className="modalHead drag-handle">
          <p>Drawing #1</p>
          <div className="containerBtns">
            <button
              className="cancelBtn"
              onClick={() => {
                setPage(prevPage);
                setFullWindow(false);
              }}
            >
              <p>Cancel</p>
            </button>
            <button className="saveBtn">
              <img src="/icons/coge.svg" alt="Settings" />
              <p>Save Changes</p>
            </button>
          </div>
        </div>
        <CreateDrawing />
      </div>
    </Draggable>
  );
}

export default DrawingModal;
