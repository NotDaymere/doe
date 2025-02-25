import './HistoryPlayground.less'
import CloseIcon from "src/shared/icons/CloseIcon";
import LinesIcon from "src/shared/icons/LinesIcon";
import HistoryIcon from "src/shared/icons/HistoryIcon";
import { useVersionHistoryStore } from "src/shared/providers";
import MinusIcon from "../../../../../../shared/icons/MinusIcon";

export default function HistoryPlayground() {
    const { setOpenHistory } = useVersionHistoryStore();
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
                <div className={'history-current-version'}>
                    <button className={'history-current-version-indicator-button'} onClick={() => {}}>
                        <div className={'history-current-version-indicator-dot'} />
                    </button>
                    <button className={'history-current-version-button'} onClick={() => {}}>
                        <div className={'history-current-minus'} />
                    </button>
                </div>
            </div>
        </div>
    );
}
