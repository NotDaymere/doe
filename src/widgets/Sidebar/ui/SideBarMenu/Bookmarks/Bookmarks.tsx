import React, { useState } from "react";
import css from "./Bookmarks.module.less";
import FavoriteIcon from "../../../../../shared/icons/Favorite.icon";
import SearchIcon from "../../../../../shared/icons/SearchIcon";
import CloseIcon from "../../../../../shared/icons/CloseIcon";
import StarsIcon from "../../../../../shared/icons/Stars.icon";
import UserMessageIcon from "../../../../../shared/icons/UserMessage.icon";
import ThreeDotsIcon from "../../../../../shared/icons/ThreeDotsIcon";
import { BookmarksActions } from "./BookmarksActions/BookmarksActions";
import { useChatStore } from "../../../../../shared/providers";

interface BookmarksProps {
    isSideBarOpen: boolean;
    isSideBarMenuOpen: boolean;
}

export const Bookmarks = ({isSideBarOpen, isSideBarMenuOpen}: BookmarksProps) => {
    const {
        currentChat,
        getAllFavouritesMessages,
        switchChat,
        setActiveMessage,
        changeMessageName,
        setMessageLike,
    } = useChatStore();

    const [isBookmarksOpen, setIsBookmarksOpen] = React.useState(false);
    const [isBookmarksSearchInputOpen, setIsBookmarksSearchInputOpen] = React.useState(false);

    const [bookmarksActionsPosition, setBookmarksActionsPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [isBookmarksActionsOpen, setIsBookmarksActionsOpen] = useState<boolean>(false);

    const [activeBookmarkMessage, setActiveBookmarkMessage] = useState<any>(null);
    const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
    const [editingMessageValue, setEditingMessageValue] = useState("");

    const handleOpenBookmarks = () => {
        setIsBookmarksOpen(!isBookmarksOpen);
    };

    const handleOpenBookmarksSearchInput = () => {
        setIsBookmarksSearchInputOpen(!isBookmarksSearchInputOpen);
    };

    const handleOpenBookmarksActions = (
        event: React.MouseEvent,
        msg: { id: number; name?: string; content: string }
    ) => {
        event.stopPropagation();
        setActiveBookmarkMessage(msg);
        setBookmarksActionsPosition({ top: event.clientY, left: event.clientX + 30 });
        setIsBookmarksActionsOpen(prev => !prev);
    };

    const handleRename = () => {
        if (activeBookmarkMessage) {
            const raw = activeBookmarkMessage.name ?? activeBookmarkMessage.content;
            setEditingMessageId(activeBookmarkMessage.id);
            setEditingMessageValue(extractPreviewText(raw));
            setIsBookmarksActionsOpen(false);
            setActiveBookmarkMessage(null);
        }
    };

    const finishEditing = (messageId: number) => {
        changeMessageName(messageId, editingMessageValue.trim());
        setEditingMessageId(null);
        setEditingMessageValue("");
    };

    const handleDelete = () => {
        if (activeBookmarkMessage) {
            setMessageLike(activeBookmarkMessage.id, false);
            setIsBookmarksActionsOpen(false);
            setActiveBookmarkMessage(null);
        }
    };

    function extractPreviewText(html: string): string {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        let result = '';

        doc.body.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                result += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as HTMLElement;

                if (el.tagName === 'IMG') {
                    const img = el as HTMLImageElement;
                    result += img.alt || img.src;
                } else if (el.tagName === 'A') {
                    const anchor = el as HTMLAnchorElement;
                    result += anchor.textContent?.trim() || anchor.href;
                } else {
                    result += el.textContent;
                }
            }
        });

        result = result.trim();
        return result.length > 15 ? result.slice(0, 15) + '…' : result;
    }

    return isSideBarMenuOpen && (
        <>
            <div
                className={isSideBarOpen
                            ? !isBookmarksSearchInputOpen
                                ? css.open_sidebar_menu_action_container
                                : css.sidebar_search_input_container
                            :  css.sidebar_menu_action_container
                            }
                data-active={isBookmarksOpen}
                onClick={handleOpenBookmarks}

            >
                <div
                    className={css.sidebar_menu_action_btn}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isBookmarksOpen && isSideBarOpen) {
                            handleOpenBookmarksSearchInput();
                        }
                    }}
                >
                    {!isBookmarksOpen ? (
                        <FavoriteIcon fill="currentColor" />
                    ) : (
                        isSideBarOpen
                            ? <SearchIcon fill="currentColor" />
                            : <FavoriteIcon fill="currentColor" />
                    )}
                </div>

                {isBookmarksOpen && isBookmarksSearchInputOpen ? (
                    <div className={css.sidebar_search_input}>
                        <input
                            className={css.search_input}
                            type="text"
                            placeholder="Search..."
                            autoFocus
                        />
                        <div onClick={handleOpenBookmarksSearchInput}>
                            <CloseIcon />
                        </div>
                    </div>
                ) : (
                    <div className={css.sidebar_menu_action_btn_tooltip}>
                        <div>Favourites</div>
                        <div className={css.show_more_btn} >
                            {!isBookmarksOpen ? "+" : "-"}
                        </div>
                    </div>
                )}
            </div>

            {isBookmarksOpen && isSideBarOpen && (
                <div className={css.favourites_list}>
                    {getAllFavouritesMessages().flatMap(group =>
                        group.messages.map(msg => (
                            <div
                                key={msg.id}
                                className={css.favourite_item}
                                onClick={() => {
                                    if (currentChat.id !== group.chatId) {
                                        switchChat(group.chatId);
                                    }
                                    setActiveMessage(msg);
                                }}
                            >
                                <div className={css.favourite_icon_and_name}>
                                    <div className={css.user_or_code_icon}>
                                        {msg.isCode
                                            ? <StarsIcon width={14} height={18} />
                                            : <UserMessageIcon width={9} height={8} />}
                                    </div>
                                    {editingMessageId === msg.id ? (
                                        <input
                                            autoFocus
                                            value={editingMessageValue}
                                            onChange={(e) => setEditingMessageValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    finishEditing(msg.id);
                                                }
                                            }}
                                            onBlur={() => finishEditing(msg.id)}
                                        />
                                    ) : (
                                        <div>
                                            {msg.name
                                                ? extractPreviewText(msg.name)
                                                : extractPreviewText(msg.content)}
                                        </div>
                                    )}
                                </div>

                                <div
                                    onClick={(e) => handleOpenBookmarksActions(e, msg)}
                                    className={css.three_dots}
                                >
                                    <ThreeDotsIcon />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {isBookmarksActionsOpen && (
                <BookmarksActions
                    position={bookmarksActionsPosition}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    onClose={() => setIsBookmarksActionsOpen(false)}
                />
            )}

        </>
    )
}