import React from "react";
import classNames from "classnames";
import css from "./Popover.module.less";

interface IProps {
    content: JSX.Element;
    classes?: string;
    position?: { top: number; left: number };
}

const Popover: React.FC<IProps> = ({ content, classes, position }) => {
    return (
        <div className={classNames(css.popover, classes)} style={position
            ? {
                position: "absolute",
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -100%)",
            }
            : undefined}>
            {content}
        </div>
    );
};

export default Popover;
