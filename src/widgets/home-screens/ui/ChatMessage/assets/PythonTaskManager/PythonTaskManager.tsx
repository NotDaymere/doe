import React from "react";
import { ReactComponent as CodeIcon } from "src/assets/icons/code.svg";
import { useChatStore } from "src/shared/providers";
import { IPlayground } from "../../../../../../shared/types/Playground";

function PythonTaskManager() {
    const { playground, setPlayground, setSavedPlaygrounds, updateSavedPlaygrounds, getSavedPlaygroundLast } = useChatStore();
    const openCodePlayground = () => {
        const oldPlayground = playground;
        oldPlayground.open = false;
        updateSavedPlaygrounds(oldPlayground);
        const newPlayground: IPlayground = {
            id: null,
            type: "code",
            data: null,
            open: true
        };
        setSavedPlaygrounds(newPlayground);
        setPlayground(getSavedPlaygroundLast() ?? newPlayground);
    };
    return (
        <button onClick={openCodePlayground}
                className={`table-playground-button ${playground.type == 'code' && 'table-playground-button-active'}`}
        >
            <CodeIcon /> Python Task Manager
        </button>

    )
}
export default PythonTaskManager