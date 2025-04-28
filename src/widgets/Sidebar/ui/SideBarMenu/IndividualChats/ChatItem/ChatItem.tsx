import React from "react";
import css from "./ChatItem.module.less";
import { ChatTagsEnum } from "../../../../../../shared/enums/ChatTagsEnum";
import ThreeDotsIcon from "../../../../../../shared/icons/ThreeDotsIcon";
import { TAG_META } from "../../../SideBarMenu/SideBarMenu";

interface ChatItemProps {
    chat: {
        id: string;
        name: string;
        tags?: ChatTagsEnum[];
        notificationsCount: number;
    };
    isOpen: boolean;
    editingId: string | null;
    editingValue: string;
    onStartEdit: (id: string, name: string) => void;
    onChangeEdit: (id: string, value: string) => void;
    onFinishEdit: (id: string, newName: string) => void;
    onToggleExpand: (id: string) => void;
    onOpenActions: (event: React.MouseEvent) => void;
    onTagsClick: (event: React.MouseEvent) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
                                                      chat,
                                                      isOpen,
                                                      editingId,
                                                      editingValue,
                                                      onChangeEdit,
                                                      onFinishEdit,
                                                      onToggleExpand,
                                                      onOpenActions,
                                                      onTagsClick,
                                                  }) => (
    <div className={css.chat_item} data-active={isOpen} onClick={() => onToggleExpand(chat.id)}>
        {editingId === chat.id ? (
            <div className={css.chat_item_editing}>
                <div className={css.chat_tag} style={{ backgroundColor: TAG_META[chat.tags?.[0] || ChatTagsEnum.Gray].color }} />
                <input
                    className={css.edit_chat_input}
                    autoFocus
                    value={editingValue}
                    onChange={e => onChangeEdit(chat.id, e.target.value)}
                    onKeyDown={e => e.key === "Enter" && onFinishEdit(chat.id, editingValue.trim() || chat.name)}
                    onBlur={() => onFinishEdit(chat.id, editingValue.trim() || chat.name)}
                />
            </div>
        ) : (
            <div className={css.chat_item_tag_and_name}>
                <div
                    className={css.tags_wrapper}
                    data-count={Math.min(chat.tags?.length ?? 0, 3)}
                    onMouseDown={e => e.stopPropagation()}
                    onClick={onTagsClick}
                >
                    {chat.tags?.slice(0, 3).map(tag => (
                        <div key={tag} className={css.chat_tag} style={{ backgroundColor: TAG_META[tag].color }}
                             title={chat.name} />
                    ))}
                </div>
                <div className={css.chat_name}>{chat.name}</div>
                <div className={css.chat_notifications_count}>{chat.notificationsCount}</div>
            </div>
        )}
        {editingId !== chat.id && (
            <div className={css.chat_tools}>
                <div
                    onClick={onOpenActions}
                    className={css.three_dots}
                >
                <ThreeDotsIcon />
                </div>
                <div className={css.show_more_btn} data-active={isOpen}>{!isOpen ? "+" : "-"}</div>
            </div>
        )}
    </div>
);
