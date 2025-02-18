import React, {
  createContext,
  useContext,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Draggable from "react-draggable";
import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import "./ChartWidgetsWindow.less";
import { Page } from "../Enums/Page.enum";
import CreateDrawing from "../Drawing/Create/CreateDrawing";
import DrawingModal from "../Drawing/DrawingModal/DrawingModal";
import { eventEmitter } from "../Utils/eventEmitter";
import EditTemplateModal from "../Chart/EditTemplate/EditTemplate";

interface ChartWidgetsContextType {
  prevPage: string;
  page: string;
  paramter: string;
  setPage: (page?: string, parameter?: string) => void;
  setFullWindow: (fullWindow: boolean) => void;
  closeWindow: () => void;
}

const ChartWidgetsContext = createContext<ChartWidgetsContextType | undefined>(
  undefined
);

export const useChartWidgets = () => {
  const context = useContext(ChartWidgetsContext);
  if (!context) {
    throw new Error(
      "useChartWidgets must be used within a ChartWidgetsProvider"
    );
  }
  return context;
};

const ChartWidgetsWindow = forwardRef((props: any, ref) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [prevPage, setPrevPage] = useState(Page.NEW_CHART);
  const [isVisible, setIsVisible] = useState(false);
  const [page, changePage] = useState(props.page);
  const [paramter, setParameter] = useState("test");
  const [fullWindow, setFullWindow] = useState(false);

  const setPage = (pageName: string, parameterName?: string) => {
    setPrevPage(page);
    changePage(pageName);
    setParameter(parameterName || "");
  };

  const openWindow = () => setIsVisible(true);
  const closeWindow = () => setIsVisible(false);

  useImperativeHandle(ref, () => ({
    openWindow,
  }));

  // 🔹 Listen for the event to open the window
  useEffect(() => {
    const openWindowHandler = (event: CustomEvent) => {
      setPage(
        event.detail?.page || Page.NEW_CHART,
        event.detail?.parameter || "test"
      );
      setIsVisible(true);
    };

    eventEmitter.on("openChartWidgets", openWindowHandler);
    return () => {
      eventEmitter.off("openChartWidgets", openWindowHandler);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <ChartWidgetsContext.Provider
      value={{
        prevPage,
        fullWindow,
        setFullWindow,
        page,
        setPage,
        paramter,
        closeWindow,
      }}
    >
      <div className="widgetAndChartOverlay">
        {!fullWindow && (
          <Draggable nodeRef={nodeRef} handle=".drag-handle">
            <div ref={nodeRef} className="widgetChartWindow">
              <div className="Head drag-handle">
                <p>Charts and widgets {paramter}</p>
                <button className="closeBtn" onClick={closeWindow}>
                  <img src="/icons/close.svg" alt="Close" />
                </button>
              </div>
              <div className="containerModal">
                {!fullWindow && (
                  <>
                    <LeftPanel /> <RightPanel />
                  </>
                )}
              </div>
            </div>
          </Draggable>
        )}
        {fullWindow && <>{page === Page.NEW_DRAWING && <DrawingModal />}</>}
        {fullWindow && (
          <>{page === Page.EDIT_TEMPLATE && <EditTemplateModal />}</>
        )}
      </div>
    </ChartWidgetsContext.Provider>
  );
});

export default ChartWidgetsWindow;
