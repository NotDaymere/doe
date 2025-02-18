
import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import './TableRandomValues.less';
import { useChatStore } from "src/shared/providers";

function TableRandomValues() {
    const { playground, setPlayground, savedPlaygrounds, setSavedPlaygrounds } = useChatStore();
    const openTablePlayground = () => {
        const newPlayground = playground;
        newPlayground.type = "table";
        newPlayground.open = true;
        setSavedPlaygrounds(newPlayground);
        setPlayground(savedPlaygrounds.at(-1) ?? newPlayground);
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