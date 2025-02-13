import { Button } from "antd";
import React from "react";
import { ReactComponent as CodeIcon } from "src/assets/icons/code.svg";
import { useApp } from "../../../../../../components/app";
import('./PythonTaskManager.less');

function PythonTaskManager() {
    const { setPlayground } = useApp().app;
    const openCodePlayground = () => {
        setPlayground((prev) => ({
            ...prev,
            type: "code",
            open: true,
        }));
    };
    return (
        <Button onClick={openCodePlayground} className={'python-task-manager-button'}>
            <CodeIcon /> Python Task Manager
        </Button>
    )
}
export default PythonTaskManager
