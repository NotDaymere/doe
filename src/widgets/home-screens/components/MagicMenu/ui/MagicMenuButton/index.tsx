import React from "react";
import clsx from "clsx";
import css from "./MagicMenuButton.module.less";

interface Props {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    hasMenu?: boolean;
}

export const MagicMenuButton: React.FC<Props> = ({
    icon,
    text,
    onClick,
    className,
    hasMenu
}) => {
    return (
        <button 
            className={clsx(css.magicBtn, className)}
            onClick={onClick}
            aria-label={text}
        >
            <span className={css.magicBtn_icon}>{icon}</span>
            <span className={css.magicBtn_text}>{text}</span>
            {hasMenu && (
                <span className={css.magicBtn_hasMenu} data-has-menu />
            )}
        </button>
    );
};