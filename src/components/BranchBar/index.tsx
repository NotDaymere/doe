import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as Dots } from "src/assets/icons/dots.svg";
import { ReactComponent as Arrows } from "src/assets/icons/opposing-arrows.svg";
import { useCursor } from "src/contexts/CursorContext";
import BranchIcon from "src/shared/icons/Branch.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import css from "./BranchBar.module.less";

interface BranchBarProps {
    withDots?: boolean;
    step?: number;
}

export const BranchBar = ({ withDots, step }: BranchBarProps) => {
    const { cursorMoving } = useCursor();
    const branchRef = useRef<HTMLDivElement>(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    useEffect(() => {
        if (branchRef.current) {
            setTimeout(() => {
                branchRef?.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            }, 100);
        }
    }, []);

    return (
        <div
            className={clsx(css.branch_bar, {
                [css.margin_top]: step && step >= 40,
                [css.text_gradient]: step === 41,
            })}
            ref={branchRef}
        >
            <BranchIcon data-step="branch-bar" className={css.branch_icon} />
            Create a simple project for me in any language.
            {withDots && (
                <button onClick={() => setIsOpenMenu((prev) => !prev)}>
                    <Dots className={css.dots} data-step="branch-dots" />
                    {step === 41 && !cursorMoving && (
                        <div className={css.bar_menu}>
                            <div className={clsx(css.bar_menu_item, { [css.active]: step === 41 })}>
                                <Arrows className={css.arrow_icon} /> <p>Close Branch</p>
                            </div>
                            <div className={css.bar_menu_item}>
                                <TrashIcon className={css.trash_icon} /> <p>Delete Branch</p>
                            </div>
                        </div>
                    )}
                </button>
            )}
        </div>
    );
};
