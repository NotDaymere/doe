
import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import './TableRandomValues.less';
import { useChatStore } from "src/shared/providers";

function TableRandomValues() {
    const { playground, setPlayground } = useChatStore();
    const openTablePlayground = () => {
        const newPlayground = playground;
        newPlayground.type = "table";
        newPlayground.open = true;
        setPlayground(newPlayground);
    };
    return (
        <button onClick={openTablePlayground}
                className={`table-playground-button ${playground.type == 'table'&&'table-playground-button-active'}`}

        >
            <TableIcon /> Table Random Values
        </button>

    )
}
export default TableRandomValues