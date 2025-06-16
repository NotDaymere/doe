import './HistoryPlayground.less'
import CloseIcon from "src/shared/icons/CloseIcon";
import LinesIcon from "src/shared/icons/LinesIcon";
import HistoryIcon from "src/shared/icons/HistoryIcon";
import { useVersionHistoryStore } from "src/shared/providers";
import ThreeVerticalDots from "src/shared/icons/ThreeVerticalDots";
import { useEffect, useRef, useState } from "react";
import HistoryPlaygroundMenu from "./HistoryPlaygroundMenu/HistoryPlaygroundMenu";

export default function HistoryPlayground() {
    const { openHistory, setOpenHistory, getHistoryByPlaygroundId } = useVersionHistoryStore();
    const [openContent, setOpenContent] = useState<boolean>(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [activeMenu, setActiveMenu] = useState<boolean>(false);

    const historyArray = getHistoryByPlaygroundId(openHistory);
    const handlerCloseHistoryPlayground  = () => {
        setOpenHistory(null);
    }
    return (
        <div className={'history-playground-container'}>
            <div className={'history-playground-header'}>
                <span className={'history-playground-header-title'}>
                    <HistoryIcon /> <h2 className={'version-history-text'}>Version history</h2>
                </span>
                <span className={'history-playground-header-actions'}>
                    <LinesIcon />
                    <button className={'history-playground-header-button-close'}
                            onClick={handlerCloseHistoryPlayground}>
                        <CloseIcon className={'close'} />
                    </button>
                </span>
            </div>
            <div className={'history-playground-body'}>
                <div className={'history-playground-content-line'} />
                <div className={'history-playground-version'}>
                    <div className={'history-playground-version-left'}>
                        <button className={'history-playground-version-indicator-button'}
                                onClick={() => {
                                }}
                        >
                            <div className={'history-playground-version-indicator-dot'} />
                        </button>
                        <div className={'history-playground-version-text'}>Current version</div>
                    </div>
                    <button
                        className={'history-playground-version-button'}
                        onClick={() => {
                            setOpenContent(!openContent);
                        }}
                    >
                        {openContent ? (
                            <div className="history-playground-minus" />
                        ) : (
                            <div className="history-playground-plus">
                                <div className="horizontal" />
                                <div className="vertical" />
                            </div>
                        )}
                    </button>
                </div>
                {openContent && historyArray.map((history, index) => {
                    return (
                        <div
                            className={`history-playground-content ${hoveredId == history.id &&  'history-playground-content-active'}`}
                            key={history.id}
                            onMouseEnter={() => {
                                if (activeMenu) return
                                setHoveredId(history.id);
                            }}
                        >
                            <div className={"history-playground-content-value"}>
                                {history.name && <div className={"history-playground-content-value-time"}>
                                    {history.name}
                                    <div className={"history-playground-content-dot"} />
                                </div>}
                                <div className={!history.name ? "history-playground-content-value-time" : "history-playground-content-value-time-name"}>
                                    {history.time}
                                    {!history.name && <div className={"history-playground-content-dot"} />}
                                </div>
                                <div className={"history-playground-content-value-user"}>
                                    <img className={"history-playground-content-value-user-img"}
                                         src={history.photo} />
                                    {history.user}
                                </div>
                            </div>
                            <div className={"history-playground-content-menu-block"}>
                                <button
                                    className={"history-playground-content-dots-menu-button"}
                                    onClick={() => {
                                        setActiveMenu(!activeMenu);
                                    }}
                                >
                                    <ThreeVerticalDots />
                                </button>

                                {activeMenu && <HistoryPlaygroundMenu
                                    history={history}
                                    setActiveMenu={setActiveMenu}
                                />}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}
