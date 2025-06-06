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
    const openCodePlayground = () => {
        closeNoPlayground();
        let oldPlayground = getSavedPlaygroundLastByType("code");
        if (getOpenSavedPlaygrounds().length >= 2) {
            const lastPlayground = getOpenSavedPlaygrounds().at(-1) || oldPlayground;
            if (lastPlayground && lastPlayground.type != "code") {
                lastPlayground.open = false;
                updateSavedPlaygrounds(lastPlayground);
            }
        }
        if (oldPlayground == null) {
            const newPlayground: IPlayground = {
                id: null,
                name: "Python Task Manager",
                type: "code",
                data: null,
                open: false,
            };
            newPlayground.open = true;
            setSavedPlaygrounds(newPlayground);
            setPlayground(newPlayground);
            return;
        }
        if (getOpenSavedPlaygroundsByType("code").length > 0) {
            oldPlayground.open = false;
            updateSavedPlaygrounds(oldPlayground);
            const newPlayground: IPlayground = {
                id: null,
                name: "Python Task Manager",
                type: "code",
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
    return (
        <button
            onClick={openCodePlayground}
            className={`${css["table-playground-button"]} ${getOpenSavedPlaygroundsByType("code").length > 0 && css["table-playground-button-active"]}`}
        >
            <CodeIcon /> Python Task Manager
        </button>
    );
}
export default PythonTaskManager;