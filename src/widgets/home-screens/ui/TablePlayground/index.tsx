import { Flex, Table, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import mockData from './mockData.json';
import './index.less';
import { EditorContent, isActive, useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import Underline from "@tiptap/extension-underline";
import { calculateTiptapButtonPosition } from "../../../../components/code-playground/helpers/calculateButtonPosition";
import { useChatStore } from "../../../../shared/providers";
import TipTapTextFormatMenu from "./assets/TextFormat/TipTapTextFormatMenu";
import ResizePlaygroundButton from "../PlaygroundButtons/ResizePlaygroundButton/ResizePlaygroundButton";
import CloudPlusButton from "../PlaygroundButtons/CloudPlusButton/CloudPlusButton";
import PenFormatingButton from "../PlaygroundButtons/PenFormatingButton/PenFormatingButton";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import GeneralLogo2 from "../../../../shared/icons/GeneralLogo2";

const TablePlayground: FC = () => {
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

  const { setPlayground } = useChatStore();
  const {playgroundFullscreen} = useChatStore();
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
        Color.configure({
          types: ['textStyle'],
        }),
    ],
    content: `
      <p>
        This is what your table looks like when it's in Doe Playground! 
        Larger tables can be navigated, folded in to reveal text, etc.
        Typically, a Playground table will not include both text blocks and graphs 
        as it does here, but it is still possible! 
        The graph interaction with highlighting still applies here!
      </p>
    `,
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

  const handleCollapsePlayground = () => {
    setPlayground({ type: null, data: null, id: null, open: false });
  };

  const handlePenClick = () => {
    if (selectedText) {
      setSelectedText(null);
      setButtonPosition(null);
      setIsPen(false);
    } else {
      setSelectedText("Pen");
      setIsPen(true);
      setButtonPosition({
        bottom: 137,
        right: 45,
      });
    }
  };

  return (
      <div className={"table-playground"}>
        <Flex className={"tabs-panel-playground"}>
          Table Random Values
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

        <div className={"action-buttons"}>
          {!playgroundFullscreen && <CloudPlusButton />}
          {playgroundFullscreen && <GeneralLogo2 className={'general-logo2-button'}/>}
          <div className={"action-buttons-right-part"}>
            {playgroundFullscreen && <CloudPlusButton />}
            <PenFormatingButton isActive={selectedText} onClick={handlePenClick} />
            <ResizePlaygroundButton />
          </div>
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
            />
        )}
      </div>
  );
};

export default TablePlayground;
