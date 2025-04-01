import React from "react";
import PenIcon from "../../../../../../shared/icons/Pen.icon";
import TrashIcon from "../../../../../../shared/icons/Trash.icon";
import css from "./IndividalChatsActions.module.less"
import IndividualChatsIcon from "../../../../../../shared/icons/IndividualChatsIcon";

interface IndividualChatsActionsProps {
    position: {
        top: number;
        left: number;
    };
    onRename: () => void;
    onDelete: () => void;
    onOpen: () => void;
    onClose: () => void;
}

export const IndividualChatsActions = ({ position, onClose, onRename, onDelete, onOpen }: IndividualChatsActionsProps) => {
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


    return (
        <div
            className={css.individual_chats_actions_container}
            style={{ top: position.top, left: position.left }}
            ref={containerRef}>
            <div
                className={css.individual_chats_action}
                onClick={onRename}
            >
                <div className={css.pen_icon}>
                    <PenIcon width={12} height={12} fill="currentColor" />
                </div>
                <div>Rename</div>
            </div>
            <div
                className={css.individual_chats_action}
                onClick={onOpen}
            >
                <div className={css.open_chat_icon}>
                    <IndividualChatsIcon fill="currentColor"/>
                </div>
                <div>
                    Open
                </div>
            </div>
            <div
                className={`${css.individual_chats_action} ${css.delete}`}
                onClick={onDelete}>
                <div className={css.individual_chats_actions_container_delete_icon}>
                    <TrashIcon />
                </div>
                <div>Delete</div>
            </div>
        </div>
    )
}