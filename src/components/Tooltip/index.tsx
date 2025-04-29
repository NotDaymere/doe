import clsx from "clsx";
import React from "react";
import css from "./Tooltip.module.less";

interface TooltipProps {
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    stressed?: boolean;
}

export function Tooltip({ children, position = "top", className, stressed }: TooltipProps) {
    return (
        <div
            className={clsx(css.tooltip, css[`tooltip--${position}`], className, {
                [css["tooltip--stressed"]]: stressed,
            })}
        >
            <div className={clsx(css.tooltip__arrow, css[`tooltip__arrow--${position}`])} />
            <div className={css.tooltip__content}>{children}</div>
        </div>
    );
}
