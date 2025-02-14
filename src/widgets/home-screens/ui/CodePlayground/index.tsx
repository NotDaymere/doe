import { Flex } from "antd";
import { FC, useRef, useState } from "react";
import "./index.less";
import * as monaco from "monaco-editor";
import Editor, { OnMount } from "@monaco-editor/react";
import { calculateButtonPosition } from "../../../../components/code-playground/helpers/calculateButtonPosition";
import { useChatStore } from "../../../../shared/providers";
import MonacoEditorMenu from "./assets/MonacoEditorMenu";
import CloudPlusButton from "../PlaygroundButtons/CloudPlusButton/CloudPlusButton";
import PenFormatingButton from "../PlaygroundButtons/PenFormatingButton/PenFormatingButton";
import ResizePlaygroundButton from "../PlaygroundButtons/ResizePlaygroundButton/ResizePlaygroundButton";

const CodePlayground: FC = () => {
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

    const { setPlayground } = useChatStore();
    const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [isPen, setIsPen] = useState<boolean>(false);
    const [buttonPosition, setButtonPosition] = useState<{ top?: number; left?: number; bottom?: number; right?: number } | null>(null);

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

    const handleCollapsePlayground = () => setPlayground({ type: null, data: null, id: null, open: false });

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

    const handlePenClick = () => {
        if (selectedText) {
            setSelectedText(null);
            setButtonPosition(null);
            setIsPen(false);
        } else {
            setSelectedText("Pen");
            setIsPen(true);
            setButtonPosition({ bottom: 137, right: 45 });
        }
    };

    return (
        <div className="table-playground">
            <Flex className="tabs-panel-playground">Python Task Manager</Flex>
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
                    defaultValue={`def delete_element(my_list, element):
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
            <div className="action-buttons">
                <CloudPlusButton />
                <div className="action-buttons-right-part">
                    <PenFormatingButton isActive={selectedText} onClick={handlePenClick} />
                    <ResizePlaygroundButton onClick={handleCollapsePlayground} />
                </div>
            </div>
            {selectedText && editorInstance && (
                <MonacoEditorMenu
                    buttonPosition={{
                        top: buttonPosition?.top,
                        left: buttonPosition?.left,
                        bottom: buttonPosition?.bottom,
                        right: buttonPosition?.right,
                    }}
                    isPen={isPen}
                    editor={editorInstance}
                />
            )}
        </div>
    );
};

export default CodePlayground;
