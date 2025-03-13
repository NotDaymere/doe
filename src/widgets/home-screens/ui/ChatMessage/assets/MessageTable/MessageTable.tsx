import React, { FC, useState } from "react";
import { Table, TableProps } from "antd";
import { useChatStore } from "../../../../../../shared/providers";
import { IPlayground } from "../../../../../../shared/types/Playground";
import "./MessageTable.less";
import DownloadTableIcon from "../../../../../../shared/icons/DownloadTable.icon";
import ExpandTableIcon from "../../../../../../shared/icons/ExpandTable.icon";
import {TableSelectedAreaType} from "../../../../lib/enums/TableSelectedAreaTypeEnum";
import css from "../../ChatMessage.module.less";
import { CSSTransition } from "react-transition-group";
import {useClickOut} from "../../../../../../shared/hooks/useClickOut";
import * as XLSX from 'xlsx';

interface TableColumn {
    title: string;
    dataIndex: string;
}

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
        getOpenSavedPlaygroundsByType,
        setIsTablePromptVisible,
        setSelectedArea,
    } = useChatStore();

    const [activeMenu, setActiveMenu] = React.useState(false);
    const downloadMenuRef = React.useRef<HTMLDivElement>(null);
    const downloadRef = useClickOut({
        handler: () => setActiveMenu(false),
    });

    const toggleMenu = () => setActiveMenu(!activeMenu);

    const setCloseHandler = (fn?: () => void) => {
        return () => {
            fn?.();
            setActiveMenu(false);
        };
    };

    const rowHeaderColumn: TableProps<any>["columns"] = [
        {
            title: "",
            dataIndex: "rowHeader",
            width: "30px",
            render: (_: any, __: any, rowIndex: number) => `${rowIndex + 1}`,
            onCell: (_: any, rowIndex?: number) => ({
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                    if (rowIndex === undefined) return;
                    setSelectedRow(rowIndex + 1);
                    setSelectedCell(null);
                    setSelectedColumn(null);
                    setIsTablePromptVisible(true);
                    setSelectedArea({ type: TableSelectedAreaType.Row, value: rowIndex + 1 });
                },
            }),
            className: "custom-row-header",
            onHeaderCell: () => ({
                className: "custom-row-header",
            }),
        },
    ];

    const columns: TableProps<any>["columns"] = [
        ...rowHeaderColumn,
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
                    setIsTablePromptVisible(true);
                    setSelectedArea({ type: TableSelectedAreaType.Tab, value: cellAddress });
                },
                className:
                    selectedColumn === col.title
                        ? "selected-column"
                        : selectedCell === `${col.title}${(rowIndex || 0) + 1}`
                            ? "message_table_selected-cell"
                            : "",
            }),
            onHeaderCell: () => ({
                onClick: () => {
                    setSelectedColumn(col.title);
                    setSelectedCell(null);
                    setSelectedRow(null);
                    setIsTablePromptVisible(true);
                    setSelectedArea({ type: TableSelectedAreaType.Column, value: col.title });
                },
                className: `custom-header-cell ${
                    selectedColumn === col.title ? "selected-column" : ""
                }`,
            }),
        })),
    ];

    const rowClassName = (_: any, rowIndex: number) => {
        return selectedRow === rowIndex + 1 ? "selected-row" : "";
    };

    const openTablePlayground = () => {
        const oldPlayground = getSavedPlaygroundLastByType("table");
        if (getOpenSavedPlaygrounds().length >= 2) {
            const lastPlayground = getOpenSavedPlaygrounds().at(-1) || oldPlayground;
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
        if (getOpenSavedPlaygroundsByType("table").length > 0) {
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
        const headers = tableData.columns.map((col) => col.title).join(",");
        csvRows.push(headers);
        tableData.data.forEach((row) => {
            const values = tableData.columns.map((col) => row[col.dataIndex]);
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

    const downloadTXT = () => {
        const txtRows: string[] = [];
        const headers = tableData.columns.map((col) => col.title).join("\t");
        txtRows.push(headers);
        tableData.data.forEach((row) => {
            const values = tableData.columns.map((col) => row[col.dataIndex]);
            txtRows.push(values.join("\t"));
        });
        const txtString = txtRows.join("\n");
        const blob = new Blob([txtString], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "table_data.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadXLSX = () => {
        const wsData = [
            tableData.columns.map((col) => col.title),
            ...tableData.data.map((row) =>
                tableData.columns.map((col) => row[col.dataIndex])
            ),
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "table_data.xlsx");
    };

    return (
        <div className="message-table-container">
            <div className="message-table">
                <div className="message-table-header">
                    <span>Table example</span>
                        <div className="message-action-buttons">
                                <button
                                    className={`message-action-button ${activeMenu ? css.active : ""}`}
                                    onClick={toggleMenu}>
                                    <DownloadTableIcon />
                                </button>
                                <CSSTransition
                                    timeout={150}
                                    in={activeMenu}
                                    downloadMenuRef={downloadMenuRef}
                                    mountOnEnter
                                    unmountOnExit
                                    classNames={{
                                        enter: "fadeEnter",
                                        enterActive: "fadeEnterActive",
                                        exit: "fadeExit",
                                        exitActive: "fadeExitActive",
                                    }}
                                >
                                    <div className="table_download_menu" ref={downloadMenuRef}>
                                        <ul className="table_download_menu_list">
                                            <li
                                                onClick={setCloseHandler(downloadCSV)}
                                                className="table_download_menu_list_item"
                                            >
                                                .csv
                                            </li>
                                            <li
                                                onClick={setCloseHandler(downloadTXT)}
                                                className="table_download_menu_list_item"
                                            >
                                                .txt
                                            </li>
                                            <li
                                                onClick={setCloseHandler(downloadXLSX)}
                                                className="table_download_menu_list_item"
                                            >
                                                .xlsx
                                            </li>
                                        </ul>
                                    </div>
                                </CSSTransition>
                            <button className="message-action-expand-button" onClick={openTablePlayground}>
                                <ExpandTableIcon />
                            </button>
                        </div>
                    </div>
                <Table
                    dataSource={tableData.data}
                    columns={columns}
                    pagination={false}
                    bordered
                    rowKey={(_, rowIndex) => rowIndex!.toString()}
                    rowClassName={rowClassName}
                />
            </div>
        </div>
    );
};

export default MessageTable;
