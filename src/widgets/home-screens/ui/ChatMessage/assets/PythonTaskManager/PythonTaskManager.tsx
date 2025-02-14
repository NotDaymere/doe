import { Button } from "antd";
import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import { useChatStore } from "src/shared/providers";

function PythonTaskManager({isSelect}: {isSelect?: boolean}) {
    const { playground, setPlayground } = useChatStore();
    const openTablePlayground = () => {
        const newPlayground = playground;
        newPlayground.type = "code";
        newPlayground.open = true;
        setPlayground(newPlayground);
    };
    return (
        <Button onClick={openTablePlayground}
                className={
                    isSelect === undefined ? 'table-playground-button' :
                        (isSelect ? 'table-playground-button-selected' : 'table-playground-button-unselected')
                }
        >
            <TableIcon /> Python Task Manager
        </Button>

    )
}
export default PythonTaskManager