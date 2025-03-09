import './OpenBranchMenu.less';
import { useEffect, useRef, useState } from "react";
import DialogIcon from "../../../../../../shared/icons/Dialog.icon";
import DeleteIcon from "../../../../../../shared/icons/DeleteIcon";
import { useChatStore } from "../../../../../../shared/providers";
import CloseBranchIcon from "../../../../../../shared/icons/CloseBranch.icon";


type BranchQuickViewProps = {
    branchId: number;
    changeIsActiveBranchQuickView: (isActive: boolean) => void;
};

type AnimationState = "enter" | "visible" | "exit";

export default function OpenBranchMenu({
                                            branchId,
                                            changeIsActiveBranchQuickView,
                                        }: BranchQuickViewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const deleteSavedBranch = useChatStore(state => state.deleteSavedBranch);
    const { setIsCurrentBranchOpen, setCurrentBranch } = useChatStore();
    const [animationState, setAnimationState] = useState<AnimationState>("enter");

    useEffect(() => {
        setAnimationState("visible");
    }, []);

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

    const stopPropagationWrapper = (e: React.MouseEvent) => e.stopPropagation();

    const handleCloseBranchClick = () => {
        setIsCurrentBranchOpen(false);
    };

    const handleDeleteBranchClick = () => {
        deleteSavedBranch(branchId);
        setIsCurrentBranchOpen(false);
        setCurrentBranch(null);
    };

    return (
        <div
            ref={containerRef}
            className={`quick-view-branches-container ${animationState}`}
            onClick={stopPropagationWrapper}
            onMouseEnter={stopPropagationWrapper}
            onMouseMove={stopPropagationWrapper}
            onMouseOut={stopPropagationWrapper}
        >
            <button className="quick-view-branches-menu-button" onClick={handleCloseBranchClick}>
                <CloseBranchIcon fill={"currentColor"} />
                <span>Close Branch</span>
            </button>
            <svg width="118" height="1" viewBox="0 0 118 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="118" y2="0.5" stroke="#F8F8F8" />
            </svg>

            <button className="quick-view-branches-menu-button" onClick={handleDeleteBranchClick}>
                <DeleteIcon fill={"currentColor"} />
                <span className={"text-margin-bottom"}>Delete Branch</span>
            </button>
        </div>
    );
}
