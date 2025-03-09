import React from 'react';
import './ChatBranchSection.less';
import { useChatStore } from "../../../../../../shared/providers";
import ThreeVerticalDots from "../../../../../../shared/icons/ThreeVerticalDots";
import BranchIcon from "../../../../../../shared/icons/Branch.icon";

interface ChatMessageDateProps {
    messageId?: number;
    isOpenBrunch?: boolean;
}

const ChatBranchSection: React.FC<ChatMessageDateProps> = ({ messageId, isOpenBrunch = false }) => {
    const { currentBranch, savedBranches, setCurrentBranch, setIsCurrentBranchOpen } = useChatStore();

    const branchToDisplay = isOpenBrunch
        ? currentBranch
        : savedBranches.find(b => b.mainMessageId === messageId);

    if (!branchToDisplay) return null;

    if (!isOpenBrunch) {
        if (branchToDisplay.mainMessageId !== messageId) return null;
        const foundMessage = branchToDisplay.messages.find(message => message.id === messageId);
        if (!foundMessage) return null;
    }

    const text = branchToDisplay.name;

    const handleContainerClick = () => {
        setCurrentBranch(branchToDisplay);
        setIsCurrentBranchOpen(true);
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="chat-branch-section-container">
            <div className="chat-branch-section" onClick={handleContainerClick}>
                <BranchIcon width={16} height={16} fill="currentColor" />
                <span className="chat-text">
                    <span className="normal-text">{text}</span>
                    <span className="gradient-text">{text}</span>
                </span>
                <button className="branch-options-button" onClick={handleButtonClick}>
                    <ThreeVerticalDots fill="currentColor" />
                </button>
            </div>
        </div>
    );
};

export default ChatBranchSection;
