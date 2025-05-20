import React, { Dispatch, useEffect, useState } from "react";
import { Editor as EditorTiptap } from "@tiptap/react";
import hljs from "highlight.js";
import { useReferenceSelection } from "../../lib/hooks/useReferenceSelection";
import { IMessage } from "src/shared/types/Message";
import { useAppStore, useChatStore } from "src/shared/providers";

// Shared components
import { Editor } from "src/shared/components/Editor";
import { useApp } from "src/components/app";
import ExampleTableMassage from "./assets/ExampleTabelMassage/ExampleTableMassage";
import { FileListForDisplay } from "../../../../shared/components/FileList/FileListForDisplay";

// Icons
import CrossIcon from "src/shared/icons/Cross.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import css from "./ChatMessage.module.less";
import "highlight.js/styles/github-dark.css";
import { useChatContext } from "../../lib/hooks/ChatContext";
import { IPlayground } from "../../../../shared/types/Playground";
import { UserChatMessage } from "./assets/UserChatMessage/UserChatMeassage";
import { CodeChatMessage } from "./assets/CodeChatMessage/CodeChatMessage";

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
    const [isEdit, setEdit] = React.useState(false);

    const [content, setContent] = React.useState(data.content);
    const [updatedContent, setUpdatedContent] = useState(data.content);
    const {
        isCurrentBranchOpen,
        addMessageNodeVersion,
        addMessageNode,
        getLastCurrentVersionMessageNode,
        doMessageReply,
        setPlayground,
        setSavedPlaygrounds,
        deleteSavedPlaygrounds,
        getNoPlayground,
        setNoPlayground,
        closeNoPlayground,
        closeSavedPlaygrounds,
    } = useChatStore();
    const {
        isHyperlinkInputOpen,
        citationPlaygroundRef,
        setCitationPlaygroundRef,
        setIsCitationPlayground,
    } = useAppStore();
    const messageRef = React.useRef<HTMLDivElement>(null);

    const { setSelectedText, setIsShowReferencePanel } = useChatContext();
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
    useEffect(() => {
        setIsAllStepOpen(getNoPlayground().type === "source");
        if (getNoPlayground().type !== "iframe") {
            setCitationPlaygroundRef(null);
            setIsCitationPlayground(false);
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
        }
    }, [getNoPlayground()]);

    useEffect(() => {
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
                closeNoPlayground();
                setCitationPlaygroundRef(null);
                setIsCitationPlayground(false);
            } else {
                citationContainer.classList.add("citation-active");

                const citedText = citationContainer.querySelector(
                    ".cited-text"
                ) as HTMLElement | null;
                if (citedText) {
                    citedText.style.textDecoration = "underline dashed #9747FF";
                }

                const citationElement = citationContainer.querySelector(
                    ".citation"
                ) as HTMLElement | null;
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
                closeSavedPlaygrounds();
                setNoPlayground(newPlayground);
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
    };

    const handleEdit = async () => {
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
        setEdit(false);
    };

    const toggleEditUnauthorized = () => {
        setEdit(!isEdit);
    };
    if (data.isUser) {
        return (
            <UserChatMessage
                data={data}
                content={content}
                updatedContent={updatedContent}
                isCurrentBranchOpen={isCurrentBranchOpen}
                cancelEdit={cancelEdit}
                editMsgMode={editMsgMode}
                setContent={setContent}
                handleEdit={handleEdit}
                toggleEdit={toggleEdit}
            />
        );
    }

    if (data.isCode) {
        return (
            <CodeChatMessage
                isCurrentBranchOpen={isCurrentBranchOpen}
                data={data}
                isHyperlinkInputOpen={isHyperlinkInputOpen}
                referenceButtonVisible={referenceButtonVisible}
                referenceButtonPosition={referenceButtonPosition}
                handleClose={handleClose}
                handleReferenceClick={handleReferenceClick}
                messageRef={messageRef}
                isAllStepOpen={isAllStepOpen}
            />
        );
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
    );
};
