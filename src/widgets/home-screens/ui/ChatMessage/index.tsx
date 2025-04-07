import React, { Dispatch, useMemo, useState } from "react";
// External libraries
import { Editor as EditorTiptap } from "@tiptap/react";
import hljs from "highlight.js";
import { useReferenceSelection } from "../../lib/hooks/useReferenceSelection";


// Shared types & providers
import { IMessage } from "src/shared/types/Message";
import { useAppStore, useChatStore } from "src/shared/providers";

// Shared components
import { Editor } from "src/shared/components/Editor";
import { useApp } from "src/components/app";
import ExampleTableMassage from "./assets/ExampleTabelMassage/ExampleTableMassage";
import {FileListForDisplay} from "../../../../shared/components/FileList/FileListForDisplay";

// Icons
import CrossIcon from "src/shared/icons/Cross.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import SendIcon from "src/shared/icons/Send.icon";
import { ReactComponent as Logo } from "src/assets/icons/general-logo.svg";
import { SvgIcon } from "src/components/icon";

// Chat message utilities
import { parseContent } from "src/components/chat-message/parseContent";
import { parseTextFormatting } from "src/components/chat-message/parseTextFormatting";

// Styles
import css from "./ChatMessage.module.less";
import "highlight.js/styles/github-dark.css";
import PlayButtonIcon from "src/shared/icons/PlayButton.icon";
import DownloadIcon from "src/shared/icons/Download.icon";
import CopyButtonIcon from "src/shared/icons/CopyButton.icon";
import { useClickOut } from "src/shared/hooks/useClickOut";
import ReferenceButton from "../ChatReferences/ReferenceButton/ReferenceButton";

import { useChatContext } from "../../lib/hooks/ChatContext";
import TableRandomValues from "./assets/TableRandomValues/TableRandomValues";
import DownloadCSV from "./assets/DownloadCSV/DownloadCSV";
import PythonTaskManager from "./assets/PythonTaskManager/PythonTaskManager";

import { MessageNodeVersionSelector } from "./assets/MessageNodeVersionSelector/MessageNodeVersionSelector";
import GeneralLogo from "../GeneralLogo/GeneralLogo";
import MessageTable from "./assets/MessageTable/MessageTable";
import MessageFrame from "./assets/MessageFrame/MessageFrame";
import { mockTableData } from "./assets/MessageTable/mockTableData";
import { mockMessageFrameData } from "./assets/MessageFrame/mockMessageFrameData";
import ChartRenderer from "./assets/ChatRenderer/ChatRenderer";
import MessageColumnsChart from "./assets/MessageCharts/MessageColumnsChart/MessageColumnsChart";
import { mockColumnsChartMessageData } from "./assets/MessageCharts/MessageColumnsChart/mockColumnsChartMessageData";
import { usePanel } from "../../lib";
import { IPlayground } from "../../../../shared/types/Playground";
import { UserChatMessage } from "./assets/UserChatMessage/UserChatMeassage";
import { CodeChatMessage } from "./assets/CodeChatMessage/CodeChatMessage";
import AllBranches from "../ChatContent/assets/AllBranches/AllBranches";
import AllPlaygrounds from "../ChatContent/assets/AllPlaygrounds/AllPlaygrounds";
import SeeAllStepsIcon from "../../../../shared/icons/SeeAllSteps.icon";
import FavoriteIcon from "../../../../shared/icons/Favorite.icon";
import classNames from "classnames";
import MagicIcon from "../../../../shared/icons/Magic.icon";
import MessageLogoIcon from "../../../../shared/icons/MessageLogo.icon";

interface Props {
    data: IMessage;
    editor: EditorTiptap | null;
    editMsgMode: {
        isEditMsgMode: boolean;
        msgId: number | null;
    };
    setEditMsgMode: Dispatch<
        React.SetStateAction<{
            isEditMsgMode: boolean;
            msgId: number | null;
        }>
    >;
}

