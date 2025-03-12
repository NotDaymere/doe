import "./OpenAllBranches.less";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg";
import { useChatStore } from "src/shared/providers";
import ThreeVerticalDots from "../../../../../../shared/icons/ThreeVerticalDots";
import BranchIcon from "../../../../../../shared/icons/Branch.icon";
import AllBranchesMenu from "../AllBranchesMenu/AllBranchesMenu";

type OpenAllBranchesProps = {
    changeActiveAllBranches: () => void;
};

type AnimationState = "enter" | "visible" | "exit";

export default function OpenAllBranches({ changeActiveAllBranches }: OpenAllBranchesProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { savedBranches } = useChatStore();

    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);
    const [contentIdHover, setContentIdHover] = useState<number | null>(null);
    const [animationState, setAnimationState] = useState<AnimationState>("enter");
    const menuPosition = { top: 36, right: -150 };

    useEffect(() => {
        setAnimationState("visible");
    }, []);

    const contentMouseUp = (id: number | null) => {
        setContentIdHover(id);
    };

    const contentMouseDown = () => {
        setContentIdHover(null);
    };

    const changeActiveOpenAllBranchesMenu = (id: number | null) => {
        if (activeOpenAllBranchesMenu === id) {
            setActiveOpenAllBranchesMenu(null);
            return;
        }
        setActiveOpenAllBranchesMenu(id);
    };

    const handleClose = () => {
        setAnimationState("exit");
        setTimeout(() => {
            changeActiveAllBranches();
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

    return ReactDOM.createPortal(
        <div ref={containerRef} className={`open-all-branches-container ${animationState}`}>
            <div className="open-all-branches-header">
                <div className="open-all-branches-header-text">
                    <BranchIcon />
                    <span>All Branches</span>
                </div>
                <button className="open-all-branches-header-button" onClick={handleClose}>
                    <DecreasePlaygroundIcon />
                </button>
            </div>
            <div className="open-all-branches-content">
                {savedBranches.map((savedBranch) => (
                    <div
                        key={savedBranch.id}
                        className={`open-all-branches-content-item 
                            ${
                                contentIdHover === savedBranch.id ||
                                activeOpenAllBranchesMenu === savedBranch.id
                                    ? "open-all-branches-content-example-hover"
                                    : ""
                            }
                        `}
                        onMouseMove={() => contentMouseUp(savedBranch.id)}
                        onMouseOut={contentMouseDown}
                    >
                        <div className="open-all-branches-content-name">
                            <BranchIcon width={16} height={16} fill={"currentColor"} />
                            <p>{stripHTML(savedBranch.name)}</p>
                        </div>
                        {(contentIdHover === savedBranch.id ||
                            activeOpenAllBranchesMenu === savedBranch.id) && (
                            <button
                                className="open-all-branches-content-example-button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    changeActiveOpenAllBranchesMenu(savedBranch.id);
                                }}
                            >
                                <span
                                    className={`
                                    ${activeOpenAllBranchesMenu === savedBranch.id ? "active-branch-menu" : ""}
                                `}
                                >
                                    <ThreeVerticalDots fill={"currentColor"} />
                                </span>
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {activeOpenAllBranchesMenu && (
                <AllBranchesMenu
                    position={menuPosition}
                    branchId={activeOpenAllBranchesMenu}
                    setActiveOpenAllBranchesMenu={setActiveOpenAllBranchesMenu}
                />
            )}
        </div>,
        document.body
    );
}
