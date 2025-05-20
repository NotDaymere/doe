import HistoryIcon from "src/shared/icons/HistoryIcon";
import './HistoryButton.less';
import { useVersionHistoryStore } from "src/shared/providers";

export default function HistoryButton({ id }: {id: string | null}){
    const { openHistory, setOpenHistory } = useVersionHistoryStore();
    const handlerOpenHistoryPlayground  = () => {
        setOpenHistory(id);
    }

    return (
        <button onClick={handlerOpenHistoryPlayground}
            className={`history-button ${openHistory && 'display-none'}`}>
            <HistoryIcon />
        </button>
    )
}