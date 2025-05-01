import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import './TableRandomValues.less';
import { useChatStore } from "src/shared/providers";
import { IPlayground } from "src/shared/types/Playground";

function TableRandomValues() {
    const {
        setPlayground,
        setSavedPlaygrounds,
        updateSavedPlaygrounds, getOpenSavedPlaygrounds,
        getSavedPlaygroundLastByType, getOpenSavedPlaygroundsByType, closeNoPlayground,
    } = useChatStore();
    const openTablePlayground = () => {
        closeNoPlayground();
        const oldPlayground = getSavedPlaygroundLastByType('table');
        if (getOpenSavedPlaygrounds().length >= 2) {
            const lastPlayground = getOpenSavedPlaygrounds().at(-1) || oldPlayground;
            console.log(lastPlayground);
            if (lastPlayground && lastPlayground.type != 'table') {
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
    return (
        <button onClick={openTablePlayground}
                className={`table-playground-button ${getOpenSavedPlaygroundsByType('table').length > 0 && 'table-playground-button-active'}`}
        >
            <TableIcon /> Tabular Random Values
        </button>

    )
}
export default TableRandomValues