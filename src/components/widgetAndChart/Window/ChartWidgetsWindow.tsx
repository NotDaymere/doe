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
import { eventEmitter } from "../Utils/eventEmitter";
import EditTemplateModal from "../Chart/EditTemplate/EditTemplate";
import Drawing from "../Drawing/Drawing";
import DrawingModal from "../Drawing/DrawingModal/DrawingModal";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";

interface ChartWidgetsContextType {
    prevPage: string;
    page: string;
    paramter: string;
    link: string;
    setPage: (page?: string, parameter?: string, link?: string) => void;
    setFullWindow: (fullWindow: boolean) => void;
    closeWindow: () => void;
}

const ChartWidgetsContext = createContext<ChartWidgetsContextType | undefined>(undefined);

export const useChartWidgets = () => {
    const context = useContext(ChartWidgetsContext);
    if (!context) {
        throw new Error("useChartWidgets must be used within a ChartWidgetsProvider");
    }
    return context;
};

const ChartWidgetsWindow = forwardRef((props: any, ref) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [prevPage, setPrevPage] = useState(Page.NEW_CHART);
    const [isVisible, setIsVisible] = useState(false);
    const [page, changePage] = useState(props.page);
    const [paramter, setParameter] = useState("test");
    const [link, setLink] = useState("test");
    const [fullWindow, setFullWindow] = useState(false);
    const {closeComments} = useCommentWindowStore();

    const setPage = (pageName: string, parameterName?: string, linkName?: string) => {
        setPrevPage(page);
        changePage(pageName);
        setParameter(parameterName || "");
        setLink(linkName || "");
    };

    const openWindow = () => setIsVisible(true);
    const closeWindow = () => setIsVisible(false);

    useImperativeHandle(ref, () => ({
        openWindow,
    }));

    useEffect(() => {
      
        const openWindowHandler = (event: CustomEvent) => {
            setPage(event.detail?.page || Page.NEW_CHART, event.detail?.parameter || "test");
            
            closeComments();
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
                link,
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
                                    <img src="/img/icons/close.svg" alt="Close" />
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
                {fullWindow && <>{page === Page.NEW_DRAWING && <DrawingModal id={paramter} />}</>}
                {fullWindow && <>{page === Page.EDIT_TEMPLATE && <EditTemplateModal />}</>}
            </div>
        </ChartWidgetsContext.Provider>
    );
});

export default ChartWidgetsWindow;
