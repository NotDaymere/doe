import clsx from "clsx";
import React from "react";
import { useCursor } from "src/contexts/CursorContext";
import css from "./MagicMenuButton.module.less";

interface Props {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    hasMenu?: boolean;
    dataStep?: string;
    step?: number;
    triggerStep?: number;
}

export const MagicMenuButton: React.FC<Props> = ({
    icon,
    text,
    onClick,
    className,
    hasMenu,
    dataStep,
    step,
    triggerStep,
}) => {
    const { cursorMoving } = useCursor();
    const isActive = triggerStep && step === triggerStep && !cursorMoving;

    return (
        <button
            className={clsx(css.magicBtn, className, {
                [css.active]: isActive,
            })}
            onClick={onClick}
            aria-label={text}
            data-step={dataStep}
        >
            <div className={css.magicBtn_row}>
                <span className={css.magicBtn_icon}>{icon}</span>
                <span className={css.magicBtn_text}>{text}</span>
            </div>
            {hasMenu && <span className={css.magicBtn_hasMenu} data-has-menu />}
            {isActive && <span className={css.magicBtn_plus}>+</span>}
        </button>
    );
};
