import { useState,useRef } from "react";
import "./AddChartsAndWidgets.less";
import { Page } from "../widgetAndChart/Enums/Page.enum";
import { eventEmitter } from "../widgetAndChart/Utils/eventEmitter";
import Draggable from "react-draggable";
function AddChartsAndWidgets() {
  const [isVisible, setIsVisible] = useState(true);
  const nodeRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
   
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const handleOpenWindow = (page: string) => {
    console.log("Opening ChartWidgetsWindow with page:", page);
    eventEmitter.emit("openChartWidgets", { page });
    setIsVisible(false);
  };

  return (
     <Draggable nodeRef={nodeRef} handle=".drag-handle">
    <div ref={nodeRef} className="modalAddChartWidget">
   
      <div className="modalHead drag-handle">    
        <p>Charts and widgets</p>
        <button className="closeBtn" onClick={closeModal}>
          <img src="/img/icons/close.svg" alt="Close" />
        </button>
      </div>
      <div className="modalAddChartWidget_container">
        <div
          className="addWidget"
    
          onClick={() => handleOpenWindow(Page.NEW_WIDGET)}
        >
          <div className="dottedbg">
            <div className="flex">
              <button>
                <div>
                  <img src="/img/icons/mirro.svg" alt="Mirro" />
                </div>
              </button>
 
              <button>
                <div>
                  <img src="/img/icons/norton.svg" alt="Norton" />
                </div>
              </button>
              <button>
                <div>
                  <img src="/img/icons/google.svg" alt="Google" />
                </div>
 
              </button>
            </div>
            <p>Add Widget</p>
          </div>
        </div>
        <div
          className="addWidget"
          onClick={() => handleOpenWindow(Page.NEW_CHART)}
        >
 
          <div className="linebg">
            <div className="flex">
              <img src="/img/icons/chart_icon.svg" alt="Chart" />
            </div>
            <p>Add Chart</p>
          </div>
        </div>
      </div>
    </div>
 
    </Draggable>
  );
}

export default AddChartsAndWidgets;