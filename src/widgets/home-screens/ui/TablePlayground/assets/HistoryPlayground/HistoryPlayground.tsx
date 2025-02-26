import './HistoryPlayground.less'
import CloseIcon from "src/shared/icons/CloseIcon";
import LinesIcon from "src/shared/icons/LinesIcon";
import HistoryIcon from "src/shared/icons/HistoryIcon";
import { useVersionHistoryStore } from "src/shared/providers";
import ThreeVerticalDots from "../../../../../../shared/icons/ThreeVerticalDots";
import { useState } from "react";

export default function HistoryPlayground() {
    const { setOpenHistory, historyArray } = useVersionHistoryStore();
    const [openContent, setOpenContent] = useState<boolean>(false);
    const handlerCloseHistoryPlayground  = () => {
        setOpenHistory(false);
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
                    <button className={'history-playground-version-button'}
                            onClick={() => {
                                setOpenContent(!openContent)
                            }}
                    >
                        <div className={'history-playground-minus'} />
                    </button>
                </div>
                {openContent && historyArray.map((history, index) => {
                    return (
                        <div
                            className={`history-playground-content`}
                            key={history.id}
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
                            <button
                                className={"history-playground-content-dots-menu-button"}
                                onClick={() => {
                                }}
                            >
                                <ThreeVerticalDots />
                            </button>

                        </div>
                    )
                })}
            </div>
        </div>
    );
}
