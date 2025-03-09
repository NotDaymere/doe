import DeleteIcon from "../../../../../../shared/icons/DeleteIcon";
import "./AllBranchesMenu.less";
import QuickViewIcon from "../../../../../../shared/icons/QuickView.icon";
import DialogIcon from "../../../../../../shared/icons/Dialog.icon";
import { useChatStore } from "../../../../../../shared/providers";
import { useState } from "react";
import BranchQuickView from "../BranchQuickView/BranchQuickView";

interface AllBranchesMenuProps {
    branchId: number;
    position: {
        top: number;
        right: number;
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
        <div className="all-branches-menu-container" style={{ top: position.top, right: position.right }}>
            <button className="all-branches-menu-button" onClick={handleQuickViewClick}>
                <QuickViewIcon fill={"currentColor"} />
                <span>Quick View</span>
            </button>
            <svg width="118" height="1" viewBox="0 0 118 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="118" y2="0.5" stroke="#F8F8F8" />
            </svg>

            <button className="all-branches-menu-button" onClick={handleOpenBranchClick}>
                <DialogIcon fill={"currentColor"} />
                <span>Open Branch</span>
            </button>
            <svg width="118" height="1" viewBox="0 0 118 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="118" y2="0.5" stroke="#F8F8F8" />
            </svg>

            <button className="all-branches-menu-button" onClick={handleDeleteBranchClick}>
                <DeleteIcon fill={"currentColor"} />
                <span className={"text-margin-bottom"}>Delete Branch</span>
            </button>
            {isActiveBranchQuickView &&
                <BranchQuickView
                    branchId={branchId}
                    changeIsActiveBranchQuickView={setIsActiveBranchQuickView}
                />
            }
        </div>
    );
}
