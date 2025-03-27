import React from "react";
import css from "./Corpora.module.less";
import CorporaIcon from "../../../../../shared/icons/CorporaIcon";

interface CorporaProps {
    isSideBarOpen: boolean;
    isSideBarMenuOpen: boolean;
}

export const Corpora = ({ isSideBarOpen, isSideBarMenuOpen }: CorporaProps) => {
    const [isCorporaOpen, setIsCorporaOpen] = React.useState(false);
    const handleOpenCorpora = () => {
        setIsCorporaOpen(!isCorporaOpen);
    };

    return isSideBarMenuOpen && (
        <div
            className={!isSideBarOpen
                ? css.sidebar_menu_action_container
                : css.open_sidebar_menu_action_container}
            data-active={isCorporaOpen}
            onClick={handleOpenCorpora}
        >
            <div className={css.sidebar_menu_action_btn}>
                <CorporaIcon fill="currentColor" />
            </div>
            <div className={css.sidebar_menu_action_btn_tooltip}>
                <div>Corpora</div>
                <div className={css.show_more_btn} >
                    {!isCorporaOpen ? "+" : "-"}
                </div>
            </div>
        </div>
    )
}