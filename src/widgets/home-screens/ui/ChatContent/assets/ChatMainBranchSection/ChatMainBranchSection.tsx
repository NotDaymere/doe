import React, { useState } from 'react';
import './ChatMainBranchSection.less';
import { useChatStore } from "../../../../../../shared/providers";
import ThreeVerticalDots from "../../../../../../shared/icons/ThreeVerticalDots";
import BranchIcon from "../../../../../../shared/icons/Branch.icon";
import BranchQuickView from "../BranchQuickView/BranchQuickView";
import OpenBranchMenu from "../OpenBranchMenu/OpenBranchMenu";
import { IBranch } from "../../../../../../shared/types/Branch";

interface ChatMessageDateProps {
    branch?: IBranch;
    isOpenBrunch?: boolean;
}

const ChatBranchSection: React.FC<ChatMessageDateProps> = ({branch,  isOpenBrunch = false }) => {
    const {
        currentBranch,
        savedBranches,
        setCurrentBranch,
        setIsCurrentBranchOpen,
        isCurrentBranchOpen
    } = useChatStore();
    const [isActiveBranchMenu, setIsActiveBranchMenu] = useState<boolean>(false);

    const branchToDisplay = isOpenBrunch
        ? currentBranch
        : branch;

    if (!branchToDisplay) return null;

    const text = branchToDisplay.name;

    const handleContainerClick = (e: React.MouseEvent) => {
        if(!isCurrentBranchOpen){
            const target = e.target as HTMLElement;
            if (target.closest('.quick-view-branches-container')) {
                return;
            }
            setCurrentBranch(branchToDisplay);
            setIsCurrentBranchOpen(true);
        }else {
            setIsActiveBranchMenu(!isActiveBranchMenu)
        }
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsActiveBranchMenu(true);
    };

    return (
        <div className="chat-main-branch-section-container">
            <div
                className="chat-main-branch-section"
                onClick={handleContainerClick}
            >
                <BranchIcon width={16} height={16} fill="currentColor" />
                <span className="chat-main-text">
                    <span>{text}</span>
                </span>
                <button className="branch-options-button" onClick={handleButtonClick}>
                    <ThreeVerticalDots fill="currentColor" />
                </button>
                {(isActiveBranchMenu && branchToDisplay.id && !isCurrentBranchOpen) && (
                    <BranchQuickView
                        isOpenFromChat={true}
                        branchId={branchToDisplay.id}
                        changeIsActiveBranchQuickView={setIsActiveBranchMenu}
                    />
                )}
                {(isActiveBranchMenu && branchToDisplay.id && isCurrentBranchOpen) && (
                    <OpenBranchMenu
                        branchId={branchToDisplay.id}
                        changeIsActiveBranchQuickView={setIsActiveBranchMenu}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatBranchSection;
