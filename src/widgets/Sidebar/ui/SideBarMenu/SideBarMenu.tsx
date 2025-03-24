import React, { useState } from "react";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import css from "./SideBarMenu.module.less";
import CorporaIcon from "../../../../shared/icons/CorporaIcon";
import IndividualChatsIcon from "../../../../shared/icons/IndividualChatsIcon";
import FavoriteIcon from "../../../../shared/icons/Favorite.icon";
import TagsIcon from "../../../../shared/icons/TagsIcon";
import SearchIcon from "../../../../shared/icons/SearchIcon";
import CloseIcon from "../../../../shared/icons/CloseIcon";
import { ChatTagsEnum } from "../../../../shared/enums/ChatTagsEnum";
import ThreeDotsIcon from "../../../../shared/icons/ThreeDotsIcon";
import BranchIcon from "../../../../shared/icons/Branch.icon";
import AllBranchesMenu from "../../../home-screens/ui/ChatContent/assets/AllBranchesMenu/AllBranchesMenu";
import { CSSTransition } from "react-transition-group";
import PenIcon from "../../../../shared/icons/Pen.icon";
import StarsIcon from "../../../../shared/icons/Stars.icon";
import UserMessageIcon from "../../../../shared/icons/UserMessage.icon";
import { BookmarksActions } from "./Bookmarks/BookmarksActions/BookmarksActions";


const TAG_META: Record<ChatTagsEnum, { defaultName: string; color: string }> = {
    [ChatTagsEnum.Green]: { defaultName: "Green", color: "#A9ED34" },
    [ChatTagsEnum.Purple]: { defaultName: "Purple", color: "#BF6FFF" },
    [ChatTagsEnum.Orange]: { defaultName: "Orange", color: "#FFA930" },
    [ChatTagsEnum.Yellow]: { defaultName: "Yellow", color: "#FFD600" },
    [ChatTagsEnum.Red]: { defaultName: "Red", color: "#FF5F5F" },
    [ChatTagsEnum.Blue]: { defaultName: "Blue", color: "#28ABFB" },
    [ChatTagsEnum.Black]: { defaultName: "Black", color: "#5B5B5B" },
    [ChatTagsEnum.Beige]: { defaultName: "Beige", color: "#FFFBE9" },
    [ChatTagsEnum.Gray]: { defaultName: "Gray", color: "#DDDDDD" },
};

