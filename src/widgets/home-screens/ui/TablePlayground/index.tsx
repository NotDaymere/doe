import { Flex, Table, TableProps } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import table from "./Table";
import "./index.less";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { calculateTiptapButtonPosition } from "src/components/code-playground/helpers/calculateButtonPosition";
import { useChatStore, usePlaygroundStore, useVersionHistoryStore } from "src/shared/providers";
import TipTapTextFormatMenu from "./assets/TextFormat/TipTapTextFormatMenu";
import ResizePlaygroundButton from "../PlaygroundButtons/ResizePlaygroundButton/ResizePlaygroundButton";
import CloudPlusButton from "../PlaygroundButtons/CloudPlusButton/CloudPlusButton";
import PenFormatingButton from "../PlaygroundButtons/PenFormatingButton/PenFormatingButton";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import FullscreenGeneralLogo from "./assets/FullscreenGeneralLogo/FullscreenGeneralLogo";
import HistoryButton from "./assets/HistoryButton/HistoryButton";
import { App } from "src/types";
import PlaygroundAction from "../PlaygroundAction/PlaygroundAction";
import { CustomBlock } from "./assets/CustomBlock/CustomBlock";
import AddChartsAndWidgets from "src/components/AddChartsAndWidgets/AddChartsAndWidgets";
import {Clickable} from "src/helpers/clickable";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";



