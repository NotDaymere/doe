import { FC, ReactElement } from "react";
import DoubleRoundedNode from "../DoubleRoundedNode";
import css from "./InfoCardNode.module.less";

export interface IInfoCardNode {
    icon: ReactElement;
    title: string;
}

const InfoCardNode: FC<IInfoCardNode> = ({ icon, title }) => (
    <DoubleRoundedNode>
        {icon}
        <span className={css.innerText}>{title}</span>
    </DoubleRoundedNode>
);

export default InfoCardNode;
