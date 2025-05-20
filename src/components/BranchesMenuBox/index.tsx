import clsx from "clsx";
import { memo, useState } from "react";
import { useCursor } from "src/contexts/CursorContext";
import BranchIcon from "src/shared/icons/Branch.icon";
import BranchesSubmenu from "../BranchesSubmenu";
import css from "./BranchesMenuBox.module.less";

interface BranchesMenuBoxProps {
    step?: number;
}

interface BranchItem {
    id: string;
    title: string;
    children?: SubBranchItem[];
    isOpenOnStep?: boolean;
}

interface SubBranchItem {
    id: string;
    title: string;
}

const branches: BranchItem[] = [
    {
        id: "1",
        title: "Create a simple project for ...",
        children: [
            { id: "1-1", title: "Now show me this in math mod..." },
            { id: "1-2", title: "Translate this to Java Script" },
            { id: "1-3", title: "Make another version of this co..." },
            { id: "1-4", title: "Now show me this in math mod..." },
            { id: "1-5", title: "Translate this to Java Script" },
            { id: "1-6", title: "Make another version of this co..." },
        ],
        isOpenOnStep: true,
    },
    {
        id: "2",
        title: "The Python Code For ...",
        children: [
            { id: "2-1", title: "Optimize the Python code" },
            { id: "2-2", title: "Explain each step with comments" },
            { id: "2-3", title: "Convert Python code to pseudo-code" },
        ],
    },
    {
        id: "3",
        title: "We Will Write This Co...",
        children: [
            { id: "3-1", title: "Add input validation to the code" },
            { id: "3-2", title: "Refactor code for better readability" },
            { id: "3-3", title: "Expand the code with extra features" },
        ],
    },
];

const BranchesMenuBox = ({ step }: BranchesMenuBoxProps) => {
    if (!step || step <= 34 || step >= 58) return null;
    const { cursorMoving } = useCursor();
    const [isOpen, setIsOpen] = useState(false);
    const [activeBranchId, setActiveBranchId] = useState<string | null>(null);

    const handleBranchClick = (event: React.MouseEvent<HTMLButtonElement>, branchId: string) => {
        event.stopPropagation();
        setActiveBranchId((prev) => (prev === branchId ? null : branchId));
    };

    return (
        <button
            className={clsx(css.branches_box_wrapper, {
                [css.branches_box_wrapper_open]: step === 43 || isOpen,
                [css.active]: !cursorMoving && (step === 42 || step === 43),
                [css.no_sidebar]: step >= 58,
            })}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            {!isOpen && step !== 43 ? (
                <div className={css.branches_box_container} data-step="branches-box">
                    <BranchIcon className={css.stars_icon} />
                </div>
            ) : (
                <div className={css.branches_box_modal}>
                    <div className={css.branches_box_head}>
                        <BranchIcon /> All Branches
                    </div>
                    <div className={css.branches_box_body}>
                        {branches.map((branch) => (
                            <button
                                key={branch.id}
                                className={clsx(css.branches_box_item, {
                                    [css.active_branch]:
                                        activeBranchId === branch.id ||
                                        (branch.isOpenOnStep && step === 43),
                                })}
                                onClick={(e) => handleBranchClick(e, branch.id)}
                            >
                                <BranchIcon className={css.branch_icon} />
                                {branch.title}
                                {(activeBranchId === branch.id ||
                                    (branch.isOpenOnStep && step === 43)) && (
                                    <>
                                        {branch.children && (
                                            <BranchesSubmenu
                                                items={branch.children}
                                                isCursor={branch.isOpenOnStep}
                                            />
                                        )}
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </button>
    );
};

export default memo(BranchesMenuBox);
