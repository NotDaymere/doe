import { FC, ReactElement } from "react";
import DoubleRoundedNode from "../DoubleRoundedNode";
import css from "./InfoCardNode.module.less";

export interface IProps {
    icon: ReactElement;
    title: string;
}

const InfoCardNode: FC<IProps> = ({ icon, title }) => (
    <DoubleRoundedNode>
        {icon}
        <span className={css.innerText}>{title}</span>
    </DoubleRoundedNode>
);

export default InfoCardNode;
