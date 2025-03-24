import React from "react";
import PenIcon from "../../../../../../shared/icons/Pen.icon";
import TrashIcon from "../../../../../../shared/icons/Trash.icon";
import css from "./BookmarksActions.module.less"

interface BookmarksActionsProps {
    position: {
        top: number;
        right: number;
    };
    onRename: () => void;
    onDelete: () => void;
}

export const BookmarksActions = ({ position, onRename, onDelete }: BookmarksActionsProps) => {
    return (
        <div className={css.bookmarks_actions_container} style={{ top: position.top, right: position.right }}>
            <div
                className={css.bookmarks_action}
                onClick={onRename}>
                <div className={css.pen_icon}>
                    <PenIcon width={12} height={12} fill="currentColor" />
                </div>
                <div>Rename</div>
            </div>
            <div
                className={css.bookmarks_action}
                onClick={onDelete}>
                <div className={css.icon}>
                    <TrashIcon />
                </div>
                <div>Delete</div>
            </div>
        </div>
    )
}