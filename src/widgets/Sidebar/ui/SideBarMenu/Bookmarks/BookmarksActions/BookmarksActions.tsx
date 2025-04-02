import React from "react";
import PenIcon from "../../../../../../shared/icons/Pen.icon";
import TrashIcon from "../../../../../../shared/icons/Trash.icon";
import css from "./BookmarksActions.module.less";
import ReactDOM from "react-dom";

interface BookmarksActionsProps {
    position: {
        top: number;
        right: number;
    };
    onRename: () => void;
    onDelete: () => void;
    onClose: () => void;
}

export const BookmarksActions = ({
                                     position,
                                     onRename,
                                     onDelete,
                                     onClose,
                                 }: BookmarksActionsProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return ReactDOM.createPortal(
        <div
            ref={containerRef}
            className={css.bookmarks_actions_container}
            style={{ top: position.top, right: position.right }}
        >
            <div className={css.bookmarks_action} onClick={onRename}>
                <div className={css.pen_icon}>
                    <PenIcon width={12} height={12} fill="currentColor" />
                </div>
                <div>Rename</div>
            </div>
            <div className={`${css.bookmarks_action} ${css.delete}`} onClick={onDelete}>
                <div className={css.icon}>
                    <TrashIcon />
                </div>
                <div>Delete</div>
            </div>
        </div>,
        document.body
    );
};
