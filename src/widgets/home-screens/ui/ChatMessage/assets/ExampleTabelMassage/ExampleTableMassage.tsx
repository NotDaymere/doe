import ExampleCode from "./assets/ExampleCode/ExampleCode";
import { Flex } from "antd";
import TableRandomValues from "../TableRandomValues/TableRandomValues";
import DownloadCSV from "../DownloadCSV/DownloadCSV";
import React from "react";
import './ExampleTableMassage.less';
import GeneralLogo2 from "../../../../../../shared/icons/GeneralLogo2";
function ExampleTableMassage() {
    return (
        <div className={"example-table-massage-container"}>
            <div className={"example-table-massage-logo"}>

                <GeneralLogo2 />
            </div>
            <div className={"example-table-massage"}>
                <text className={"message-text"}>
                    Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number:
                </text>
                <ExampleCode />
                <text className={'message-text'}>Now Ill show the output in the table:</text>
                <Flex justify={"flex-start"} className={"message-actions"}>
                    <TableRandomValues />
                    <DownloadCSV />
                </Flex>
            </div>
        </div>
    )
}
export default ExampleTableMassage