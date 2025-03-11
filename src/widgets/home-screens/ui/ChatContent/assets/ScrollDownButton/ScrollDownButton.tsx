import React from "react";
import css from "./ScrollDownButton.module.less";
import ArrowDownChatScrollIcon from "../../../../../../shared/icons/ArrowDownChatScroll.icon";


interface ScrollDownButtonProps {
    onClick: () => void;
}

export const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ onClick }) => (
    <button className={css.scroll_down_btn} onClick={onClick}>
        <ArrowDownChatScrollIcon />
    </button>
);
