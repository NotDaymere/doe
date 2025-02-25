import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import { Flex } from "antd";
import { FC, useEffect, useState } from "react";
import { useApp } from "src/components/app";
import { ChatInput } from "src/components/chat-input";
import { ChatMessage } from "src/components/chat-message";
import { testTextAndCharts } from "src/components/chat-message/mockData";
import CustomTable from "src/components/custom-table";
import Drawing from "src/components/drawing-renderer";
import { SvgIcon } from "src/components/icon";
import { CustomEditor } from "src/components/tiptap-editor";
import {
    CustomCodeBlock,
    CustomInlineCode,
    CustomSpan,
    Div,
    Formula,
    createDisableEnterWithShift,
    createHandleTab,
} from "src/components/tiptap-editor/extensions/index";
import { GoogleDocWidget, MiroWidget, SpotifyWidget, YouTubeWidget } from "src/components/widgets";
import { useEditorContext } from "src/contexts/EditorProvider";
import { App } from "src/types";
import DefaultLayout from "../../components/layout"
import "./index.less";
import ChartWidgetsWindow from "src/components/widgetAndChart/Window/ChartWidgetsWindow";
import Console from "src/components/Console/Console";
import Comments from "src/components/Comments/Comments";
import AddChartsAndWidgets from "src/components/AddChartsAndWidgets/AddChartsAndWidgets";


const Home: FC = () => {
    const {
        setEditor,
        setIsEditing,
        setInputPosition,
        setLinkInputVisible,
        closeLinkInput,
        setLinkUrl,
        linkInputVisible,
    } = useEditorContext();

    const { playground, messages, setMessages } = useApp().app;

    useEffect(() => {
        const contentArray = messages.map((msg) => msg.content);
        localStorage.setItem("messagesContent", JSON.stringify(contentArray));
    }, [messages]);

    useEffect(() => {
        const savedContent = localStorage.getItem("messagesContent");
        if (savedContent) {
            const parsedContent = JSON.parse(savedContent);
            const loadedMessages = parsedContent.map((content: string, index: number) => ({
                id: Date.now() + index,
                content,
                isUser: false,
            }));
            setMessages(loadedMessages);
        }
    }, [setMessages]);

    const [editMessage, setEditMessage] = useState<{ id: number | null }>({ id: null });

    const handleSendMessage = (messageContent: string, files?: UploadFile[]) => {
        const newMessage: App.Message = {
            id: Date.now(),
            content: messageContent,
            files: files,
            isUser: true,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setTimeout(() => {
            const botResponse: App.Message = {
                id: Date.now() + 1,
                content: testTextAndCharts,
                isUser: false,
                isCode: true,
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 500);
    };

    const handleUpdateMessage = (messageContent: string) => {
        const updatedMessage: App.Message = {
            id: editMessage.id,
            content: messageContent,
            isUser: true,
        };

        setMessages((prevMessages) =>
            prevMessages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
        );

        setEditMessage({ id: null });
        setIsEditing(false);
    };

    const editor = useEditor({
        extensions: [
            Div,
            Document,
            Text,
            History.configure({
                depth: 100,
                newGroupDelay: 500,
            }),
            Paragraph,
            Bold,
            Italic,
            CustomSpan,
            Formula,
            Underline,
            CustomInlineCode,
            CustomCodeBlock,
            Link.configure({
                autolink: false,
            }),
            createHandleTab(),
            createDisableEnterWithShift({
                onSendMessage: handleUpdateMessage,
            }),
        ],
        onSelectionUpdate: () => {
            if (editor?.view) {
                const { from, to } = editor.state.selection;

                try {
                    const selectionCoords = editor.view.coordsAtPos((from + to) / 2);
                    setInputPosition({
                        top: selectionCoords.top - 30,
                        left: selectionCoords.left,
                    });
                } catch (error) {
                    console.error("Error in coordsAtPos:", error);
                }

                const linkAttrs = editor?.getAttributes("link");

                if (linkAttrs?.href) {
                    setLinkUrl(linkAttrs.href);
                    setLinkInputVisible(true);
                } else if (linkInputVisible) {
                    closeLinkInput();
                }
            }
        },
    });

    useEffect(() => {
        if (editMessage.id && editor) {
            setIsEditing(true);
            const message = messages.find((msg) => msg.id === editMessage.id);

            if (message) {
                editor.commands.focus();
                editor.commands.setContent(message.content);
            }
        }
    }, [editMessage.id, editor, messages]);
    
    console.log(messages)

    return (
        <DefaultLayout>
          
            <div className={"home-page"}>
               
                <div className={"page-section chat-section"}>
                    <div className={"chat-container"}>
                     
                    
                        <Flex vertical gap={75}>
                        
                        
                            <h2>Table Example</h2>


                            {/* <Console/> */}
                           <AddChartsAndWidgets/>
                           <Comments/>
                           <ChartWidgetsWindow/>
                            {!playground.open && <CustomTable />}
                            <h2>YouTube Widget Example</h2>
                            <YouTubeWidget
                                src={
                                
                                    "https://www.youtube.com/embed/LXb3EKWsInQ?si=YqSqq2qm6X3tc-9F"
                                }
                            />
                            <h2>Spotify Widget Example</h2>
                            <SpotifyWidget
                                url={
                                    "https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3?utm_source=generator"
                                }
                            />
                            <h2>Google Doc Widget Example</h2>
                            <GoogleDocWidget
                                url={
                                    "https://docs.google.com/document/d/1bfUdYe_hUMERVwgIUO0jW8EEFNs5jSml9nOdUA_fikg/edit?usp=sharing"
                                }
                            />
                            <h2>Miro Widget Example</h2>
                            <MiroWidget
                                url={
                                    "https://miro.com/app/board/uXjVL_0dl7Q=/?share_link_id=661110526142"
                                }
                            />
                            <h2>Drawing Example</h2>
                            <Drawing />
                        </Flex>
                        {messages.map((msg) =>
                            msg.id === editMessage.id ? (
                                <div key={"1"} className={"message-editor-container"}>
                                    <CustomEditor
                                        classname={"message-editor"}
                                        key={msg.id}
                                        editor={editor}
                                    />

                                    <Flex
                                        justify={"flex-end"}
                                        gap={8}
                                        className={"buttons-container"}
                                    >
                                        <button
                                            className={"send-message button"}
                                            onClick={() => handleUpdateMessage(editor!.getHTML())}
                                        >
                                            <SvgIcon type={"sendMessage"} />
                                        </button>

                                        <button
                                            className={"close-editor button"}
                                            onClick={() => setEditMessage({ id: null })}
                                        >
                                            <SvgIcon type={"xMark"} />
                                        </button>
                                    </Flex>
                                </div>
                            ) : (
                                <ChatMessage
                                    key={msg.id}
                                    editor={editor}
                                    id={msg.id}
                                    content={msg.content}
                                    files={msg.files}
                                    isUser={msg.isUser}
                                    isCode={msg.isCode}
                                    onEditMessage={setEditMessage}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className={"page-section input-section"}>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Home;
