import clsx from "clsx";
import React from "react";
import { ReactComponent as PlusIcon } from "src/assets/icons/plus.svg";
import { useCursor } from "src/contexts/CursorContext";
import css from "./OnboardingMagicMenuButton.module.less";

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

export const OnboardingMagicMenuButton: React.FC<Props> = ({
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
    const isActivePlus = triggerStep && step === triggerStep && step !== 45.1 && !cursorMoving;
    const isActiveCircle = triggerStep && step === triggerStep && step === 45.1 && !cursorMoving;

    return (
        <button
            className={clsx(css.magicBtn, className, {
                [css.active]: isActivePlus || isActiveCircle,
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
            {isActivePlus && (
                <span className={css.magicBtn_plus}>
                    <PlusIcon />
                </span>
            )}
            {isActiveCircle && <span className={css.magicBtn_circle} />}
        </button>
    );
};
