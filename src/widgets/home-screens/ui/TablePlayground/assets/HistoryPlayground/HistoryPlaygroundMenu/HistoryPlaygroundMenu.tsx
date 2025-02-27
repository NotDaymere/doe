import "./HistoryPlaygroundMenu.less";
import { useVersionHistoryStore } from "src/shared/providers";
import HistoryIcon from "src/shared/icons/HistoryIcon";
import PenIcon from "src/shared/icons/Pen.icon";
import { IVersionHistory } from "src/shared/types/VersionHistory";

interface IProps {
    history: IVersionHistory,
    setActiveMenu:  React.Dispatch<React.SetStateAction<boolean>>,
}
export default function HistoryPlaygroundMenu({history, setActiveMenu}
                                              : IProps) {
    const { updateHistory } = useVersionHistoryStore();
    const historyRename = () => {
        const newName = prompt("Enter new name:", history.name || "");
        if (newName !== null && newName.trim() !== "") {
            history.name = newName.trim();
            updateHistory(history);
            setActiveMenu((p: boolean)=> !p);
        }
    }

    return (
        <div className="history-playground-menu-container">
            <button className={'history-playground-menu-button'}
                    onClick={ historyRename }
            >
                <PenIcon className={'pen-icon'}/> Rename
            </button>
            <button className={'history-playground-menu-button'}
                    // onClick={}
            >
                <HistoryIcon/> Restore
            </button>
        </div>
    )
}
