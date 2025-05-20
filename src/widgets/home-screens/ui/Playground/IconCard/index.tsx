import classNames from "classnames";
import { FC, ReactElement } from "react";
import css from "./IconCard.module.less";

interface IProps {
    classes: string;
    icon: ReactElement;
}

const IconCard: FC<IProps> = ({ classes, icon }) => (
    <div className={classNames(css.iconCard, classes)}>{icon}</div>
);

export default IconCard;
