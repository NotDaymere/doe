import "./BranchQuickView.less";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "src/shared/providers";
import { IBranchDialog } from "../../../../../../shared/types/BranchDialog";
import BranchQuickViewIcon from "../../../../../../shared/icons/BranchQuickView.icon";
import BackArrowIcon from "../../../../../../shared/icons/BackArrow.icon";
import DialogIcon from "../../../../../../shared/icons/Dialog.icon";

type BranchQuickViewProps = {
    branchId: number;
    changeIsActiveBranchQuickView: (isActive: boolean) => void;
    isOpenFromChat?: boolean;
};

type AnimationState = "enter" | "visible" | "exit";

export default function BranchQuickView({
    branchId,
    changeIsActiveBranchQuickView,
    isOpenFromChat = false,
}: BranchQuickViewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const branch = useChatStore((state) => state.getBranchById(branchId));
    const { setCurrentBranch, setIsCurrentBranchOpen, setCurrentBranchDialog } = useChatStore();
    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);
    const [contentIdHover, setContentIdHover] = useState<number | null>(null);
    const [animationState, setAnimationState] = useState<AnimationState>("enter");

    useEffect(() => {
        setAnimationState("visible");
    }, []);

    const contentMouseUp = (e: React.MouseEvent, id: number | null) => {
        e.stopPropagation();
        setContentIdHover(id);
    };

    const contentMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setContentIdHover(null);
    };

    const handleClose = () => {
        setAnimationState("exit");
        setTimeout(() => {
            changeIsActiveBranchQuickView(false);
        }, 300);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const stripHTML = (html: string): string => {
        const element = document.createElement("div");
        element.innerHTML = html;
        return element.textContent || element.innerText || "";
    };

    const stopPropagationWrapper = (e: React.MouseEvent) => e.stopPropagation();

    if (!branch) {
        return (
            <div
                className={`quick-view-branches-container ${animationState} ${isOpenFromChat ? "quick-view-open-from-chat" : ""}`}
                ref={containerRef}
                onClick={stopPropagationWrapper}
                onMouseEnter={stopPropagationWrapper}
                onMouseMove={stopPropagationWrapper}
                onMouseOut={stopPropagationWrapper}
            >
                <div className="quick-view-branches-header">
                    <div className="quick-view-branches-header-text">
                        <BranchQuickViewIcon />
                        <span>Quick View</span>
                    </div>
                    <button
                        className="quick-view-branches-header-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                    >
                        <BackArrowIcon />
                    </button>
                </div>
                <svg
                    width="100%"
                    height="2"
                    viewBox="0 0 293 1"
                    fill="none"
                    stroke="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="0" y1="0.5" x2="293" y2="0.500026" stroke="inherit" />
                </svg>
                <div className="quick-view-branches-content">
                    <div className="quick-view-branches-content"></div>
                </div>
            </div>
        );
    }

    const handleItemClick = (dialogIndex: number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentBranch(branch);
        setCurrentBranchDialog(dialogIndex);
        setIsCurrentBranchOpen(true);
    };

    return (
        <div
            ref={containerRef}
            className={`quick-view-branches-container ${animationState} ${isOpenFromChat ? "quick-view-open-from-chat" : ""}`}
            onClick={stopPropagationWrapper}
            onMouseEnter={stopPropagationWrapper}
            onMouseMove={stopPropagationWrapper}
            onMouseOut={stopPropagationWrapper}
        >
            <div className="quick-view-branches-header">
                <div className="quick-view-branches-header-text">
                    <BranchQuickViewIcon />
                    <span>Quick View</span>
                </div>
                <button
                    className="quick-view-branches-header-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                >
                    <BackArrowIcon />
                </button>
            </div>
            <svg
                width="100%"
                height="2"
                viewBox="0 0 293 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="0" y1="0.5" x2="293" y2="0.500026" stroke="inherit" />
            </svg>
            <div className="quick-view-branches-content">
                {branch.dialogsMessages.map((dialog: IBranchDialog, index: number) => (
                    <div
                        key={index}
                        className={`quick-view-branches-content-item 
                            ${
                                contentIdHover === index || activeOpenAllBranchesMenu === index
                                    ? "quick-view-branches-content-item-hover"
                                    : ""
                            }`}
                        onMouseMove={(e) => contentMouseUp(e, index)}
                        onMouseOut={(e) => contentMouseDown(e)}
                        onClick={handleItemClick(index)}
                    >
                        <div className="quick-view-branches-content-name">
                            <DialogIcon width={16} height={16} />
                            <p>{stripHTML(dialog.userRequest.content).slice(0, 50)}...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
