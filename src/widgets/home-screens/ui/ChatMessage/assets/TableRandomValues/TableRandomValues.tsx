import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import './TableRandomValues.less';
import { useChatStore } from "src/shared/providers";
import { IPlayground } from "src/shared/types/Playground";

function TableRandomValues() {
    const { playground, setPlayground, setSavedPlaygrounds, updateSavedPlaygrounds, getSavedPlaygroundLastByType, getOpenSavedPlaygroundsByType } = useChatStore();
    const openTablePlayground = () => {
        const oldPlayground = getSavedPlaygroundLastByType('table');
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
                className={`table-playground-button ${playground.type == 'table' && 'table-playground-button-active'}`}

        >
            <TableIcon /> Tabular random values
        </button>

    )
}
export default TableRandomValues