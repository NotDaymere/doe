import { Button } from "antd";
import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import { useChatStore } from "src/shared/providers";

function PythonTaskManager() {
    const { playground, setPlayground } = useChatStore();
    const openTablePlayground = () => {
        const newPlayground = playground;
        newPlayground.type = "code";
        newPlayground.open = true;
        setPlayground(newPlayground);
    };
    return (
        <button onClick={openTablePlayground}
                className={`table-playground-button ${playground.type == 'code'&&'table-playground-button-active'}`}
        >
            <TableIcon /> Python Task Manager
        </button>

    )
}
export default PythonTaskManager