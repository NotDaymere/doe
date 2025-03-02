import { FC } from "react";
import css from "./MagicMenuItem.module.less";
import RightIcon from "src/shared/icons/Right.icon";
import classNames from "classnames";

interface IProps {
    item: any;
}

const MagicMenuItem: FC<IProps> = ({ item }) => (
    <button className={classNames(css.magicMenuItem, css[item.classes])} onClick={item.onClick}>
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
