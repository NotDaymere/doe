import React from "react";
import PenIcon from "../../../../../../shared/icons/Pen.icon";
import TrashIcon from "../../../../../../shared/icons/Trash.icon";
import css from "./BookmarksActions.module.less"

export const BookmarksActions = () => {
    return (
        <div className={css.bookmarks_actions_container}>
            <div className={css.bookmarks_action_edit}>
                <div className={css.bookmarks_actions_container_edit_icon}>
                    <PenIcon width={12} height={12}/>
                </div>
                <div>Rename</div>
            </div>
            <div className={css.bookmarks_action_delete}>
                <div className={css.bookmarks_actions_container_delete_icon}>
                    <TrashIcon />
                </div>
                <div>Delete</div>
            </div>
        </div>
    )
}