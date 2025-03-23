import React from "react";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import css from "./SideBarMenu.module.less";
import CorporaIcon from "../../../../shared/icons/CorporaIcon";
import IndividualChatsIcon from "../../../../shared/icons/IndividualChatsIcon";
import FavoriteIcon from "../../../../shared/icons/Favorite.icon";
import TagsIcon from "../../../../shared/icons/TagsIcon";
import SearchIcon from "../../../../shared/icons/SearchIcon";
import CloseIcon from "../../../../shared/icons/CloseIcon";
import { ChatTagsEnum } from "../../../../shared/enums/ChatTagsEnum";


const TAG_META: Record<ChatTagsEnum, { defaultName: string; color: string }> = {
    [ChatTagsEnum.Green]: { defaultName: "Green", color: "#4CAF50" },
    [ChatTagsEnum.Orange]: { defaultName: "Orange", color: "#FF9800" },
    [ChatTagsEnum.Purple]: { defaultName: "Purple", color: "#9C27B0" },
    [ChatTagsEnum.Yellow]: { defaultName: "Yellow", color: "#FFEB3B" },
    [ChatTagsEnum.Red]: { defaultName: "Red", color: "#F44336" },
    [ChatTagsEnum.Blue]: { defaultName: "Blue", color: "#2196F3" },
    [ChatTagsEnum.Black]: { defaultName: "Black", color: "#212121" },
    [ChatTagsEnum.Beige]: { defaultName: "Beige", color: "#F5F5DC" },
    [ChatTagsEnum.Gray]: { defaultName: "Gray", color: "#9E9E9E" },
};

export const SideBarMenu = () => {
    const { isSideBarOpen } = useAppStore();
    const { chats,
        currentChat,
        customTagNames ,
        getAllFavouritesMessages
    } = useChatStore();
    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = React.useState(true);
    const [isCorporaOpen, setIsCorporaOpen] = React.useState(false);
    const [isIndividualChatOpen, setIsIndividualChatOpen] = React.useState(false);
    const [isFavouritesOpen, setIsFavouritesOpen] = React.useState(false);
    const [isTagsOpen, setIsTagsOpen] = React.useState(false);
    const [isSearchInputOpen, setIsSearchInputOpen] = React.useState(false);
    const [expandedChatId, setExpandedChatId] = React.useState<string | null>(null);

    const handleOpenSideBarMenu = () => {
        setIsSideBarMenuOpen(!isSideBarMenuOpen);
    };

    const handleOpenCorpora = () => {
        setIsCorporaOpen(!isCorporaOpen);
    };

    const handleOpenIndividualChat = () => {
        setIsIndividualChatOpen(!isIndividualChatOpen);
    };

    const handleOpenFavourites = () => {
        setIsFavouritesOpen(!isFavouritesOpen);
    };

    const handleOpenTags = () => {
        setIsTagsOpen(!isTagsOpen);
    };

    const handleOpenSearchInput = () => {
        setIsSearchInputOpen(!isSearchInputOpen);
    };

    const handleToggleChatBranches = (chatId: string) => {
        setExpandedChatId((prev) => (prev === chatId ? null : chatId));
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
        return result.length > 30 ? result.slice(0, 30) + '…' : result;
    }

    return (
        <div className={isSideBarOpen ? css.sidebar_open_menu : css.sidebar_menu}>
            <div className={css.menu_actions_section_name}>
                <div>Menu</div>
                <div className={css.show_actions_btn} onClick={handleOpenSideBarMenu}>
                    {!isSideBarMenuOpen ? "+" : "-"}
                </div>
            </div>

            {isSideBarMenuOpen && (
                <div className={css.menu_actions_section_container}>
                    <div
                        className={css.sidebar_menu_action_container}
                        data-active={isCorporaOpen}
                    >
                        <div className={css.sidebar_menu_action_btn}>
                            <CorporaIcon fill="currentColor" />
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Corpora</div>
                            <div className={css.show_more_btn} onClick={handleOpenCorpora}>
                                {!isCorporaOpen ? "+" : "-"}
                            </div>
                        </div>
                    </div>

                    <div
                        className={css.sidebar_menu_action_container}
                        data-active={isIndividualChatOpen}
                    >
                        <div className={css.sidebar_menu_action_btn}>
                            <IndividualChatsIcon fill="currentColor" />
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Individual Chats</div>
                            <div
                                className={css.show_more_btn}
                                onClick={handleOpenIndividualChat}
                            >
                                {!isIndividualChatOpen ? "+" : "-"}
                            </div>
                        </div>
                    </div>

                    {isIndividualChatOpen && (
                        <div className={css.chats_container}>
                            {chats.map(chat => {
                                const isOpen = expandedChatId === chat.id;
                                const branches = chat.id === currentChat.id
                                    ? currentChat.branches
                                    : chat.branches ?? [];

                                return (
                                    <div key={chat.id}>
                                        <div
                                            className={css.chat_item}
                                            onClick={() => setExpandedChatId(prev => (prev === chat.id ? null : chat.id))}
                                        >
                                            <div className={css.tags_wrapper}>
                                                {chat.tags?.map(tag => {
                                                    const { color, defaultName } = TAG_META[tag];
                                                    return (
                                                        <div
                                                            key={tag}
                                                            className={css.chat_tag}
                                                            style={{ backgroundColor: color }}
                                                            title={customTagNames.get(tag) ?? defaultName}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <div className={css.chat_name}>{chat.name}</div>
                                        </div>

                                        {isOpen && branches.length > 0 && (
                                            <div className={css.branches_list}>
                                                {branches.map(branch => (
                                                    <div key={branch.id} className={css.branch_item}>
                                                        {branch.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div
                        className={
                            !isSearchInputOpen
                                ? css.sidebar_menu_action_container
                                : css.sidebar_search_input_container
                        }
                        data-active={isFavouritesOpen}
                    >
                        <div
                            className={css.sidebar_menu_action_btn}
                            onClick={isFavouritesOpen ? handleOpenSearchInput : undefined}
                        >
                            {!isFavouritesOpen ? (
                                <FavoriteIcon fill="currentColor" />
                            ) : (
                                <SearchIcon fill="currentColor" />
                            )}
                        </div>

                        {isFavouritesOpen && isSearchInputOpen ? (
                            <div className={css.sidebar_search_input}>
                                <input
                                    className={css.search_input}
                                    type="text"
                                    placeholder="Search..."
                                    autoFocus
                                />
                                <div onClick={handleOpenSearchInput}>
                                    <CloseIcon />
                                </div>
                            </div>
                        ) : (
                            <div className={css.sidebar_menu_action_btn_tooltip}>
                                <div>Favourites</div>
                                <div className={css.show_more_btn} onClick={handleOpenFavourites}>
                                    {!isFavouritesOpen ? "+" : "-"}
                                </div>
                            </div>
                        )}
                    </div>
                    {isFavouritesOpen && (
                        <div className={css.favourites_list}>
                            {getAllFavouritesMessages().flatMap(group =>
                                group.messages.map(msg => (
                                    <div key={msg.id} className={css.favourite_item}>
                                        {extractPreviewText(msg.content)}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <div
                        className={css.sidebar_menu_action_container}
                        data-active={isTagsOpen}
                    >
                        <div className={css.sidebar_menu_action_btn}>
                            <TagsIcon fill="currentColor" />
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Tags</div>
                            <div className={css.show_more_btn} onClick={handleOpenTags}>
                                {!isTagsOpen ? "+" : "-"}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
