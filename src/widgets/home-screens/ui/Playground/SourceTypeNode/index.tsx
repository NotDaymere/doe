import classNames from "classnames";
import { FC, ReactElement } from "react";
import ExpandIcon from "src/shared/icons/Expand.icon";
import IconCard from "../IconCard";
import { ISourceTypeNode, SourceType } from "src/shared/types/Playground";
import css from "./SourceTypeNode.module.less";

export interface IProps extends ISourceTypeNode {
    icon: ReactElement;
    title: string;
    type: SourceType;
    onOpenResource: (type: SourceType) => void;
    isActiveButton: boolean;
}

const SourceTypeNode: FC<IProps> = ({ icon, title, type, onOpenResource, isActiveButton }) => (
    <div className={css.sourceTypeNode}>
        <div className={css.type}>
            <IconCard classes={css[title.toLowerCase()]} icon={icon} />
            <span className={css.title}>{title}</span>
        </div>
        <button
            className={classNames(css.sourceTypeIcon, css.expandIcon, {
                [css.expandIconActive]: isActiveButton,
            })}
            onClick={() => onOpenResource(type)}
        >
            <ExpandIcon width={14} height={12} />
        </button>
    </div>
);

export default SourceTypeNode;
