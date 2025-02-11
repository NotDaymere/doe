import { Button, Table, TableProps } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import mockData from './mockData.json';
import { useApp } from "../app";
import './index.less';
import { SvgIcon } from "../icon";
import { useEditorContext } from "src/contexts/EditorProvider";
import Pen from "./assets/Pen/Pen";
import DecreasePlayground from "./assets/DecreasePlayground/DecreasePlayground";
import CloudPlus from "./assets/CloudPlus/CloudPlus";
import TextFormat from "./assets/TextFormat/TextFormat";
import * as monaco from "monaco-editor";
import { calculateButtonPosition } from "../code-playground/helpers/calculateButtonPosition";
import Editor, { OnMount } from "@monaco-editor/react";

const TablePlayground: FC = () => {
  const { setPlayground } = useApp().app;
  const { editor } = useEditorContext()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{ top?: number; left?: number; bottom?: number; right?: number} | null>(null);

  const customTheme: monaco.editor.IStandaloneThemeData = {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'string', foreground: 'A5201E' },
      { token: 'keyword', foreground: '0000FF' },
      { token: 'identifier', foreground: '0171C1' },
      { token: 'variable', foreground: '0171C1' },
      { token: 'delimiter', foreground: '3D3F46' },
      { token: 'function', foreground: '0000FF' },

    ],
    colors: {
      'editor.background': '#FAFAF9',
      'editor.lineHighlightBackground': '#FAFAF9',
      'editor.selectionBackground': '#c1d3ff',
    }
  };
  useEffect(() => {
    handleSetDataToInput();
  }, [selectedRow, selectedColumn, selectedCell]);

  const handleSetDataToInput = () => {
    if (!editor) {
      return;
    }

    let template = '';

    if (selectedCell) {
      template = `<div>I have a question about <span class="highlighted-span green">Tab ${selectedCell}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    } else if (selectedRow) {
      template = `<div>I have a question about <span class="highlighted-span green">Row ${selectedRow}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    } else if (selectedColumn) {
      template = `<div>I have a question about <span class="highlighted-span green">Column ${selectedColumn}</span> in the graph: <span class="custom-tag green" data-deletable="true">question</span></div>`;
    }

    if (template) {
      editor.chain().clearContent().insertContent(template).run();
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
        if (rowIndex === undefined) {
          return;
        }

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
          if (rowIndex === undefined) {
            return;
          }
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

  const handleCollapsePlayground = () => (
    setPlayground({ type: null, data: null, id: null, open: false })
  )

  const downloadCSV = () => {
    const csvRows = [];
    const headers = mockData.columns.map(col => col.title).join(',');
    csvRows.push(headers);

    mockData.data.forEach(row => {
      const values = mockData.columns.map(col => row[col.dataIndex as keyof typeof row]);
      csvRows.push(values.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    monaco.editor.defineTheme('myCustomTheme', customTheme);
    monaco.editor.setTheme('myCustomTheme');
    editor.onMouseUp(() => {
      handleEditorMouseUp(editor);
    });

    editor.onKeyUp(() => {
      handleEditorMouseUp(editor);
    });
  };
  const handleEditorMouseUp = (editor: monaco.editor.IStandaloneCodeEditor) => {
    updateSelectedText(editor);
    const position = calculateButtonPosition(editor);
    if (position) {
      setButtonPosition(position);
    }
  };
  const updateSelectedText = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const selection = editor.getSelection();
    if (selection) {
      const model = editor.getModel();
      if (!model) return;

      const selectedText = model.getValueInRange(selection);
      console.log(selectedText);
      setSelectedText(selectedText);
    }
  };
const handlePenClick = () => {
  if (selectedText) {
    setSelectedText(null)
    setButtonPosition(null)
  } else {
    setSelectedText("Pen");
    setButtonPosition({
      bottom: 137,
      right: 45,
    });
  }
}
  return (
    <div className={'table-playground'} style={{ position: 'relative', height: '100%' }}>
      <Table
        className={'table'}
        dataSource={mockData.data}
        columns={columns}
        pagination={false}
        bordered
        rowKey={(record, rowIndex) => rowIndex!.toString()}
      />
      <Editor
          onMount={handleEditorMount}
          theme="light"
          language="plaintext"
          height="100%"
          options={{
            tabSize: 2,
            insertSpaces: true,
            minimap: { enabled: false },
          }}
          defaultValue={`
This is what your table looks like when it's in Doe Playground! 
Larger tables can be navigated, folded in to reveal text, etc.
Typically, a Playground table will not include both text blocks and graphs 
as it does here, but it is still possible! 
The graph interaction with highlighting still applies here!
      `}
      />

      <div className={'action-buttons'}>

        <DecreasePlayground onClick={handleCollapsePlayground} />
        <CloudPlus />
        <Button type={'text'}
                onClick={downloadCSV}
        >
          <SvgIcon type={'download'} />
        </Button>
        <Pen isActive = {selectedText} onClick={handlePenClick}/>
      </div>

      {selectedText &&
          <TextFormat buttonPosition={{
              top: buttonPosition?.top,
              left: buttonPosition?.left,
              bottom: buttonPosition?.bottom,
              right: buttonPosition?.right
            }}
      />
      }
    </div>
  );
};

export default TablePlayground;

