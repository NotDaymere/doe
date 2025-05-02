import { useEffect, useRef, useState } from "react";
import "./OpenBranchMenu.less";
import DialogIcon from "../../../../../../shared/icons/Dialog.icon";
import DeleteIcon from "../../../../../../shared/icons/DeleteIcon";
import { useChatStore } from "../../../../../../shared/providers";
import CloseBranchIcon from "../../../../../../shared/icons/CloseBranch.icon";
import ReactDOM from "react-dom";

type BranchQuickViewProps = {
    branchId: number;
    changeIsActiveBranchQuickView: (isActive: boolean) => void;
    clickPosition: { x: number; y: number };
};

type AnimationState = "enter" | "visible" | "exit";

export default function OpenBranchMenu({
    branchId,
    changeIsActiveBranchQuickView,
    clickPosition,
}: BranchQuickViewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const deleteSavedBranch = useChatStore((state) => state.deleteSavedBranch);
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

    const menuStyles: React.CSSProperties = {
        position: "absolute",
        top: `${clickPosition.y + 50}px`,
        left: `${clickPosition.x}px`,
    };

    return ReactDOM.createPortal(
        <div
            ref={containerRef}
            className={`open-menu-branches-container ${animationState}`}
            style={menuStyles}
            onClick={stopPropagationWrapper}
            onMouseEnter={stopPropagationWrapper}
            onMouseMove={stopPropagationWrapper}
            onMouseOut={stopPropagationWrapper}
        >
            <button className="open-menu-branches-menu-button" onClick={handleCloseBranchClick}>
                <CloseBranchIcon fill={"currentColor"} />
                <span>Close Branch</span>
            </button>

            <button className="open-menu-branches-menu-button" onClick={handleDeleteBranchClick}>
                <DeleteIcon fill={"currentColor"} />
                <span className={"text-margin-bottom"}>Delete Branch</span>
            </button>
        </div>,
        document.body
    );
}
