import React, { useState, useRef, useEffect } from "react";
import css from "./IndividualChats.module.less";
import IndividualChatsIcon from "../../../../../shared/icons/IndividualChatsIcon";
import SearchIcon from "../../../../../shared/icons/SearchIcon";
import CloseIcon from "../../../../../shared/icons/CloseIcon";
import { ChatTagsEnum } from "../../../../../shared/enums/ChatTagsEnum";
import ThreeDotsIcon from "../../../../../shared/icons/ThreeDotsIcon";
import BranchIcon from "../../../../../shared/icons/Branch.icon";
import { CSSTransition } from "react-transition-group";
import AllBranchesMenu from "../../../../home-screens/ui/ChatContent/assets/AllBranchesMenu/AllBranchesMenu";
import { IndividualChatsActions } from "./IndividualChatsActions/IndividualChatsActions";
import { useChatStore, useAppStore } from "../../../../../shared/providers";
import { ChatTagsPanel } from "./ChatTagsPanel/ChatTagsPanel";
import { ChatItem } from "./ChatItem/ChatItem";
import ReactDOM from "react-dom";
import { TAG_META } from "../SideBarMenu";
import { IChat, MODE } from "../../../../../shared/types/Chat";

interface IndividualChatsProps {
    isSideBarOpen: boolean;
    isSideBarMenuOpen: boolean;
}

