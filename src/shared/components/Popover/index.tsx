import React, { useRef, useEffect } from "react";
import css from "./Popover.module.less";
import classNames from "classnames";

interface IProps {
    onClickOutside: (isVisible: boolean) => void;
    content: JSX.Element;
    classes?: string;
}

const Popover: React.FC<IProps> = ({ onClickOutside, content, classes }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            onClickOutside(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={classNames(css.popover, classes && classes)} ref={popoverRef}>
            {content}
        </div>
    );
};

export default Popover;
