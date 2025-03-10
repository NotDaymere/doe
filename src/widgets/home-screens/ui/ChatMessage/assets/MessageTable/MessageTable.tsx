import { FC, useEffect, useState } from "react";
import { Table, TableProps } from "antd";
import { mockTableData } from "./mockData";
import { useChatStore } from "../../../../../../shared/providers";
import { IPlayground } from "../../../../../../shared/types/Playground";
import "./MessageTable.less";

interface TableColumn {
    title: string;
    dataIndex: string;
}

const MessageTable: FC = () => {
interface TableData {
    columns: TableColumn[];
    data: Record<string, any>[];
}

interface MessageTableProps {
    tableData: TableData;
}

const MessageTable: FC<MessageTableProps> = ({ tableData }) => {
    const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedCell, setSelectedCell] = useState<string | null>(null);
    const {
        editor,
        setPlayground,
        getSavedPlaygroundLastByType,
        getOpenSavedPlaygrounds,
        updateSavedPlaygrounds,
        setSavedPlaygrounds,
        getOpenSavedPlaygroundsByType
    } = useChatStore();

    useEffect(() => {
        handleSetDataToInput();
    }, [selectedRow, selectedColumn, selectedCell]);

    const handleSetDataToInput = () => {
        if (!editor) return;

        let template = "";

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

    const rowHeaderColumn: TableProps<any>['columns'] = [
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
        ...mockTableData.columns.map((col) => ({
        ...tableData.columns.map((col) => ({
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
                        : selectedCell === `${col.title}${(rowIndex || 0) + 1}`
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

    const openTablePlayground = () => {
        const oldPlayground = getSavedPlaygroundLastByType('table');
        if (getOpenSavedPlaygrounds().length >= 2) {
            const lastPlayground = getOpenSavedPlaygrounds().at(-1) || oldPlayground;
            console.log(lastPlayground);
            if (lastPlayground && lastPlayground.type !== "table") {
                lastPlayground.open = false;
                updateSavedPlaygrounds(lastPlayground);
            }
        }
        if (oldPlayground == null) {
            const newPlayground: IPlayground = {
                id: null,
                name: "Tabular random values",
                type: "table",
                data: null,
                open: false,
            };
            newPlayground.open = true;
            setSavedPlaygrounds(newPlayground);
            setPlayground(newPlayground);
            return;
        }
        if ((getOpenSavedPlaygroundsByType('table').length > 0) ) {
            oldPlayground.open = false;
            updateSavedPlaygrounds(oldPlayground);
            const newPlayground: IPlayground = {
                id: null,
                name: "Tabular random values",
                type: "table",
                data: null,
                open: false,
            };
            newPlayground.open = true;
            setSavedPlaygrounds(newPlayground);
            setPlayground(newPlayground);
            return;
        } else {
            oldPlayground.open = true;
            updateSavedPlaygrounds(oldPlayground);
        }
    };

    const downloadCSV = () => {
        const csvRows: string[] = [];
        const headers = mockTableData.columns.map((col) => col.title).join(",");
        csvRows.push(headers);
        tableData.data.forEach((row) => {
            const values = tableData.columns.map((col) => row[col.dataIndex]);

        mockTableData.data.forEach((row) => {
            const values = mockTableData.columns.map(
                (col) => row[col.dataIndex as keyof typeof row]
            );
            csvRows.push(values.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "table_data.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="message-table">
            <div className="message-table-header">
                <span>Table example</span>
                <div className="message-action-buttons">
                    <button className="message-action-button" onClick={downloadCSV}>
                        <span>DOWNLOAD</span>
                    </button>
                    <button className="message-action-button" onClick={openTablePlayground}>
                        <span>EXPAND</span>
                    </button>
                </div>
            </div>
            <Table
                dataSource={mockTableData.data}
                columns={columns}
                pagination={false}
                bordered
                rowKey={(record, rowIndex) => rowIndex!.toString()}
            />
        </div>
    );
};

export default MessageTable;
