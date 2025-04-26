import DeleteIcon from "../../../../../../shared/icons/DeleteIcon";
import "./AllBranchesMenu.less";
import QuickViewIcon from "../../../../../../shared/icons/QuickView.icon";
import DialogIcon from "../../../../../../shared/icons/Dialog.icon";
import { useChatStore } from "../../../../../../shared/providers";
import { useState } from "react";
import BranchQuickView from "../BranchQuickView/BranchQuickView";
import ReactDOM from 'react-dom';

interface AllBranchesMenuProps {
    branchId: number;
    position: {
        top: number;
        left: number;
    };
    setActiveOpenAllBranchesMenu: (id: number | null) => void;
}

export default function AllBranchesMenu({ branchId, position, setActiveOpenAllBranchesMenu }: AllBranchesMenuProps) {
    const deleteSavedBranch = useChatStore(state => state.deleteSavedBranch);
    const [isActiveBranchQuickView, setIsActiveBranchQuickView] = useState<boolean>(false);
    const { setIsCurrentBranchOpen, setCurrentBranch } = useChatStore();

    const handleQuickViewClick = () => {
        setIsActiveBranchQuickView(true)
    };

    const handleOpenBranchClick = () => {
        setCurrentBranch(branchId);
        setIsCurrentBranchOpen(true);
        setActiveOpenAllBranchesMenu(null);
    };

    const handleDeleteBranchClick = () => {
        deleteSavedBranch(branchId);
        setActiveOpenAllBranchesMenu(null);
        setCurrentBranch(null);
    };

    return (
        <div className="all-branches-menu-container" style={{ top: position.top, left: position.left }}>
            <button className="all-branches-menu-button" onClick={handleQuickViewClick}>
                <QuickViewIcon fill={"currentColor"} />
                <span>Quick</span><span>View</span>
            </button>
            <svg
                width="118"
                height="1"
                viewBox="0 0 118 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line y1="0.5" x2="118" y2="0.5" />
            </svg>

            <button className="all-branches-menu-button" onClick={handleOpenBranchClick}>
                <DialogIcon fill={"currentColor"} />
                <span>Open</span> <span>Branch</span>
            </button>
            <svg
                width="118"
                height="1"
                viewBox="0 0 118 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line y1="0.5" x2="118" y2="0.5" />
            </svg>

            <button className="all-branches-menu-button" onClick={handleDeleteBranchClick}>
                <DeleteIcon fill={"currentColor"} />
                <span className={"text-margin-bottom"}><span>Delete</span><span>Branch</span></span>
            </button>
            {isActiveBranchQuickView && (
                <BranchQuickView
                    isOpenFromChat={false}
                    branchId={branchId}
                    changeIsActiveBranchQuickView={setIsActiveBranchQuickView}
                />
            )}
        </div>
    );
}
