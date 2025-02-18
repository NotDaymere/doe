import { useRef } from "react";

import "./EditTemplate.less";
import Draggable from "react-draggable";
import UploadChartBody from "./component/UploadChartBody/UploadChartBody";
import { useChartWidgets } from "../../Window/ChartWidgetsWindow";
import { Page } from "../../Enums/Page.enum";

function EditTemplateModal() {
  const { setPage, setFullWindow } = useChartWidgets();
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <div className="modal" ref={nodeRef}>
        <div className="modalHead drag-handle">
          <p>Bar Chart #1</p>
          <div className="containerBtns">
            <button
              className="cancelBtn"
              onClick={() => {
                setPage(Page.NEW_CHART), setFullWindow(false);
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
        <UploadChartBody />
      </div>
    </Draggable>
  );
}

export default EditTemplateModal;
