import React, { useState } from "react";
import css from "./IndividualChats.module.less";
import IndividualChatsIcon from "../../../../../shared/icons/IndividualChatsIcon";
import SearchIcon from "../../../../../shared/icons/SearchIcon";
import CloseIcon from "../../../../../shared/icons/CloseIcon";
import { ChatTagsEnum } from "../../../../../shared/enums/ChatTagsEnum";
import ThreeDotsIcon from "../../../../../shared/icons/ThreeDotsIcon";
import TagsIcon from "../../../../../shared/icons/TagsIcon";
import PenIcon from "../../../../../shared/icons/Pen.icon";
import BranchIcon from "../../../../../shared/icons/Branch.icon";
import { CSSTransition } from "react-transition-group";
import AllBranchesMenu from "../../../../home-screens/ui/ChatContent/assets/AllBranchesMenu/AllBranchesMenu";
import { IndividualChatsActions } from "./IndividualChatsActions/IndividualChatsActions";
import { TAG_META } from "../SideBarMenu";
import { useChatStore } from "../../../../../shared/providers";
import {ChatTagsPanel} from "./ChatTagsPanel/ChatTagsPanel";
import {ChatItem} from "./ChatItem/ChatItem";

interface IndividualChatsProps {
    isSideBarOpen: boolean;
    isSideBarMenuOpen: boolean;
}

export const IndividualChats = ({isSideBarOpen, isSideBarMenuOpen}: IndividualChatsProps) => {
    const {
        chats,
        currentChat,
        customTagNames ,
        setChatTags,
        renameTag,
        switchChat,
        renameChat,
        removeChat,
    } = useChatStore();

    const [isIndividualChatsSearchInputOpen, setIsIndividualChatsSearchInputOpen] = React.useState(false);
    const [isIndividualChatOpen, setIsIndividualChatOpen] = React.useState(false);
    const [expandedChatId, setExpandedChatId] = React.useState<string | null>(null);
    const [activeTagPanel, setActiveTagPanel] = useState<string | null>(null);
    const [isBranchMenuOpen, setIsBranchMenuOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
    const [individualChatsActionsPosition, setIndividualChatsActionsPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [isIndividualChatsActionsOpen, setIsIndividualChatsActionsOpen] = useState<boolean>(false);
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
    const [selectedTags, setSelectedTags] = React.useState<ChatTagsEnum[]>([]);

    const [inputValue, setInputValue] = useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const handleOpenIndividualChat = () => {
        setIsIndividualChatOpen(!isIndividualChatOpen);
    };

    const handleOpenIndividualChatsSearchInput = () => {
        setIsIndividualChatsSearchInputOpen(!isIndividualChatsSearchInputOpen);
    };

    const handleOpenBranchMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setMenuPosition({ top: event.clientY, right: event.clientX - 350 });
        setIsBranchMenuOpen(!isBranchMenuOpen);
    };

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

    React.useEffect(() => {
        if (activeTagPanel) {
            const panelChat = chats.find(c => c.id === activeTagPanel);
            setSelectedTags(panelChat?.tags ?? []);
        } else {
            setSelectedTags([]);
        }
        setInputValue("");
    }, [activeTagPanel, chats]);


    return isSideBarMenuOpen && (
        <>
            <div
                className={isSideBarOpen
                    ? !isIndividualChatsSearchInputOpen
                        ? css.open_sidebar_menu_action_container
                        : css.sidebar_search_input_container
                    :  css.sidebar_menu_action_container
                }
                data-active={isIndividualChatOpen}
                onClick={handleOpenIndividualChat}
            >
                <div
                    className={css.sidebar_menu_action_btn}
                    onClick={(e) => {
                        e.stopPropagation();
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
                        <div>Individual Chats</div>
                        <div
                            className={css.show_more_btn}

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
                                <ChatItem
                                    chat={chat}
                                    isOpen={isOpen}
                                    editingId={editingChatId}
                                    editingValue={editingChatValue}
                                    onStartEdit={(id, name) => { setEditingChatId(id); setEditingChatValue(name); }}
                                    onChangeEdit={(id, value) => setEditingChatValue(value)}
                                    onFinishEdit={(id, newName) => { renameChat(id, newName); setEditingChatId(null); }}
                                    onToggleExpand={setExpandedChatId}
                                    onOpenActions={e => {
                                        e.stopPropagation();
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
                                            onKeyPressInput={e => { if(e.key === " ") {/* logic from parent */} }}
                                        />
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

            {activeChatForActions && (() => {
                const { id, name, position } = activeChatForActions;

                return (
                    <CSSTransition
                        in={Boolean(activeChatForActions)}
                        timeout={200}
                        classNames="branchMenu"
                        unmountOnExit
                    >
                        <IndividualChatsActions
                            position={position}
                            onClose={() => setActiveChatForActions(null)}
                            onRename={() => {
                                setEditingChatId(id);
                                setEditingChatValue(name);
                                setActiveChatForActions(null);
                            }}
                            onDelete={() => {
                                removeChat(id);
                                setActiveChatForActions(null);
                            }}
                            onOpen={() => {
                                switchChat(id);
                                setActiveChatForActions(null);
                            }}
                        />
                    </CSSTransition>
                );
            })()}
        </>
    )
}