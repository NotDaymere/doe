import HistoryIcon from "src/shared/icons/HistoryIcon";
import './HistoryButton.less';
import { useVersionHistoryStore } from "src/shared/providers";

export default function HistoryButton(){
    const { openHistory, setOpenHistory } = useVersionHistoryStore();
    const handlerOpenHistoryPlayground  = () => {
        setOpenHistory(!openHistory);
    }

    return (
        <button onClick={handlerOpenHistoryPlayground}
            className={'history-button'}>
            <HistoryIcon />
        </button>
    )
}