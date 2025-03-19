import classNames from "classnames";
import { FC, ReactElement } from "react";
import RightIcon from "src/shared/icons/Right.icon";
import css from "./MagicMenuItem.module.less";

export interface IMagicMenuItem {
    icon: ReactElement;
    text: string;
    onClick: () => void;
    classes?: string;
    hasMenu?: boolean;
    hasConnection?: boolean;
}

interface IProps {
    item: IMagicMenuItem;
}

const MagicMenuItem: FC<IProps> = ({ item }) => (
    <button
        className={classNames(css.magicMenuItem, item.classes && css[item.classes])}
        onClick={item.onClick}
    >
        {item.icon}
        <span className={css.magicBtn_text}>{item.text}</span>
        {item.hasMenu && (
            <div className={css.hasMenu}>
                <RightIcon width={6} height={9} />
            </div>
        )}
        {item.hasConnection && <div className={css.hasConnection} />}
    </button>
);

export default MagicMenuItem;
