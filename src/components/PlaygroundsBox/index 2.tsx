import clsx from "clsx";
import { memo, useState } from "react";
import { ReactComponent as StarDocIcon } from "src/assets/icons/starDoc.svg";
import { useCursor } from "src/contexts/CursorContext";
import css from "./PlaygroundsBox.module.less";

interface PlaygroundsBoxProps {
    step?: number;
}

const PlaygroundsBox = ({ step }: PlaygroundsBoxProps) => {
    if (!step || step <= 31 || step === 43 || step >= 58) return null;
    const { cursorMoving } = useCursor();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            className={clsx(css.playground_box_wrapper, {
                [css.playground_box_wrapper_open]: step === 34 || isOpen,
                [css.active]: !cursorMoving && (step === 33 || step === 34),
                [css.no_sidebar]: step >= 58,
            })}
            data-step="playgrounds"
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {!isOpen && step !== 34 ? (
                <div className={css.playground_box_container}>
                    <StarDocIcon className={css.stars_icon} />
                </div>
            ) : (
                <div className={css.playground_box_modal}>
                    <div className={css.playground_box_head}>
                        <StarDocIcon /> All Playgrounds
                    </div>
                    <div className={css.playground_box_body}>
                        <button className={css.playground_box_item}>
                            Notes on the Financial Model fo ...
                        </button>
                        <button className={css.playground_box_item}>
                            New Horror Story Writeup - Ghast
                        </button>
                        <button className={css.playground_box_item}>
                            Lean Base Implementation of IVT
                        </button>
                    </div>
                </div>
            )}
        </button>
    );
};

export default memo(PlaygroundsBox);
