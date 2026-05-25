import React from "react";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import css from "./TableRandomValues.module.less";
import { useChatStore } from "src/shared/providers";
import { IPlayground } from "src/shared/types/Playground";

function TableRandomValues() {
    const {
        playground,
        setPlayground,
        setSavedPlaygrounds,
        updateSavedPlaygrounds,
        getOpenSavedPlaygrounds,
        getSavedPlaygroundLastByType,
        getOpenSavedPlaygroundsByType,
        closeNoPlayground,
    } = useChatStore();
    const toggleTablePlayground = () => {
        const openPlaygrounds = getOpenSavedPlaygroundsByType("table");

        // Якщо вже відкритий — закриваємо
        if (openPlaygrounds.length > 0) {
            const tablePlayground = openPlaygrounds[0];
            tablePlayground.open = false;
            updateSavedPlaygrounds(tablePlayground);
            closeNoPlayground();
            return;
        }

        // Інакше — відкриваємо
        closeNoPlayground();
        const oldPlayground = getSavedPlaygroundLastByType("table");

        if (!oldPlayground) {
            const newPlayground: IPlayground = {
                id: null,
                name: "Tabular random values",
                type: "table",
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
            onClick={toggleTablePlayground}
            className={`${css["table-playground-button"]} ${getOpenSavedPlaygroundsByType("table").length > 0 && css["table-playground-button-active"]}`}
        >
            <TableIcon /> Tabular Random Values
        </button>
    );
}
export default TableRandomValues;
