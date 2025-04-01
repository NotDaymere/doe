import React from "react";
import classNames from "classnames";
import css from "./Popover.module.less";

interface IProps {
    content: JSX.Element;
    classes?: string;
}

const Popover: React.FC<IProps> = ({ content, classes }) => (
    <div className={classNames(css.popover, classes && classes)}>{content}</div>
);

export default Popover;
