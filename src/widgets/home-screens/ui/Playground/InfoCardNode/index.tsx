import { FC, ReactElement } from "react";
import DoubleRoundedNode from "../DoubleRoundedNode";
import { SourceType } from "src/shared/types/Playground";
import css from "./InfoCardNode.module.less";

export interface IProps {
    icon: ReactElement;
    title: string;
    type: SourceType;
    onOpenResource: (type: SourceType) => void;
}

const InfoCardNode: FC<IProps> = ({ icon, title, type, onOpenResource }) => (
    <DoubleRoundedNode onClick={() => onOpenResource(type)}>
        {icon}
        <span className={css.innerText}>{title}</span>
    </DoubleRoundedNode>
);

export default InfoCardNode;
