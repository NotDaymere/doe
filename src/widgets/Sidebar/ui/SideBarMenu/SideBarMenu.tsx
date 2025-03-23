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
    const { chats,
        currentChat,
        customTagNames ,
        getAllFavouritesMessages,
        getChatsByTags
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
    const [activeTagPanelChatId, setActiveTagPanelChatId] = useState<string | null>(null);
    const [activeTagPanelTag, setActiveTagPanelTag] = useState<ChatTagsEnum | null>(null);

    const [isBranchMenuOpen, setIsBranchMenuOpen] = React.useState(false);
    const menuPosition = { top: 450, right: -130 };
    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);
    const [selectedTag, setSelectedTag] = React.useState<ChatTagsEnum | null>(null);
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
    const handleOpenBranchMenu = () => {
        setIsBranchMenuOpen(!isBranchMenuOpen);
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
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                setActiveTagPanel(prev => (prev === chat.id ? null : chat.id));
                                                            }}
                                                        />
                                                    );
                                                })}
                                                }) ?? (
                                                    <div className={css.chat_tag}
                                                         style={{ backgroundColor: "#888" }}
                                                         onClick={e => {
                                                             e.stopPropagation();
                                                             setActiveTagPanel(prev => prev === chat.id ? null : chat.id);
                                                         }}/>
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
                                            <div className={css.tag_panel}>
                                                {[ChatTagsEnum.Green, ChatTagsEnum.Purple, ChatTagsEnum.Orange, ChatTagsEnum.Yellow].map(tag => (
                                                    <div
                                                        key={tag}
                                                        className={css.chat_tag}
                                                        style={{ backgroundColor: TAG_META[tag].color }}
                                                        title={TAG_META[tag].defaultName}
                                                    />
                                                ))}
                                                <div className={css.three_dots}><ThreeDotsIcon /></div>
                                            </div>
                                        )}

                                        {isOpen && branches.length > 0 && (
                                            <div className={css.branches_list}>
                                                {branches.map(branch => (
                                                    <div key={branch.id} className={css.branch_item}>
                                                        {branch.name}
                                                    </div>
                                                ))}
                                        {isOpen && chat.branches?.length > 0 && (
                                            <div className={css.branches_list_container}>
                                                <div>Branches</div>
                                                <div className={css.branches_list}>
                                                    {chat.branches.map(branch => (
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
                                    <div key={msg.id} className={css.favourite_item}>
                                        {extractPreviewText(msg.content)}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <div className={css.menu_actions_section_container}>

                        <div className={css.sidebar_menu_action_container} data-active={isTagsOpen}>
                            <div className={css.sidebar_menu_action_btn}>
                                <TagsIcon fill="currentColor" />
                            </div>
                            <div className={css.sidebar_menu_action_btn_tooltip}>
                                <div>Tags</div>
                                <div className={css.show_more_btn} onClick={() => {
                                    setIsTagsOpen(prev => !prev);
                                    setSelectedTag(null);
                                }}>
                                    {!isTagsOpen ? "+" : "-"}
                                </div>
                            </div>
                        </div>

                        {isTagsOpen && (
                            <div className={css.tags_container}>

                                {Object.entries(chatsByTags)
                                    .filter(([tag, chats]) => tag !== "untagged" && chats.length > 0)
                                    .map(([tag, chats]) => (
                                        <div
                                            key={tag}
                                            className={css.tag_item}
                                            onClick={() => setSelectedTag(tag as ChatTagsEnum)}
                                        >
                                            {(customTagNames.get(tag as ChatTagsEnum) ?? TAG_META[tag as ChatTagsEnum].defaultName)}
                                            &nbsp;({chats.length})
                                        </div>
                                    ))
                                }

                                {selectedTag && (
                                    <div className={css.tag_chats_list}>
                                        {chatsByTags[selectedTag].map(chat => {
                                            const isOpen = expandedChatId === chat.id;
                                            const branches = chat.id === currentChat.id
                                                ? currentChat.branches
                                                : chat.branches ?? [];

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
                    </div>
                </div>
            )}
        </div>
    );
};
