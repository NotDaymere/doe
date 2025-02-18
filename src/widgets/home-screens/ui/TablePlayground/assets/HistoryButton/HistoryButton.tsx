import HistoryIcon from "src/shared/icons/HistoryIcon";
import './HistoryButton.less';

export default function HistoryButton()
{
    return (
        <button className={'history-button'}>
            <HistoryIcon />
        </button>
    )
}