export const SideBarMenu = () => {
    const { isSideBarOpen } = useAppStore();
    const {
        chats,
        currentChat,
        customTagNames ,
        getAllFavouritesMessages,
        getChatsByTags,
        setChatTags,
        renameTag,
        switchChat,
        setActiveMessage
    } = useChatStore();

    const chatsByTags = getChatsByTags();

    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = React.useState(true);
    const [isCorporaOpen, setIsCorporaOpen] = React.useState(false);
    const [isIndividualChatOpen, setIsIndividualChatOpen] = React.useState(false);
    const [isFavouritesOpen, setIsFavouritesOpen] = React.useState(false);
    const [isTagsOpen, setIsTagsOpen] = React.useState(false);

    const [isIndividualChatsSearchInputOpen, setIsIndividualChatsSearchInputOpen] = React.useState(false);
    const [isFavouritesSearchInputOpen, setIsFavouritesSearchInputOpen] = React.useState(false);

    const [expandedChatId, setExpandedChatId] = React.useState<string | null>(null);
    const [activeTagPanel, setActiveTagPanel] = useState<string | null>(null);

    const [isBranchMenuOpen, setIsBranchMenuOpen] = React.useState(false);
    const menuPosition = { top: 450, right: -130 };
    const [isBookmarksActionsOpen, setIsBookmarksActionsOpen] = useState<boolean>(false);
    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);
    const [showAllTags, setShowAllTags] = useState<string | null>(null);
    const [editingTag, setEditingTag] = useState<ChatTagsEnum | null>(null);
    const [editValue, setEditValue] = useState("");
    const [selectedTag, setSelectedTag] = React.useState<ChatTagsEnum | null>(null);
    const [isChatsByTagsOpen, setIsChatsByTagsOpen] = React.useState(false);

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

    const handleOpenFavouritesSearchInput = () => {
        setIsFavouritesSearchInputOpen(!isFavouritesSearchInputOpen);
    };

    const handleOpenIndividualChatsSearchInput = () => {
        setIsIndividualChatsSearchInputOpen(!isIndividualChatsSearchInputOpen);
    };

    const handleToggleChatBranches = (chatId: string) => {
        setExpandedChatId((prev) => (prev === chatId ? null : chatId));
    };

    const handleOpenBookmarksActions = () => {
        setIsBookmarksActionsOpen(!isBookmarksActionsOpen)
    };

    const handleOpenChatsByTags = () => {
        setIsChatsByTagsOpen(!isChatsByTagsOpen)
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

    const handleOpenBranchMenu = () => {
        setIsBranchMenuOpen(!isBranchMenuOpen);
    }

    const panelRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setShowAllTags(null);
                setActiveTagPanel(null);
            }
        }

        if (showAllTags !== null || activeTagPanel !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showAllTags, activeTagPanel]);


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
                        className={
                            !isIndividualChatsSearchInputOpen
                                ? css.sidebar_menu_action_container
                                : css.sidebar_search_input_container
                        }
                        data-active={isIndividualChatOpen}
                    >
                        <div className={css.sidebar_menu_action_btn}
                             onClick={isIndividualChatOpen ? handleOpenIndividualChatsSearchInput : undefined}>
                            {!isIndividualChatOpen ? (
                                <IndividualChatsIcon fill="currentColor" />
                            ) : (
                                isSideBarOpen
                                ? <SearchIcon fill="currentColor" />
                                : <IndividualChatsIcon fill="currentColor" />
                            )}

                        </div>


                        {isIndividualChatOpen && isIndividualChatsSearchInputOpen && isSideBarOpen ? (
                            <div className={css.sidebar_search_input}>
                                <input
                                    className={css.search_input}
                                    type="text"
                                    placeholder="Search..."
                                    autoFocus
                                />
                                <div onClick={handleOpenIndividualChatsSearchInput}>
                                    <CloseIcon />
                                </div>
                            </div>
                        ) : (
                            <div className={css.sidebar_menu_action_btn_tooltip}>
                                <div>Individual Chats</div>
                                <div
                                    className={css.show_more_btn}
                                    onClick={handleOpenIndividualChat}
                                >
                                    {!isIndividualChatOpen ? "+" : "-"}
                                </div>
                            </div>
                        )}
                    </div>

                    {isIndividualChatOpen && isSideBarOpen && (
                        <div className={css.chats_container}>
                            <div className={css.chats}>Chats</div>

                            {chats.map(chat => {
                                const isOpen = expandedChatId === chat.id;
                                const branches = chat.id === currentChat.id
                                    ? currentChat.branches
                                    : chat.branches ?? [];

                                return (
                                    <div key={chat.id}>
                                        <div className={css.chat_item}
                                             data-active={isOpen}
                                        >
                                            <div className={css.chat_item_tag_and_name}>
                                                <div className={css.tags_wrapper}
                                                     data-count={Math.min(chat.tags?.length ?? 0, 3)}
                                                     onClick={e => {
                                                         e.stopPropagation();
                                                         setActiveTagPanel(prev => (prev === chat.id ? null : chat.id));
                                                     }}>
                                                    {chat.tags?.map(tag => {
                                                        const { color, defaultName } = TAG_META[tag];
                                                        return (
                                                            <div
                                                                key={tag}
                                                                className={css.chat_tag}
                                                                style={{ backgroundColor: color }}
                                                                title={customTagNames.get(tag) ?? defaultName}
                                                                onClick={e => {
                                                                    e.stopPropagation();
                                                                    setActiveTagPanel(prev => (prev === chat.id ? null : chat.id));
                                                                }}
                                                            />
                                                        );

                                                    }) ?? (
                                                        <div className={css.chat_tag}
                                                             style={{ backgroundColor: "#888" }}
                                                             onClick={e => {
                                                                 e.stopPropagation();
                                                                 setActiveTagPanel(prev => prev === chat.id ? null : chat.id);
                                                             }} />
                                                    )}
                                                </div>
                                                <div className={css.chat_name}>{chat.name}</div>
                                                <div className={css.chat_notifications_count}>
                                                    {chat.notificationsCount}
                                                </div>

                                            </div>
                                            <div className={css.chat_tools}>
                                                <div><ThreeDotsIcon /></div>
                                                <div
                                                    className={css.show_more_btn}
                                                    data-active={isOpen}
                                                    onClick={() => setExpandedChatId(prev => prev === chat.id ? null : chat.id)}
                                                >
                                                    {!isOpen ? "+" : "-"}
                                                </div>
                                            </div>
                                        </div>


                                        {activeTagPanel === chat.id && (
                                            <div ref={panelRef}>
                                                {showAllTags === chat.id ? (
                                                    <div className={css.all_tags_panel}>
                                                        <div className={css.assigning_tags}>
                                                            <TagsIcon />
                                                            <div>Assigning Tag</div>
                                                        </div>
                                                        {Object.entries(TAG_META).map(([tag, { defaultName, color }]) => {
                                                            const tagEnum = tag as ChatTagsEnum;
                                                            const isSelected = chat.tags?.includes(tagEnum);
                                                            const customName = customTagNames.get(tagEnum) ?? defaultName;
                                                            const isEditing = editingTag === tagEnum;

                                                            return (
                                                                <div
                                                                    key={tag}
                                                                    className={`${css.tag_item} ${isSelected ? css.selected_tag_item : ""}`}
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        if (!isEditing) {
                                                                            const updatedTags = isSelected
                                                                                ? chat.tags!.filter(t => t !== tagEnum)
                                                                                : [...(chat.tags ?? []), tagEnum];
                                                                            setChatTags(chat.id, updatedTags);
                                                                        }
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={`${css.chat_tag} ${isSelected ? css.current_chat_tag : ""}`}
                                                                        style={{ backgroundColor: color }}
                                                                    />

                                                                    {isEditing ? (
                                                                        <input
                                                                            className={css.edit_tag_input}
                                                                            value={editValue}
                                                                            autoFocus
                                                                            onChange={e => setEditValue(e.target.value)}
                                                                            onBlur={() => {
                                                                                renameTag(tagEnum, editValue.trim() || defaultName);
                                                                                setEditingTag(null);
                                                                            }}
                                                                            onKeyDown={e => {
                                                                                if (e.key === "Enter") {
                                                                                    renameTag(tagEnum, editValue.trim() || defaultName);
                                                                                    setEditingTag(null);
                                                                                }
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div>{customName}</div>
                                                                    )}

                                                                    {!isEditing && (
                                                                        <div
                                                                            className={css.edit_tag_name_btn}
                                                                            onClick={e => {
                                                                                e.stopPropagation();
                                                                                setEditingTag(tagEnum);
                                                                                setEditValue(customName);
                                                                            }}
                                                                        >
                                                                            <PenIcon width={11} height={11}/>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className={css.tag_panel}>
                                                        {(() => {
                                                            const currentTags = chat.tags ?? [];
                                                            const allTags = Object.keys(TAG_META) as ChatTagsEnum[];
                                                            const primary = currentTags.length >= 4 ? currentTags.slice(0, 4) : currentTags;
                                                            const pool = allTags.filter(t => !primary.includes(t));
                                                            const extras = primary.length < 4 ? pool.slice(0, 4 - primary.length) : [];
                                                            const tagsToShow = [...primary, ...extras];

                                                            return tagsToShow.map(tagEnum => {
                                                                const isSelected = currentTags.includes(tagEnum);
                                                                return (
                                                                    <div
                                                                        key={tagEnum}
                                                                        className={`${css.chat_tag} ${isSelected ? css.current_chat_tag : ""}`}
                                                                        style={{ backgroundColor: TAG_META[tagEnum].color }}
                                                                        title={TAG_META[tagEnum].defaultName}
                                                                        onClick={e => {
                                                                            e.stopPropagation();
                                                                            const updatedTags = isSelected
                                                                                ? currentTags.filter(t => t !== tagEnum)
                                                                                : [...currentTags, tagEnum];
                                                                            setChatTags(chat.id, updatedTags);
                                                                        }}
                                                                    />
                                                                );
                                                            });
                                                        })()}
                                                        <div
                                                            className={css.three_dots}
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                setShowAllTags(chat.id);
                                                            }}
                                                        >
                                                            <ThreeDotsIcon />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {isOpen && branches.length > 0 && (
                                            <div className={css.branches_list_container}>
                                                <div>Branches</div>
                                                <div className={css.branches_list}>
                                                    {branches.map(branch => (
                                                        <div key={branch.id} className={css.branch_item}>
                                                            <div className={css.branch_icon_and_name}>
                                                                <div>
                                                                    <BranchIcon fill="currentColor" width={16}
                                                                                height={16} />
                                                                </div>
                                                                <div className={css.branch_name}>
                                                                    {branch.name}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={css.branch_three_dots}
                                                                onClick={handleOpenBranchMenu}>
                                                                <ThreeDotsIcon />
                                                            </div>

                                                            <CSSTransition
                                                                in={isBranchMenuOpen && branch.id !== null}
                                                                timeout={200}
                                                                classNames="branchMenu"
                                                                unmountOnExit
                                                            >
                                                                <AllBranchesMenu
                                                                    position={menuPosition}
                                                                    branchId={branch.id!}
                                                                    setActiveOpenAllBranchesMenu={setActiveOpenAllBranchesMenu}
                                                                />
                                                            </CSSTransition>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}






                    <div
                        className={
                            !isFavouritesSearchInputOpen
                                ? css.sidebar_menu_action_container
                                : css.sidebar_search_input_container
                        }
                        data-active={isFavouritesOpen}
                    >
                        <div
                            className={css.sidebar_menu_action_btn}
                            onClick={isFavouritesOpen && isSideBarOpen ? handleOpenFavouritesSearchInput : undefined}
                        >
                            {!isFavouritesOpen ? (
                                <FavoriteIcon fill="currentColor" />
                            ) : (
                                isSideBarOpen
                                    ? <SearchIcon fill="currentColor" />
                                    : <FavoriteIcon fill="currentColor" />
                            )}
                        </div>

                        {isFavouritesOpen && isFavouritesSearchInputOpen ? (
                            <div className={css.sidebar_search_input}>
                                <input
                                    className={css.search_input}
                                    type="text"
                                    placeholder="Search..."
                                    autoFocus
                                />
                                <div onClick={handleOpenFavouritesSearchInput}>
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
                                        <div className={css.user_or_code_icon}>
                                            {msg.isCode
                                                ? <StarsIcon width={14} height={18} />
                                                : <UserMessageIcon width={9} height={8} />}
                                        </div>
                                        <div>{extractPreviewText(msg.content)}</div>
                                        <div
                                            onClick={handleOpenBookmarksActions}
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
                        <BookmarksActions/>
                    )}

                    {/*<div className={css.sidebar_menu_action_container}>*/}
                        <div className={css.sidebar_menu_action_container}
                             data-active={isTagsOpen}
                             onClick={() => {
                                 setIsTagsOpen(prev => !prev);
                                 setSelectedTag(null);
                             }}>
                            <div className={css.sidebar_menu_action_btn}>
                                <TagsIcon fill="currentColor" />
                            </div>
                            <div className={css.sidebar_menu_action_btn_tooltip}>
                                <div>Tags</div>
                                <div className={css.show_more_btn}
                                    >
                                    {!isTagsOpen ? "+" : "-"}
                                </div>
                            </div>
                        </div>

                    {isTagsOpen && (
                        <div className={css.tags_container}>
                            {Object.entries(chatsByTags)
                                .filter(([tag, chats]) => tag !== "untagged" && chats.length > 0)
                                .map(([tag, chats]) => {
                                    const tagEnum = tag as ChatTagsEnum;
                                    const color = TAG_META[tagEnum].color;
                                    const customName = customTagNames.get(tagEnum) ?? TAG_META[tagEnum].defaultName;
                                    const isOpen = selectedTag === tagEnum;

                                    return (
                                        <div
                                            key={tag}
                                            className={css.tag_item}
                                            onClick={() => setSelectedTag(isOpen ? null : tagEnum)}
                                        >
                                            <div
                                                className={`${css.chat_tag} ${isOpen ? css.current_chat_tag : ""}`}
                                                style={{ backgroundColor: color }}
                                            />
                                            <div>{customName}&nbsp;({chats.length})</div>
                                            <div className={css.show_more_btn}>
                                                {isOpen ? "-" : "+"}
                                            </div>
                                        </div>
                                    );
                                })}

                            {selectedTag && (
                                <div className={css.tag_chats_list}>
                                    {chatsByTags[selectedTag].map(chat => {
                                        const isOpen = expandedChatId === chat.id;
                                        const branches = chat.id === currentChat.id ? currentChat.branches : chat.branches ?? [];

                                        return (
                                            <div key={chat.id}>
                                                <div className={css.chat_item} onClick={() => handleToggleChatBranches(chat.id)}>
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
                        </div>
                    )}


                    {/*</div>*/}
                </div>
            )}
       </div>
    );
};
