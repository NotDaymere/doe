import React, { useState } from "react";
import css from "./Tags.module.less";
import TagsIcon from "../../../../../shared/icons/TagsIcon";
import { ChatTagsEnum } from "../../../../../shared/enums/ChatTagsEnum";
import BranchIcon from "../../../../../shared/icons/Branch.icon";
import ThreeDotsIcon from "../../../../../shared/icons/ThreeDotsIcon";
import { CSSTransition } from "react-transition-group";
import AllBranchesMenu from "../../../../home-screens/ui/ChatContent/assets/AllBranchesMenu/AllBranchesMenu";
import { useChatStore } from "../../../../../shared/providers";
import { TAG_META } from "../SideBarMenu";
import ReactDOM from "react-dom";

interface TagsProps {
    isSideBarOpen: boolean;
    isSideBarMenuOpen: boolean;
}

export const Tags = ({ isSideBarOpen, isSideBarMenuOpen }: TagsProps) => {
    const { currentChat, customTagNames, getChatsByTags } = useChatStore();

    const [isTagsOpen, setIsTagsOpen] = React.useState(false);
    const [selectedTag, setSelectedTag] = React.useState<ChatTagsEnum | null>(null);
    const chatsByTags = getChatsByTags();
    const [expandedChatId, setExpandedChatId] = React.useState<string | null>(null);

    const [isBranchMenuOpen, setIsBranchMenuOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });
    const [activeOpenAllBranchesMenu, setActiveOpenAllBranchesMenu] = useState<number | null>(null);

    const handleToggleChatBranches = (chatId: string) => {
        setExpandedChatId((prev) => (prev === chatId ? null : chatId));
    };

    const handleOpenBranchMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setMenuPosition({ top: event.clientY, left: event.clientX + 30 });
        setIsBranchMenuOpen(!isBranchMenuOpen);
    };

    return (
        isSideBarMenuOpen && (
            <>
                <div
                    className={
                        !isSideBarOpen
                            ? css.sidebar_menu_action_container
                            : css.open_sidebar_menu_action_container
                    }
                    data-active={isTagsOpen}
                    onClick={() => {
                        setIsTagsOpen((prev) => !prev);
                        setSelectedTag(null);
                    }}
                >
                    <div className={css.sidebar_menu_action_btn}>
                        <TagsIcon fill="currentColor" />
                    </div>
                    <div className={css.sidebar_menu_action_btn_tooltip}>
                        <div>Tags</div>
                        <div className={css.show_more_btn}>{!isTagsOpen ? "+" : "-"}</div>
                    </div>
                </div>

                {isTagsOpen && isSideBarOpen && (
                    <div className={css.tags_container}>
                        {Object.entries(chatsByTags)
                            .filter(([tag, chats]) => tag !== "untagged" && chats.length > 0)
                            .map(([tag, chats]) => {
                                const tagEnum = tag as ChatTagsEnum;
                                const color = TAG_META[tagEnum].color;
                                const customName =
                                    customTagNames.get(tagEnum) ?? TAG_META[tagEnum].defaultName;
                                const isOpen = selectedTag === tagEnum;

                                return (
                                    <React.Fragment key={tag}>
                                        <div
                                            className={css.tag_item}
                                            onClick={() => setSelectedTag(isOpen ? null : tagEnum)}
                                            data-active={isOpen}
                                        >
                                            <div className={css.chat_item_tag_and_name}>
                                                <div
                                                    className={`${css.chat_tag} ${isOpen ? css.current_chat_tag : ""}`}
                                                    style={{ backgroundColor: color }}
                                                />
                                                <div className={css.chat_name}>
                                                    {customName}&nbsp;
                                                </div>
                                            </div>
                                            <div className={css.show_more_btn}>
                                                {isOpen ? "–" : "+"}
                                            </div>
                                        </div>

                                        {isOpen && (
                                            <div className={css.tag_chats_list}>
                                                <div className={css.chats}>Chats</div>
                                                {chats.map((chat) => {
                                                    const isChatOpen = expandedChatId === chat.id;
                                                    const branches =
                                                        chat.id === currentChat.id
                                                            ? currentChat.branches
                                                            : (chat.branches ?? []);

                                                    return (
                                                        <div key={chat.id}>
                                                            <div
                                                                className={css.chat_item}
                                                                data-active={isChatOpen}
                                                                onClick={() =>
                                                                    handleToggleChatBranches(
                                                                        chat.id
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        css.chat_item_tag_and_name
                                                                    }
                                                                >
                                                                    <div
                                                                        className={css.chat_tag}
                                                                        style={{
                                                                            backgroundColor:
                                                                                TAG_META[
                                                                                    selectedTag!
                                                                                ].color,
                                                                        }}
                                                                        title={
                                                                            customTagNames.get(
                                                                                selectedTag!
                                                                            ) ??
                                                                            TAG_META[selectedTag!]
                                                                                .defaultName
                                                                        }
                                                                    />
                                                                    <div className={css.chat_name}>
                                                                        {chat.name}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={css.show_more_btn}
                                                                    data-active={isChatOpen}
                                                                >
                                                                    {!isChatOpen ? "+" : "-"}
                                                                </div>
                                                            </div>

                                                            {isChatOpen && branches.length > 0 && (
                                                                <div
                                                                    className={
                                                                        css.branches_list_container
                                                                    }
                                                                >
                                                                    <div>Branches</div>
                                                                    <div
                                                                        className={
                                                                            css.branches_list
                                                                        }
                                                                    >
                                                                        {branches.map((branch) => (
                                                                            <div
                                                                                key={branch.id}
                                                                                className={
                                                                                    css.branch_item
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className={
                                                                                        css.branch_icon_and_name
                                                                                    }
                                                                                >
                                                                                    <div>
                                                                                        <BranchIcon
                                                                                            fill="currentColor"
                                                                                            width={
                                                                                                16
                                                                                            }
                                                                                            height={
                                                                                                16
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <div
                                                                                        className={
                                                                                            css.branch_name
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            branch.name
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        css.branch_three_dots
                                                                                    }
                                                                                    onClick={
                                                                                        handleOpenBranchMenu
                                                                                    }
                                                                                >
                                                                                    <ThreeDotsIcon />
                                                                                </div>

                                                                                {isBranchMenuOpen &&
                                                                                    branch.id !==
                                                                                        null &&
                                                                                    ReactDOM.createPortal(
                                                                                        <CSSTransition
                                                                                            in={
                                                                                                isBranchMenuOpen &&
                                                                                                branch.id !==
                                                                                                    null
                                                                                            }
                                                                                            timeout={
                                                                                                200
                                                                                            }
                                                                                            classNames="branchMenu"
                                                                                            unmountOnExit
                                                                                        >
                                                                                            <AllBranchesMenu
                                                                                                position={
                                                                                                    menuPosition
                                                                                                }
                                                                                                branchId={
                                                                                                    branch.id!
                                                                                                }
                                                                                                setActiveOpenAllBranchesMenu={
                                                                                                    setActiveOpenAllBranchesMenu
                                                                                                }
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
                                    </React.Fragment>
                                );
                            })}
                    </div>
                )}
            </>
        )
    );
};
