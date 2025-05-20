import { memo } from "react";
import { ReactComponent as BackIcon } from "src/assets/icons/back.svg";
import { ReactComponent as BubbleIcon } from "src/assets/icons/bubble.svg";
import { ReactComponent as InsertIcon } from "src/assets/icons/insert.svg";
import css from "./BranchesSubmenu.module.less";

interface BranchesSubmenuProps {
    items: { id: string; title: string }[];
    isCursor?: boolean;
}

const BranchesSubmenu = ({ items, isCursor }: BranchesSubmenuProps) => {
    return (
        <div className={css.submenu_wrapper}>
            <div className={css.submenu_header}>
                <div className={css.submenu_title}>
                    <InsertIcon className={css.insert_icon} /> Quick View
                </div>
                <button data-step={`${isCursor && "branches-item"}`}>
                    <BackIcon className={css.back_icon} />
                </button>
            </div>
            <div className={css.submenu_body}>
                {items.map((sub) => (
                    <div key={sub.id} className={css.submenu_item}>
                        <BubbleIcon />
                        {sub.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(BranchesSubmenu);
