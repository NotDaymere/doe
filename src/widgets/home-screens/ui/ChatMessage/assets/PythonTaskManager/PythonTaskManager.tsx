import React from "react";
import { ReactComponent as CodeIcon } from "src/assets/icons/code.svg";
import { useChatStore } from "src/shared/providers";
import { IPlayground } from "src/shared/types/Playground";
import css from "./PythonTaskManager.module.less";

function PythonTaskManager() {
    const {
        playground,
        setPlayground,
        setSavedPlaygrounds,
        updateSavedPlaygrounds,
        getSavedPlaygroundLastByType,
        getOpenSavedPlaygroundsByType,
        getOpenSavedPlaygrounds,
        closeNoPlayground,
    } = useChatStore();
    const toggleCodePlayground = () => {
        const openPlaygrounds = getOpenSavedPlaygroundsByType("code");

        if (openPlaygrounds.length > 0) {
            const codePlayground = openPlaygrounds[0];
            codePlayground.open = false;
            updateSavedPlaygrounds(codePlayground);
            closeNoPlayground();
            return;
        }

        closeNoPlayground();
        let oldPlayground = getSavedPlaygroundLastByType("code");

        if (!oldPlayground) {
            const newPlayground: IPlayground = {
                id: null,
                name: "Python Task Manager",
                type: "code",
                data: null,
                open: true,
            };
            setSavedPlaygrounds(newPlayground);
            setPlayground(newPlayground);
            return;
        }

        oldPlayground.open = true;
        updateSavedPlaygrounds(oldPlayground);
        setPlayground(oldPlayground);
    };

    return (
        <button
            onClick={toggleCodePlayground}
            className={`${css["table-playground-button"]} ${getOpenSavedPlaygroundsByType("code").length > 0 && css["table-playground-button-active"]}`}
        >
            <CodeIcon /> Python Task Manager
        </button>
    );
}
export default PythonTaskManager;