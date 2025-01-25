import { Button, Table, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import mockData from './mockData.json';
import { useApp } from "../app";
import './index.less';
import { SvgIcon } from "../icon";
import { useEditorContext } from "src/contexts/EditorProvider";

const TablePlayground: FC = () => {
  const { setPlayground } = useApp().app;
  const { editor } = useEditorContext()
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

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

  return (
    <div className={'table-playground'}>
      <Table
        className={'table'}
        dataSource={mockData.data}
        columns={columns}
        pagination={false}
        bordered
        rowKey={(record, rowIndex) => rowIndex!.toString()}
      />

      <div className={'action-buttons'}>
        <Button type={'text'} onClick={handleCollapsePlayground}>
          <SvgIcon type={'collapse'} />
        </Button>

        <Button type={'text'} onClick={downloadCSV}>
          <SvgIcon type={'download'} />
        </Button>
      </div>
    </div>
  );
};

export default TablePlayground;
