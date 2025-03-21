import React from "react";
import { useChatStore } from "../../../../shared/providers";
import css from "./SideBarMenu.module.less"
import CorporaIcon from "../../../../shared/icons/CorporaIcon";
import IndividualChatsIcon from "../../../../shared/icons/IndividualChatsIcon";
import FavoriteIcon from "../../../../shared/icons/Favorite.icon";
import TagsIcon from "../../../../shared/icons/TagsIcon";

export const SideBarMenu = () => {
    const { isSideBarOpen } = useChatStore();
    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = React.useState(true);

    const handleOpenSideBarMenu = () => {
        setIsSideBarMenuOpen(!isSideBarMenuOpen);
    }
    return (
        <div className={isSideBarOpen ? css.sidebar_open_menu : css.sidebar_menu}>
            <div className={css.menu_actions_section_name}>
                <div>Menu</div>
                <div
                    className={css.show_actions_btn}
                    onClick={handleOpenSideBarMenu}>
                    {!isSideBarMenuOpen ? "+" : "-"}
                </div>
            </div>

            {isSideBarMenuOpen && (
                <div className={css.menu_actions_section_container}>

                    <div className={css.sidebar_menu_action_container}>
                        <div className={css.sidebar_menu_action_btn}>
                            <CorporaIcon fill="currentColor"/>
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Corpora</div>
                            <div className={css.show_more_btn}>+</div>
                        </div>
                    </div>

                    <div className={css.sidebar_menu_action_container}>
                        <div className={css.sidebar_menu_action_btn}>
                            <IndividualChatsIcon fill="currentColor"/>
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Individual Chats</div>
                            <div className={css.show_more_btn}>+</div>
                        </div>
                    </div>

                    <div className={css.sidebar_menu_action_container}>
                        <div className={css.sidebar_menu_action_btn}>
                            <FavoriteIcon fill="currentColor"/>
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Favourites</div>
                            <div className={css.show_more_btn}>+</div>
                        </div>
                    </div>

                    <div className={css.sidebar_menu_action_container}>
                        <div className={css.sidebar_menu_action_btn}>
                            <TagsIcon fill="currentColor"/>
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Tags</div>
                            <div className={css.show_more_btn}>+</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};