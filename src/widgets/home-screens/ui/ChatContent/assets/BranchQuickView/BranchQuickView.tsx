import './BranchQuickView.less';
import { useEffect, useRef, useState } from "react";
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg";
import { useChatStore } from "src/shared/providers";
import BranchIcon from "../../../../../../shared/icons/Branch.icon";
import { IBranchDialog } from "../../../../../../shared/types/BranchDialog";
import BranchQuickViewIcon from "../../../../../../shared/icons/BranchQuickView.icon";
import BackArrowIcon from "../../../../../../shared/icons/BackArrow.icon";
import DialogIcon from "../../../../../../shared/icons/Dialog.icon";

type BranchQuickViewProps = {
    branchId: number;
    changeIsActiveBranchQuickView: (isActive: boolean) => void;
};

type AnimationState = "enter" | "visible" | "exit";

export default function BranchQuickView({ branchId, changeIsActiveBranchQuickView }: BranchQuickViewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const branch = useChatStore(state => state.getBranchById(branchId));

    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);
    const [contentIdHover, setContentIdHover] = useState<number | null>(null);
    const [animationState, setAnimationState] = useState<AnimationState>("enter");

    useEffect(() => {
        setAnimationState("visible");
    }, []);

    const contentMouseUp = (id: number | null) => {
        setContentIdHover(id);
    };

    const contentMouseDown = () => {
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
        const element = document.createElement('div');
        element.innerHTML = html;
        return element.textContent || element.innerText || "";
    };

    if (!branch) {
        return (
            <div className={`quick-view-branches-container ${animationState}`} ref={containerRef}>
                <div className="quick-view-branches-header">
                    <div className="quick-view-branches-header-text">
                        <BranchQuickViewIcon />
                        <span>Quick View</span>
                    </div>
                    <button
                        className="quick-view-branches-header-button"
                        onClick={handleClose}
                    >
                        <BackArrowIcon />
                    </button>
                </div>
                <svg width="100%" height="2" viewBox="0 0 293 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="4.37114e-08" y1="0.5" x2="293" y2="0.500026" stroke="#F8F8F8" />
                </svg>
                <div className="quick-view-branches-content">
                    <div className="quick-view-branches-content">
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`quick-view-branches-container ${animationState}`}>
            <div className="quick-view-branches-header">
                <div className="quick-view-branches-header-text">
                    <BranchQuickViewIcon />
                    <span>Quick View</span>
                </div>
                <button
                    className="quick-view-branches-header-button"
                    onClick={handleClose}
                >
                    <BackArrowIcon />
                </button>
            </div>
            <svg width="100%" height="2" viewBox="0 0 293 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4.37114e-08" y1="0.5" x2="293" y2="0.500026" stroke="#F8F8F8" />
            </svg>
            <div className="quick-view-branches-content">
                {branch.dialogsMessages.map((dialog: IBranchDialog, index: number) => (
                    <div
                        key={index}
                        className={`quick-view-branches-content-example 
                            ${
                            (contentIdHover === index) ||
                            (activeOpenAllBranchesMenu === index)
                                ? 'quick-view-branches-content-example-hover'
                                : ''
                        }`}
                        onMouseMove={() => contentMouseUp(index)}
                        onMouseOut={contentMouseDown}
                    >
                        <div className="quick-view-branches-content-name">
                            <DialogIcon width={16} height={16} fill={"#5B5B5BFF"} />
                            <p>{stripHTML(dialog.userRequest.content).slice(0, 50)}...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