export const ChatMessage: React.FC<Props> = ({ data, editMsgMode, setEditMsgMode }) => {
    const [activeMenu, setActiveMenu] = React.useState(false);
    const downloadMenuRef = React.useRef<HTMLDivElement>(null);
    const downloadRef = useClickOut({
        handler: () => setActiveMenu(false),
    });

    const toggleMenu = () => setActiveMenu(!activeMenu);

    const setCloseHandler = (fn?: () => void) => {
        return () => {
            fn?.();
            setActiveMenu(false);
        };
    };

    const [isEdit, setEdit] = React.useState(false);
    const [isLiked, setIsLiked] = useState(data.isLiked || false);

    const [content, setContent] = React.useState(data.content);
    const [updatedContent, setUpdatedContent] = useState(data.content);
    const {
        setEditor,
        isCurrentBranchOpen,
        addMessageNodeVersion,
        addMessageNode,
        getLastCurrentVersionMessageNode,
        doMessageReply,
        setPlayground,
        setSavedPlaygrounds,
        savedPlaygrounds,
        deleteSavedPlaygrounds,
        updateSavedPlaygrounds,
        getOpenSavedPlaygrounds,
        getSavedPlaygroundLastByType,
        setMessageLike,
        // editor,
        // isHyperlinkInputOpen,
        // citationPlaygroundRef,
        // setCitationPlaygroundRef,
        // setIsCitationPlayground,
        playground,
        changeMessage,
        playgroundFullscreen,
        setMessagesCount,
        messagesCount,
    } = useChatStore();
    const {
        editor,
        isHyperlinkInputOpen,
        citationPlaygroundRef,
        setCitationPlaygroundRef,
        setIsCitationPlayground,
    } = useAppStore();
    const parsedContent = useMemo(() => parseContent(data.content), [data.content]);
    const messageRef = React.useRef<HTMLDivElement>(null);

    const [versions, setVersions] = useState<string[]>([data.content]);
    const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);

    // const [referenceButtonVisible, setReferenceButtonVisible] = React.useState(false);
    // const [referenceButtonPosition, setReferenceButtonPosition] = React.useState<{
    //     top: number;
    //     left: number
    // } | null>(null);

    const { setSelectedText, setIsShowReferencePanel } = useChatContext();
    const { setFiles } = usePanel();

    const [isShowLogoPopup, setIsShowLogoPopup] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(true);
    const [isAllStepOpen, setIsAllStepOpen] = React.useState(false);

    const {
        visible: referenceButtonVisible,
        position: referenceButtonPosition,
        close: handleClose,
        handleReferenceClick,
    } = useReferenceSelection(messageRef, (text) => {
        setSelectedText(text);
        setIsShowReferencePanel(true);
    });


    React.useEffect(() => {
        const handleCitationClick = (event: Event) => {
            const targetElement = event.target as HTMLElement;

            const citationContainer = targetElement.closest(".citation-container");
            if (!citationContainer) {
                return;
            }

            const fileInput = document.getElementById("fileInput");
            if (fileInput && fileInput.contains(targetElement)) {
                return;
            }

            event.preventDefault();

            const citationUrl = citationContainer.getAttribute("data-citation-url");
            if (!citationUrl) return;

            const allCitationContainers = document.querySelectorAll(".citation-container");
            allCitationContainers.forEach((container) => {
                container.classList.remove("citation-active");
                const citedText = container.querySelector(".cited-text") as HTMLElement | null;
                if (citedText) {
                    citedText.style.textDecoration = "";
                }
                const citationEl = container.querySelector(".citation") as HTMLElement | null;
                if (citationEl) {
                    citationEl.style.border = "";
                    citationEl.style.backgroundColor = "";
                    citationEl.style.color = "";
                }
            });

            if (citationPlaygroundRef === citationUrl) {
                const existingIframe = savedPlaygrounds.find(p => p.type === "iframe");
                if (existingIframe) {
                    deleteSavedPlaygrounds(existingIframe.id);
                }
                setPlayground({
                    type: null,
                    name: "",
                    open: false,
                    data: null,
                    text: "",
                    id: null,
                });
                setCitationPlaygroundRef(null);
                setIsCitationPlayground(false);
            } else {
                citationContainer.classList.add("citation-active");

                const citedText = citationContainer.querySelector(".cited-text") as HTMLElement | null;
                if (citedText) {
                    citedText.style.textDecoration = "underline dashed #9747FF";
                }

                const citationElement = citationContainer.querySelector(".citation") as HTMLElement | null;
                if (citationElement) {
                    citationElement.style.border = "1px solid #9747ff";
                    citationElement.style.backgroundColor = "#9747ff";
                    citationElement.style.color = "#FFFFFF";
                }

                const domain = new URL(citationUrl).hostname;
                const newId = Date.now().toString();
                const newPlayground: IPlayground = {
                    id: newId,
                    name: `Citation: ${domain}`,
                    type: "iframe",
                    data: citationUrl,
                    open: true,
                };
                const oldPlayground = getSavedPlaygroundLastByType('iframe');
                if (getOpenSavedPlaygrounds().length >= 2) {
                    const lastPlayground = getOpenSavedPlaygrounds().at(-1) || oldPlayground;
                    console.log(lastPlayground);
                    if (lastPlayground && lastPlayground.type != 'iframe') {
                        lastPlayground.open = false;
                        updateSavedPlaygrounds(lastPlayground);
                    }
                }
                const existingIframe = savedPlaygrounds.find(p => p.type === "iframe");
                if (existingIframe) {
                    const updatedPlayground = { ...existingIframe, ...newPlayground };
                    updateSavedPlaygrounds(updatedPlayground);
                    setPlayground(updatedPlayground);
                } else {
                    setSavedPlaygrounds(newPlayground);
                    setPlayground(newPlayground);
                }
                setCitationPlaygroundRef(citationUrl);
                setIsCitationPlayground(true);
            }
        };

        document.addEventListener("click", handleCitationClick);
        return () => {
            document.removeEventListener("click", handleCitationClick);
        };
    }, [
        citationPlaygroundRef,
        setCitationPlaygroundRef,
        setIsCitationPlayground,
        setSavedPlaygrounds,
        setPlayground,
    ]);

    React.useEffect(() => {
        if (messageRef.current) {
            const codeBlocks = messageRef.current.querySelectorAll("code");
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [content, messageRef]);

    const toggleEdit = (id: number) => {
        setEditMsgMode({ isEditMsgMode: true, msgId: id });
        // setEditMsgMode(!editMsgMode);
    };

    const handleEdit = async () => {
        // handleSendButtonClick()
        //
        const newId = Date.now();

        const newMessage: IMessage = {
            ...data,
            id: newId,
            content: content,
        };


        addMessageNodeVersion(data.id, newMessage);

        setUpdatedContent(content);
        setEditMsgMode({ isEditMsgMode: false, msgId: null });

        const reply = await doMessageReply();
        const lastNodeForUserMessage = getLastCurrentVersionMessageNode();
        addMessageNode(lastNodeForUserMessage, reply);

    };

    const cancelEdit = (id: number) => {
        setContent(data.content);
        setEditMsgMode({ isEditMsgMode: false, msgId: null });
        // setEditMsgMode(false);
        setEdit(false);

    };

    const openSourcePlayground = (sourceData: string) => {
        if (getOpenSavedPlaygrounds().length >= 2) {
            const oldPlayground = getSavedPlaygroundLastByType('source');
            const lastPlayground = getOpenSavedPlaygrounds().at(-1) || oldPlayground;
            console.log(lastPlayground);
            if (lastPlayground && lastPlayground.type != 'source') {
                lastPlayground.open = false;
                updateSavedPlaygrounds(lastPlayground);
            }
        }
        if (isAllStepOpen) {
            const existingAllStep = savedPlaygrounds.find(p => p.type === "source");
            if (existingAllStep) {
                deleteSavedPlaygrounds(existingAllStep.id);
            }
            setIsAllStepOpen(false);
        } else {

            const newPlayground: IPlayground = {
                id: "see_all_steps",
                name: "See All Steps",
                type: "source",
                data: sourceData,
                open: true,
            };

            const existingAllStep = savedPlaygrounds.find(p => p.type === "source");
            if (existingAllStep) {
                const updatedPlayground = { ...existingAllStep, ...newPlayground };
                updateSavedPlaygrounds(updatedPlayground);
                setPlayground(updatedPlayground);
            } else {
                setSavedPlaygrounds(newPlayground);
                setPlayground(newPlayground);
            }

            setIsAllStepOpen(true);
        }
    };


    const toggleEditUnauthorized = () => {
        setEdit(!isEdit);
    };
    if (data.isUser) {
        return <UserChatMessage
            data={data}
            content={content}
            updatedContent={updatedContent}
            isCurrentBranchOpen={isCurrentBranchOpen}
            cancelEdit={cancelEdit}
            editMsgMode={editMsgMode}
            setContent={setContent}
            handleEdit={handleEdit}
            toggleEdit={toggleEdit} />
    }

    if (data.isCode) {
        return <CodeChatMessage
            isCurrentBranchOpen={isCurrentBranchOpen}
            data={data}
            isHyperlinkInputOpen={isHyperlinkInputOpen}
            referenceButtonVisible={referenceButtonVisible}
            referenceButtonPosition={referenceButtonPosition}
            handleClose={handleClose}
            handleReferenceClick={handleReferenceClick}
            messageRef={messageRef}
            openSourcePlayground={openSourcePlayground}
            isAllStepOpen={isAllStepOpen}
            />
    }

    return (
        <div className={css.input}>
            <button className={css.input_editBtn} onClick={toggleEditUnauthorized}>
                <PenIcon />
            </button>
            <div
                className={css.input_message}
                dangerouslySetInnerHTML={{
                    __html: data.content,
                }}
            />
        </div>
    )
}