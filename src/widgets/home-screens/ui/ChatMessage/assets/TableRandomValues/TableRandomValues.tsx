import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import './TableRandomValues.less';
import { useChatStore } from "src/shared/providers";
import { IPlayground } from "src/shared/types/Playground";

function TableRandomValues() {
    const { playground, setPlayground, setSavedPlaygrounds, updateSavedPlaygrounds, getSavedPlaygroundLast } = useChatStore();
    const openTablePlayground = () => {
        const oldPlayground = playground;
        oldPlayground.open = false;
        updateSavedPlaygrounds(oldPlayground);
        const newPlayground: IPlayground = {
            id: null,
            type: "table",
            data: null,
            open: true
        };
        setSavedPlaygrounds(newPlayground);
        setPlayground(getSavedPlaygroundLast() ?? newPlayground);
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