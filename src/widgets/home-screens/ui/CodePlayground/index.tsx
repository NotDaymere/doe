import { Flex } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import "./index.less";
import * as monaco from "monaco-editor";
import Editor, { OnMount } from "@monaco-editor/react";
import { calculateButtonPosition } from "../../../../components/code-playground/helpers/calculateButtonPosition";
import { useChatStore, usePlaygroundStore, useVersionHistoryStore } from "../../../../shared/providers";
import MonacoEditorMenu from "./assets/MonacoEditorMenu/MonacoEditorMenu";
import CloudPlusButton from "../PlaygroundButtons/CloudPlusButton/CloudPlusButton";
import PenFormatingButton from "../PlaygroundButtons/PenFormatingButton/PenFormatingButton";
import ResizePlaygroundButton from "../PlaygroundButtons/ResizePlaygroundButton/ResizePlaygroundButton";
import QuestionCode from "./assets/QuestionCode/QuestionCode";
import FullscreenGeneralLogo from "../TablePlayground/assets/FullscreenGeneralLogo/FullscreenGeneralLogo";
import { App } from "../../../../types";
import PlaygroundAction from "../PlaygroundAction/PlaygroundAction";
import HistoryButton from "../TablePlayground/assets/HistoryButton/HistoryButton";

const CodePlayground: FC<Partial<App.Playground>> = ({ id = null }) => {
    function adjustPosition(rawPosition: { top: number; left: number }, containerWidth: number, containerHeight: number, margin = 10) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let { top, left } = rawPosition;
        if (left + containerWidth + margin > viewportWidth) {
            left = viewportWidth - containerWidth - margin;
        }
        if (left < margin) {
            left = margin;
        }
        if (top + containerHeight + margin > viewportHeight) {
            top = viewportHeight - containerHeight - margin;
        }
        if (top < margin) {
            top = margin;
        }
        return { top, left };
    }

    const { playground, getSavedPlayground, setPlayground, playgroundFullscreen, updateSavedPlaygrounds, getOpenSavedPlaygrounds } = useChatStore();
    const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [isPen, setIsPen] = useState<boolean>(false);
    const [buttonPosition, setButtonPosition] = useState<{ top?: number; left?: number; bottom?: number; right?: number } | null>(null);
    const [playgroundState, setPlaygroundState] = useState(getSavedPlayground(id));
    const { playgroundAction } = usePlaygroundStore();
    const { openHistory, updateHistory } = useVersionHistoryStore();
    const divRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setContainerWidth(divRef.current.getBoundingClientRect().width);
        }

        const handleResize = () => {
            if (divRef.current) {
                setContainerWidth(divRef.current.getBoundingClientRect().width);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const handleSave = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "s") {
                event.preventDefault();

                if (playgroundState) {
                    updateHistory({
                        id: Date.now(),
                        name: null,
                        time: new Date().toLocaleString(),
                        user: "Current User",
                        photo: "/temp/profile.jpg",
                        playgroundId: playgroundState.id,
                        playground: playgroundState,
                    });

                    console.log("History updated:", playgroundState);
                }
            }
        };

        window.addEventListener("keydown", handleSave);
        return () => {
            window.removeEventListener("keydown", handleSave);
        };
    }, [playgroundState]);

    useEffect(() => {
        setTimeout(() => setShowButtons(true), 50);
    }, []);
    const customTheme: monaco.editor.IStandaloneThemeData = {
        base: "vs",
        inherit: true,
        rules: [
            { token: "keyword", foreground: "#FF5F5F" },
            { token: "type", foreground: "#FF5F5F" },
            { token: "string", foreground: "#04A57C" },
            { token: "delimiter", foreground: "#04A57C" },
            { token: "support.function", foreground: "#E4930D" },
            { token: "number", foreground: "#DA2F76" },
            { token: "identifier", foreground: "#0171C1" },
            { token: "variable", foreground: "#28ABFB" },
            { token: "function", foreground: "#E4930D" },
        ],
        colors: {
            "editor.background": "#F1F1F1",
            "editor.lineHighlightBackground": "#F1F1F1",
            "editor.selectionBackground": "#F1E7FF",
            "editor.inactiveSelectionBackground": "#F1E7FF",
            "editor.selectionHighlightBackground": "#F1E7FF",
            "editor.findMatchBackground": "#F1E7FF",
            "editor.findMatchHighlightBackground": "#F1E7FF",
            "editorCursor.foreground": "#9747FF",
        },
    };

    const handleCollapsePlayground = () => {
        const newPlayground = getOpenSavedPlaygrounds().at(1)
            || { type: null, name: "", data: null, id: null, open: false };
        setPlayground(newPlayground);
    };

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        setEditorInstance(editor);
        editor.focus();
        monaco.editor.defineTheme("myCustomTheme", customTheme);
        monaco.editor.setTheme("myCustomTheme");
        editor.onMouseUp(() => {
            setIsPen(false);
            handleEditorMouseUp(editor);
        });
        editor.onKeyUp(() => {
            setIsPen(false);
            handleEditorMouseUp(editor);
        });
    };

    const handleEditorMouseUp = (editor: monaco.editor.IStandaloneCodeEditor) => {
        updateSelectedText(editor);
        const position = calculateButtonPosition(editor);
        if (position) {
            const adjustedPosition = adjustPosition({ top: position.top, left: position.left }, 280, 20, 10);
            setButtonPosition(adjustedPosition);
        }
    };

    const updateSelectedText = (editor: monaco.editor.IStandaloneCodeEditor) => {
        const selection = editor.getSelection();
        if (selection) {
            const model = editor.getModel();
            if (!model) return;
            const selectedText = model.getValueInRange(selection);
            setSelectedText(selectedText);
        }
    };

    const handlePenClick = (position: any) => {
        if (isPen) {
            setSelectedText(null);
            setButtonPosition(null);
            setIsPen(false);
        } else {
            setSelectedText(selectedText ? selectedText : "Pen");
            setIsPen(true);
            setButtonPosition(position);
        }
    };

    useEffect(() => {
        if (!editorInstance || !playgroundState) return;

        const handleContentChange = () => {
            const newContent = editorInstance.getValue();
            console.log(newContent);
            setPlaygroundState((prev: any) => {
                if (!prev) return null;

                const updatedPlayground = { ...prev, text: newContent };
                updateSavedPlaygrounds(updatedPlayground);
                return updatedPlayground;
            });
        };
        const disposable = editorInstance.onDidChangeModelContent(handleContentChange);
        return () => {
            disposable.dispose();
        };

    }, [editorInstance, playgroundState]);

    useEffect(() => {
        if (!editorInstance || !playgroundState?.text) return;

        const model = editorInstance.getModel();
        if (!model) return;

        const position = editorInstance.getPosition();

        if (model.getValue() !== playgroundState.text) {
            editorInstance.pushUndoStop();
            model.setValue(playgroundState.text);
            editorInstance.pushUndoStop();
        }

        if (position) {
            editorInstance.setPosition(position);
            editorInstance.revealPosition(position);
        }
    }, [playgroundState, editorInstance]);


    useEffect(() => {
        setPlaygroundState(getSavedPlayground(id))
    }, [getSavedPlayground(id)]);

    return (
        <>
            <div className="table-playground"
                 onMouseDown={(event) => {
                     if (event.button === 1) {
                         handleCollapsePlayground();
                     }
                 }}
                 onMouseMove={() => {
                     if (playgroundAction) return
                     playgroundState && setPlayground(playgroundState)
                 }}
                 ref={divRef}
            >
                <Flex className={"tabs-panel-playground"}>
                    <p>{ playgroundState?.name }</p>
                    <HistoryButton id={id} />
                </Flex>
                <section className="editor-section">
                    <Editor
                        onMount={handleEditorMount}
                        theme="myCustomTheme"
                        language="python"
                        height="100%"
                        options={{
                            tabSize: 2,
                            insertSpaces: true,
                            minimap: { enabled: false },
                            lineNumbers: "on",
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            overviewRulerLanes: 0,
                            autoIndent: "none",
                            detectIndentation: false,
                        }}
                        className="table-playground-editor"
                        defaultValue={playgroundState?.text || `def delete_element(my_list, element):
    """Removes the first occurrence of the element from the list."""
    try:
        my_list.remove(element)
        return my_list
    except ValueError:
        return f"Element {element} not found in the list."

# Example usage
my_list = [1, 2, 3, 4, 5]
element_to_delete = 3

result = delete_element(my_list, element_to_delete)
print(result)

def delete_element(my_list, element):
    """Removes the first occurrence of the element from the list."""
    try:
        my_list.remove(element)
        return my_list
    except ValueError:
        return f"Element {element} not found in the list."

# Example usage
my_list = [1, 2, 3, 4, 5]
element_to_delete = 3

result = delete_element(my_list, element_to_delete)
print(result)`.trim()}
                    />
                </section>
                {
                    playground.id == id &&
                    <div className={`action-buttons ${showButtons && 'visible'}`}>
                        {
                            !playgroundAction
                                ? <>
                                    <div className={"action-buttons-left-part"}>
                                        {(!playgroundFullscreen && !openHistory) && <CloudPlusButton type="code" />}
                                        {playgroundFullscreen && <FullscreenGeneralLogo />}
                                    </div>
                                    {!openHistory &&
                                        <div className={"action-buttons-right-part"}>
                                            {playgroundFullscreen && <CloudPlusButton type="code" />}
                                            <PenFormatingButton isActive={selectedText} onClick={handlePenClick} />
                                            <ResizePlaygroundButton />
                                        </div>
                                    }
                                </>
                                : <>
                                    {playgroundFullscreen && (
                                        <div className={"action-buttons-left-part"}>
                                            <FullscreenGeneralLogo />
                                        </div>
                                    )}
                                    <div className={"action-buttons-center-part"}>
                                        <PlaygroundAction playgroundAction={playgroundAction} editor={editorInstance} containerWidth={containerWidth} />
                                    </div>
                                    {playgroundFullscreen && <>
                                        {!openHistory && <div className={"action-buttons-right-part"}>
                                            <CloudPlusButton type="code" />
                                            <PenFormatingButton isActive={selectedText} onClick={handlePenClick} />
                                            <ResizePlaygroundButton />
                                        </div>}
                                    </>}
                                </>
                        }
                    </div>
                }
            </div>
            {selectedText && editorInstance && (
                isPen ? (<MonacoEditorMenu
                        buttonPosition={{
                            top: buttonPosition?.top,
                            left: buttonPosition?.left,
                            bottom: buttonPosition?.bottom,
                            right: buttonPosition?.right,
                        }}
                        isPen={isPen}
                        editor={editorInstance}
                    />)
                    : (<QuestionCode
                            buttonPosition={{
                                top: buttonPosition?.top,
                                left: buttonPosition?.left,
                                bottom: buttonPosition?.bottom,
                                right: buttonPosition?.right,
                            }}
                            editor={editorInstance}
                        />
                    )
            )}
        </>
    );
};

export default CodePlayground;
