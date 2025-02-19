import { Flex, Table, TableProps } from "antd";
import React, { FC, useEffect, useState } from "react";
import mockData from './mockData.json';
import './index.less';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import Underline from "@tiptap/extension-underline";
import { calculateTiptapButtonPosition } from "src/components/code-playground/helpers/calculateButtonPosition";
import { useChatStore } from "src/shared/providers";
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
import { App } from "../../../../types";

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

  const { playground, getSavedPlayground, setPlayground, playgroundFullscreen, savedPlaygrounds, updateSavedPlaygrounds, getOpenSavedPlaygrounds } = useChatStore();
  const [playgroundState, setPlaygroundState] = useState(getSavedPlayground(id));
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
  const [penNewBottom, setPenNewBottom] = useState<number>(0);
  const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        TextStyle,
        Superscript,
        Subscript,
        Color.configure({
          types: ['textStyle'],
        }),
    ],
    content: playgroundState?.text
        ? playgroundState.text
        :`<p>
        This is what your table looks like when it's in Doe Playground! 
        Larger tables can be navigated, folded in to reveal text, etc.
        Typically, a Playground table will not include both text blocks and graphs 
        as it does here, but it is still possible! 
        The graph interaction with highlighting still applies here!
      </p>`,
    onSelectionUpdate({ editor }) {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ');
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

  useEffect(() => {
    handleSetDataToInput();
  }, [selectedRow, selectedColumn, selectedCell]);

  const handleSetDataToInput = () => {
    if (!editor) return;

    let template = '';
    if (selectedCell) {
      template = `<div>I have a question about <span class="highlighted-span green">Tab ${selectedCell}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    } else if (selectedRow) {
      template = `<div>I have a question about <span class="highlighted-span green">Row ${selectedRow}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    } else if (selectedColumn) {
      template = `<div>I have a question about <span class="highlighted-span green">Column ${selectedColumn}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    }
    if (template) {
      editor.commands.setContent(template);
    }
  };

  const rowHeaderColumn: TableProps<any>['columns'] = [{
    title: "",
    dataIndex: 'rowHeader',
    width: '36px',
    render: (_: any, __: any, rowIndex: number) => `${rowIndex + 1}`,
    onCell: (_: any, rowIndex?: number) => ({
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (rowIndex === undefined) return;
        setSelectedRow(rowIndex + 1);
        setSelectedCell(null);
        setSelectedColumn(null);
      }
    }),
  }];

  const columns: TableProps<any>['columns'] = [
    ...rowHeaderColumn,
    ...mockData.columns.map((col) => ({
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
        className: selectedColumn === col.title
            ? 'selected-column'
            : selectedCell === `${col.title}${rowIndex! + 1}`
                ? 'selected-cell'
                : '',
      }),
      onHeaderCell: () => ({
        onClick: () => {
          setSelectedColumn(col.title);
          setSelectedCell(null);
          setSelectedRow(null);
        },
        className: selectedColumn === col.title ? 'selected-column' : '',
      })
    }))
  ];

  useEffect(() => {
    if (!editor || !playgroundState) return;

    const newContent = editor.getHTML();
    setPlaygroundState((prev) => {
      if (!prev) return null;

      const updatedPlayground = { ...prev, text: newContent };
      updateSavedPlaygrounds(updatedPlayground);
      return updatedPlayground;
    });
  }, [editor?.getHTML()]);

  const handleCollapsePlayground = () => {
    const newPlayground = getOpenSavedPlaygrounds().at(1) || { type: null, data: null, id: null, open: false };
    setPlayground(newPlayground);
    const oldPlayground = playgroundState;
    if (oldPlayground) {
      oldPlayground.open = false;
      updateSavedPlaygrounds(oldPlayground);
    }
  };

  const handlePenClick = () => {
    if (selectedText) {
      setSelectedText(null);
      setButtonPosition(null);
      setIsPen(false);
    } else {
      setSelectedText(selectedText ? selectedText : "Pen");
      setIsPen(true);
      console.log(penNewBottom);
      setButtonPosition({
        bottom: 111,
        right: 14,
      });
    }
  };

  const handleTipTapTextFormatMenuOnClick = () => {
    setSelectedText(null);
  };

  return (
      <div className={`table-playground`}
           onMouseDown={(event) => {
             if (event.button === 1) {
               handleCollapsePlayground();
             }
           }}
           onMouseMove={() => {
             playgroundState && setPlayground(playgroundState)
           }}
      >

        <div>
          <Flex className={"tabs-panel-playground"}>
            <p>Tabular Random Values</p>
            <HistoryButton />
          </Flex>

          <section className="editor-section">
            <Table
                className={"table"}
                dataSource={mockData.data}
                columns={columns}
                pagination={false}
                bordered
                rowKey={(record, rowIndex) => rowIndex!.toString()}
            />
            <div className="table-playground-editor tiptap-editor">
              <EditorContent editor={editor} />
            </div>
          </section>


          {selectedText && editor && (
              <TipTapTextFormatMenu
                  buttonPosition={{
                    top: (buttonPosition?.top && (buttonPosition.top + penNewBottom)),
                    left: buttonPosition?.left,
                    bottom: (buttonPosition?.bottom && (buttonPosition.bottom + penNewBottom)),
                    right: buttonPosition?.right,
                  }}
                  isPen={isPen}
                  editor={editor}
                  handleTipTapTextFormatMenuOnClick={handleTipTapTextFormatMenuOnClick}
              />
          )}
        </div>
        {
            playground.id == id &&
            <div className={"action-buttons"}>
              {!playgroundFullscreen && <CloudPlusButton />}
              {playgroundFullscreen && <FullscreenGeneralLogo />}
              <div className={"action-buttons-right-part"}>
                {playgroundFullscreen && <CloudPlusButton />}
                <PenFormatingButton isActive={selectedText} onClick={handlePenClick} />
                <ResizePlaygroundButton />
              </div>
            </div>
        }
      </div>
  );
};

export default TablePlayground;