const TablePlayground: FC<Partial<App.Playground>> = ({ id = null }) => {
    function adjustPosition(
        rawPosition: { top: number; left: number },
        containerWidth: number,
        containerHeight: number,
        margin = 10
    ) {
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

    const {
        playground,
     
        getSavedPlayground,
        setPlayground,
        playgroundFullscreen,
        updateSavedPlaygrounds,
        getOpenSavedPlaygrounds,
    } = useChatStore();
    const { playgroundAction } = usePlaygroundStore();
    const [playgroundState, setPlaygroundState] = useState(getSavedPlayground(id));
    const [mockData, setMockData] = useState(() => {
    
        const savedData = playgroundState?.data;
 
        if (savedData instanceof Object) {
            return savedData;
        } else {
            const savedData = table();
            if (playgroundState) {
                playgroundState.data = savedData;
                updateSavedPlaygrounds(playgroundState);
            }
            return table();
        }
    });
    const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedCell, setSelectedCell] = useState<string | null>(null);
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [isPen, setIsPen] = useState<boolean>(false);
    const [buttonPosition, setButtonPosition] = useState<{
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    } | null>(null);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Superscript,
            Subscript,
           
       
            Clickable,
            Color.configure({
                types: ["textStyle"],
            }),
            CustomBlock,
        ],
        content: playgroundState?.text
            ? playgroundState.text
            : `<p>
        This is what your table looks like when it's in Doe Playground! 
       
        Larger tables can be navigated, folded in to reveal text, etc.
        Typically, a Playground table will not include both text blocks and graphs 
        as it does here, but it is still possible! 
        The graph interaction with highlighting still applies here!
    
        </p>`,
        // editable:false,
      
        onSelectionUpdate({ editor }) {
            const { from, to } = editor.state.selection;
            const text = editor.state.doc.textBetween(from, to, " ");
          
        
            setSelectedText(text);

            const position = calculateTiptapButtonPosition(editor);
            if (position) {
          
                const adjustedPosition = adjustPosition(
                    { top: position.top, left: position.left },
                    280,
                    20,
              
                    10
                );
                setButtonPosition(adjustedPosition);
                setIsPen(false);
            }
        },
    });
    const divRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const { openHistory, updateHistory } = useVersionHistoryStore();
    const [showButtons, setShowButtons] = useState(false);


     const comment = useCommentWindowStore((s) => s.comment);
        
    const isOpen = useCommentWindowStore((s) => s.isOpen);
    const setComment = useCommentWindowStore((s) => s.setComment);
        
    const openComments = useCommentWindowStore((s) => s.openComments);

    useEffect(()=>{
        
        if(!editor || comment?.message.length == 0) return;
          const selectedText = editor.state.doc.textBetween(comment?.from, comment?.to, "");
         editor.chain().focus().deleteRange({ from:comment?.from, to:comment?.to }).insertContent({
        type: "text",
        text: selectedText,
        marks: [
       
            
            { type: "clickable", attrs: { id: comment?.id } },
     
            { type: "highlight", attrs: { class: "highlighted" } },
         ],
    }).run();
    },[comment])

    useEffect(() => {
        const handleSave = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "s") {
                event.preventDefault();

                setPlaygroundState((prev) => {
                    if (prev) {
                        const updatedHistory = {
                            id: Date.now(),
                            name: null,
                            time: new Date().toLocaleString(),
                            user: "Current User",
                            photo: "/temp/profile.jpg",
                            playgroundId: prev.id,
                            playground: prev,
                        };

                        updateHistory(updatedHistory);
                        return { ...prev };
                    }
                    return prev;
                });
            }
        };

        window.addEventListener("keydown", handleSave);

        return () => {
            window.removeEventListener("keydown", handleSave);
        };
    }, []);

    useEffect(() => {
        if (id !== null && playgroundState?.data) {
            playgroundState.data = mockData;
            updateSavedPlaygrounds(playgroundState);
        }
    }, [mockData, id]);

    useEffect(() => {
        setPlaygroundState(getSavedPlayground(id));
    }, [getSavedPlayground(id)]);

    useEffect(() => {
        if (!editor) return;

        const selection = editor.state.selection;

        editor.commands.setContent(
            playgroundState?.text ||
                `<p>
        This is what your table looks like when it's in Doe Playground! 
        Larger tables can be navigated, folded in to reveal text, etc.
        Typically, a Playground table will not include both text blocks and graphs 
        as it does here, but it is still possible! 
        The graph interaction with highlighting still applies here!
      </p>`,
            true
        );

        editor.commands.setTextSelection(selection);
    }, [playgroundState, editor]);

    useEffect(() => {
        if (id !== null) {
            const savedData = playgroundState?.data;
            if (savedData instanceof Object) {
                setMockData(savedData);
            } else {
                setMockData(table());
            }
        }
    }, [id]);

    useEffect(() => {
        setTimeout(() => setShowButtons(true), 50);
    }, []);

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
        return () => {
            if (divRef.current) {
                divRef.current.classList.add("close");
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // useEffect(() => {
    //     handleSetDataToInput();
    // }, [selectedRow, selectedColumn, selectedCell]);
    //
    // const handleSetDataToInput = () => {
    //     if (!editor) return;
    //
    //     let template = "";
    //     if (selectedCell) {
    //         template = `<div>I have a question about <span class="highlighted-span green">Tab ${selectedCell}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    //     } else if (selectedRow) {
    //         template = `<div>I have a question about <span class="highlighted-span green">Row ${selectedRow}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    //     } else if (selectedColumn) {
    //         template = `<div>I have a question about <span class="highlighted-span green">Column ${selectedColumn}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    //     }
    //     if (template) {
    //         editor.commands.setContent(template);
    //     }
    // };

    const rowHeaderColumn: TableProps<any>["columns"] = [
        {
            title: "",
            dataIndex: "rowHeader",
            width: "36px",
            render: (_: any, __: any, rowIndex: number) => `${rowIndex + 1}`,
            onCell: (_: any, rowIndex?: number) => ({
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                    if (rowIndex === undefined) return;
                    setSelectedRow(rowIndex + 1);
                    setSelectedCell(null);
                    setSelectedColumn(null);
                },
            }),
        },
    ];

    const columns: TableProps<any>["columns"] = [
        ...rowHeaderColumn,
        ...mockData.columns.map((col: any) => ({
            ...col,
            onCell: (_: any, rowIndex?: number) => ({
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                    if (rowIndex === undefined) return;
                    const cellAddress = `${col.title}${rowIndex + 1}`;
                    setSelectedCell(cellAddress);
                    setSelectedRow(null);
                    setSelectedColumn(null);
                },
                className:
                    selectedColumn === col.title
                        ? "selected-column"
                        : selectedCell === `${col.title}${rowIndex! + 1}`
                          ? "selected-cell"
                          : "",
            }),
            onHeaderCell: () => ({
                onClick: () => {
                    setSelectedColumn(col.title);
                    setSelectedCell(null);
                    setSelectedRow(null);
                },
                className: selectedColumn === col.title ? "selected-column" : "",
            }),
        })),
    ];
    useEffect(() => {
        if (!editor || !playgroundState) return;

        const newContent = editor.getHTML();
        setPlaygroundState((prev: any) => {
            if (!prev) return null;

            const updatedPlayground = { ...prev, text: newContent };
            updateSavedPlaygrounds(updatedPlayground);
            return updatedPlayground;
        });
    }, [editor?.getHTML()]);

    const handleCollapsePlayground = () => {
        const newPlayground = getOpenSavedPlaygrounds().at(1) || {
            type: null,
            name: "",
            data: null,
            id: null,
            open: false,
        };
        setPlayground(newPlayground);
        const oldPlayground = playgroundState;
        if (oldPlayground) {
            oldPlayground.open = false;
            updateSavedPlaygrounds(oldPlayground);
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

    const handleTipTapTextFormatMenuOnClick = () => {
        setSelectedText(null);
    };

    return (
        <>
      
            <div
                className={`table-playground`}
                onMouseDown={(event) => {
                    if (event.button === 1) {
                        handleCollapsePlayground();
                    }
              
                }}
                onMouseMove={() => {
                    if (playgroundAction) return;
                    playgroundState && setPlayground(playgroundState);
                }}
                ref={divRef}
            >
                <div>
                    <Flex className={"tabs-panel-playground"}>
                        <p>{playgroundState?.name}</p>
                        <HistoryButton id={id} />
                    </Flex>

                    <section className="editor-section">
                        <Table
                            className={"table"}
                            dataSource={mockData.data}
                            columns={columns}
                            pagination={false}
                            bordered
                            rowKey={(record: any, rowIndex: any) => rowIndex!.toString()}
                        />
                        <div className="table-playground-editor tiptap-editor">
                            <EditorContent editor={editor} />
                        </div>
                    </section>
                    {/* <AddChartsAndWidgets /> */}
                </div>
                {playground.id == id && (
                    <div className={`action-buttons ${showButtons && "visible"}`}>
                        {!playgroundAction ? (
                            <>
                                <div className={"action-buttons-left-part"}>
                                    {!playgroundFullscreen && !openHistory && (
                                        <CloudPlusButton type="table" />
                                    )}
                                    {playgroundFullscreen && <FullscreenGeneralLogo unique />}
                                </div>
                                {!openHistory && (
                                    <div className={"action-buttons-right-part"}>
                                        {playgroundFullscreen && <CloudPlusButton type="table" />}
                                        <PenFormatingButton
                                            isActive={selectedText}
                                            onClick={handlePenClick}
                                        />
                                        <ResizePlaygroundButton />
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {playgroundFullscreen && (
                                    <div className={"action-buttons-left-part"}>
                                        <FullscreenGeneralLogo />
                                    </div>
                                )}
                                <div className={"action-buttons-center-part"}>
                                    <PlaygroundAction
                                        playgroundAction={playgroundAction}
                                        editor={editor}
                                        containerWidth={containerWidth}
                                    />
                                </div>
                                {playgroundFullscreen && (
                                    <>
                                        {!openHistory && (
                                            <div className={"action-buttons-right-part"}>
                                                <CloudPlusButton type="table" />
                                                <PenFormatingButton
                                                    isActive={selectedText}
                                                    onClick={handlePenClick}
                                                />
                                                <ResizePlaygroundButton />
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
            {selectedText && editor && (
                <TipTapTextFormatMenu
                    buttonPosition={{
                        top: buttonPosition?.top,
                        left: buttonPosition?.left,
                        bottom: buttonPosition?.bottom,
                        right: buttonPosition?.right,
                    }}
                    isPen={isPen}
                    editor={editor}
                    handleTipTapTextFormatMenuOnClick={handleTipTapTextFormatMenuOnClick}
                />
            )}
        </>
    );
};

export default TablePlayground;
