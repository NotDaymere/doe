import { useState, useRef } from "react";
import "./PreviewWidgetBox.less";
import { useChartWidgets } from "../../../../Window/ChartWidgetsWindow";
import { Page } from "../../../../Enums/Page.enum";

function PreviewWidgetBox() {
    const { setPage, paramter, link } = useChartWidgets();

    return (
        <div className="widgetpreview">
            <button
                className="previewClose"
                onClick={() => {
                    setPage(Page.WIDGET_IN_CHAT);
                }}
            >
                <img src="/img/icons/closePreview.svg" alt="Close" />
            </button>
            <div className="previewHead">
                <div className="previewbuttons">
                    <button>
                        <img src="/img/icons/widgetprv_collapse.svg" alt="Collapse" />
                    </button>
                    <button>
                        <img src="/img/icons/widgetprv_fullscreen.svg" alt="Fullscreen" />
                    </button>
                </div>
                <div className="previewtitle">
                    <p>{paramter}</p>
                </div>
                <div className="widgetIcon">
                    <img src="/img/icons/norton.svg" alt="Icon" />
                </div>
            </div>
            <div className="previewBody">
                <iframe src={link}></iframe>
            </div>
        </div>
    );
}

export default PreviewWidgetBox;