export const IndividualChats = ({ isSideBarOpen, isSideBarMenuOpen }: IndividualChatsProps) => {
    const {
        chats,
        currentChat,
        customTagNames,
        setChatTags,
        renameTag,
        switchChat,
        renameChat,
        removeChat,
        addChat,
        deleteSavedBranch,
        setMode
    } = useChatStore();

    const { setIsSideBarOpen } = useAppStore();

    const [isIndividualChatsSearchInputOpen, setIsIndividualChatsSearchInputOpen] = useState(false);
    const [isIndividualChatOpen, setIsIndividualChatOpen] = useState(false);
    const [expandedChatId, setExpandedChatId] = useState<string | null>(null);
    const [activeTagPanel, setActiveTagPanel] = useState<string | null>(null);
    const [branchMenuState, setBranchMenuState] = useState<{ [key: number]: { isOpen: boolean; position: { top: number; left: number } } }>({});
    const [isShowActions, setIsShowActions] = useState(false);
    const [activeChatForActions, setActiveChatForActions] = useState<{
        id: string;
        name: string;
        position: { top: number; left: number };
    } | null>(null);
    const [editingChatId, setEditingChatId] = useState<string | null>(null);
    const [editingChatValue, setEditingChatValue] = useState("");
    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);
    const [showAllTags, setShowAllTags] = useState<string | null>(null);
    const [editingTag, setEditingTag] = useState<ChatTagsEnum | null>(null);
    const [editValue, setEditValue] = useState("");
    const [selectedTags, setSelectedTags] = useState<ChatTagsEnum[]>([]);
    const [inputValue, setInputValue] = useState("");
    const panelRef = useRef<HTMLDivElement>(null);

    const handleOpenIndividualChat = () => {
        if (!isSideBarOpen) {
            setIsSideBarOpen(true);
        }
        setIsIndividualChatOpen(prev => !prev);
    };

    const handleOpenIndividualChatsSearchInput = () => {
        setIsIndividualChatsSearchInputOpen(prev => !prev);
    };

    const handleOpenBranchMenu = (event: React.MouseEvent, branchId: number | null) => {
        event.stopPropagation();
        if (branchId === null) {
            console.warn("Branch ID is null, cannot open menu");
            return;
        }
        setBranchMenuState(prev => ({
            ...prev,
            [branchId]: {
                isOpen: !prev[branchId]?.isOpen,
                position: { top: event.clientY, left: event.clientX + 30 },
            },
        }));
    };

    useEffect(() => {
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

    useEffect(() => {
        if (activeTagPanel) {
            const panelChat = chats.find(c => c.id === activeTagPanel);
            setSelectedTags(panelChat?.tags ?? []);
        } else {
            setSelectedTags([]);
        }
        setInputValue("");
    }, [activeTagPanel, chats]);

    const handleRenameChat = (id: string, name: string) => {
        setEditingChatId(id);
        setEditingChatValue(name);
        setActiveChatForActions(null);
    };

    const handleDeleteChat = (id: string) => {
        let newChat: IChat;
        if (chats[chats.length - 1].id !== id) {
            newChat = chats[chats.length - 1];
            switchChat(newChat.id);
        } else if (chats.length > 2) {
            newChat = chats[chats.length - 2];
            switchChat(newChat.id);
        } else if (chats.length <= 1) {
            newChat = {
                id: `chat-${Date.now()}`,
                name: "New Chat",
                messageNodeMap: {
                    root: { id: "root", isRootNode: true, children: [] },
                },
                tags: [],
                notificationsCount: 0,
                branches: [],
            };
            addChat(newChat);
            switchChat(newChat.id);
        }
        removeChat(id);
        setActiveChatForActions(null);
    };

    const handleOpenChat = (id: string) => {
        switchChat(id);
        setActiveChatForActions(null);
    };

    return isSideBarMenuOpen && (
        <>
            <div
                className={isSideBarOpen
                    ? !isIndividualChatsSearchInputOpen
                        ? css.open_sidebar_menu_action_container
                        : css.sidebar_search_input_container
                    : css.sidebar_menu_action_container
                }
                data-active={isIndividualChatOpen}
                onClick={handleOpenIndividualChat}
            >
                <div
                    className={css.sidebar_menu_action_btn}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenIndividualChat();
                        if (isIndividualChatOpen) {
                            handleOpenIndividualChatsSearchInput();
                        }
                    }}
                >
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
                        <div className={css.section_name}>
                            <span>Individual</span><span>Chats</span>
                        </div>
                        <div className={css.show_more_btn}>
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
                        const branches = chat.branches ?? [];

                        return (
                            <div key={chat.id}>
                                <ChatItem
                                    chat={chat}
                                    isOpen={isOpen}
                                    editingId={editingChatId}
                                    editingValue={editingChatValue}
                                    onStartEdit={(id, name) => { setEditingChatId(id); setEditingChatValue(name); }}
                                    onChangeEdit={(id, value) => setEditingChatValue(value)}
                                    onFinishEdit={(id, newName) => { renameChat(id, newName); setEditingChatId(null); }}
                                    onToggleExpand={(id) => setExpandedChatId(prev => prev === id ? null : id)}
                                    onOpenActions={e => {
                                        e.stopPropagation();
                                        setIsShowActions(!isShowActions);
                                        setActiveChatForActions({ id: chat.id, name: chat.name, position: { top: e.clientY, left: e.clientX + 30 } });
                                    }}
                                    onTagsClick={e => {
                                        e.stopPropagation();
                                        setActiveTagPanel(prev => (prev === chat.id ? null : chat.id));
                                    }}
                                />

                                {activeTagPanel === chat.id && (
                                    <div ref={panelRef}>
                                        <ChatTagsPanel
                                            chatId={chat.id}
                                            currentTags={chat.tags ?? []}
                                            customTagNames={customTagNames}
                                            selectedTags={selectedTags}
                                            showAllTags={showAllTags === chat.id}
                                            inputValue={inputValue}
                                            editValue={editValue}
                                            editingTag={editingTag}
                                            onToggleShowAll={() => setShowAllTags(prev => prev ? null : chat.id)}
                                            onSelectTag={tag => {
                                                const updated = selectedTags.includes(tag)
                                                    ? selectedTags.filter(t => t !== tag)
                                                    : [...selectedTags, tag];
                                                setChatTags(chat.id, updated);
                                                setSelectedTags(updated);
                                                setInputValue("");
                                            }}
                                            onRenameTag={(tag, name) => { renameTag(tag, name); setEditingTag(null); }}
                                            onInputChange={val => setInputValue(val)}
                                            onKeyPressInput={e => {
                                                if (e.key === " " && inputValue.trim()) {
                                                    const query = inputValue.trim().toLowerCase();
                                                    const matchEntry = Object.entries(TAG_META).find(([key, meta]) => {
                                                        const tagEnum = key as ChatTagsEnum;
                                                        const defaultName = meta.defaultName.toLowerCase();
                                                        const customName = customTagNames.get(tagEnum)?.toLowerCase();
                                                        return defaultName === query || customName === query;
                                                    });

                                                    if (matchEntry) {
                                                        const tagEnum = matchEntry[0] as ChatTagsEnum;
                                                        if (!selectedTags.includes(tagEnum)) {
                                                            const updated = [...selectedTags, tagEnum];
                                                            setChatTags(chat.id, updated);
                                                            setSelectedTags(updated);
                                                        }
                                                    }
                                                    setInputValue("");
                                                    e.preventDefault();
                                                }
                                            }}
                                            onStartEditTag={tag => {
                                                setEditingTag(tag);
                                                setEditValue(customTagNames.get(tag) ?? TAG_META[tag].defaultName);
                                            }}
                                            setEditValue={setEditValue}
                                        />
                                    </div>
                                )}

                                {isOpen && branches.length > 0 && (
                                    <div className={css.branches_list_container}>
                                        <div>Branches</div>
                                        <div className={css.branches_list}>
                                            {branches.map(branch => (
                                                <div
                                                    key={branch.id}
                                                    className={css.branch_item}
                                                    onClick={() => setMode(MODE.INITIAL)}
                                                >
                                                    <div className={css.branch_icon_and_name}>
                                                        <div>
                                                            <BranchIcon fill="currentColor" width={16} height={16} />
                                                        </div>
                                                        <div className={css.branch_name}>
                                                            {branch.name}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={css.branch_three_dots}
                                                        onClick={(e) => {
                                                            handleOpenBranchMenu(e, branch.id);
                                                        }}
                                                        onMouseDown={e => e.stopPropagation()}
                                                    >
                                                        <ThreeDotsIcon />
                                                    </div>

                                                    {branchMenuState[branch.id!]?.isOpen && ReactDOM.createPortal(
                                                        <CSSTransition
                                                            in={branchMenuState[branch.id!]?.isOpen}
                                                            timeout={200}
                                                            classNames="branchMenu"
                                                            unmountOnExit
                                                        >
                                                            <AllBranchesMenu
                                                                position={branchMenuState[branch.id!].position}
                                                                branchId={branch.id!}
                                                                setActiveOpenAllBranchesMenu={setActiveOpenAllBranchesMenu}
                                                                onClose={() => {
                                                                    setBranchMenuState(prev => ({
                                                                        ...prev,
                                                                        [branch.id!]: { ...prev[branch.id!], isOpen: false },
                                                                    }));
                                                                }}
                                                                onDelete={() => {
                                                                    deleteSavedBranch(branch.id!);
                                                                }}
                                                            />
                                                        </CSSTransition>,
                                                        document.body
                                                    )}
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

            {activeChatForActions && isShowActions && (() => {
                const { id, name, position } = activeChatForActions;

                return (
                    <IndividualChatsActions
                        position={position}
                        onClose={() => setActiveChatForActions(null)}
                        onRename={() => handleRenameChat(id, name)}
                        onDelete={() => handleDeleteChat(id)}
                        onOpen={() => handleOpenChat(id)}
                    />
                );
            })()}
        </>
    );
};
