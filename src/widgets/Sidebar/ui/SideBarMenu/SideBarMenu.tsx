import React from "react";
import { useChatStore } from "../../../../shared/providers";
import css from "./SideBarMenu.module.less"
import CorporaIcon from "../../../../shared/icons/CorporaIcon";
import IndividualChatsIcon from "../../../../shared/icons/IndividualChatsIcon";
import FavoriteIcon from "../../../../shared/icons/Favorite.icon";
import TagsIcon from "../../../../shared/icons/TagsIcon";
import SearchIcon from "../../../../shared/icons/SearchIcon";
import CloseIcon from "../../../../shared/icons/CloseIcon";

export const SideBarMenu = () => {
    const { isSideBarOpen } = useChatStore();

    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = React.useState(true);
    const [isCorporaOpen, setIsCorporaOpen] = React.useState(false);
    const [isIndividualChatOpen, setIsIndividualChatOpen] = React.useState(false);
    const [isFavouritesOpen, setIsFavouritesOpen] = React.useState(false);
    const [isTagsOpen, setIsTagsOpen] = React.useState(false);

    const [isSearchInputOpen, setIsSearchInputOpen] = React.useState(false);

    const handleOpenSideBarMenu = () => {
        setIsSideBarMenuOpen(!isSideBarMenuOpen);
    };

    const handleOpenCorpora = () => {
        setIsCorporaOpen(!isCorporaOpen);
    };
    const handleOpenIndividualChat = () => {
        setIsIndividualChatOpen(!isIndividualChatOpen);
    };
    const handleOpenFavourites = () => {
        setIsFavouritesOpen(!isFavouritesOpen);
    };
    const handleOpenTags = () => {
        setIsTagsOpen(!isTagsOpen);
    };

    const handleOpenSearchInput = () => {
        setIsSearchInputOpen(!isSearchInputOpen);
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

                        <div
                            className={css.sidebar_menu_action_container}
                            data-active={isCorporaOpen}>
                            <div className={css.sidebar_menu_action_btn}>
                                <CorporaIcon fill="currentColor" />
                            </div>
                            <div className={css.sidebar_menu_action_btn_tooltip}>
                                <div>Corpora</div>
                                <div
                                    className={css.show_more_btn}
                                    onClick={handleOpenCorpora}
                                >
                                    {!isCorporaOpen ? "+" : "-"}
                                </div>
                            </div>
                        </div>


                    <div
                        className={css.sidebar_menu_action_container}
                        data-active={isIndividualChatOpen}>
                        <div className={css.sidebar_menu_action_btn}>
                            <IndividualChatsIcon fill="currentColor" />
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Individual Chats</div>
                            <div
                                className={css.show_more_btn}
                                onClick={handleOpenIndividualChat}
                            >
                                {!isIndividualChatOpen ? "+" : "-"}
                            </div>
                        </div>
                    </div>


                    <div
                        className={!isSearchInputOpen ? css.sidebar_menu_action_container : css.sidebar_search_input_container}
                        data-active={isFavouritesOpen}>
                        <div
                            className={css.sidebar_menu_action_btn}
                            onClick={isFavouritesOpen ? handleOpenSearchInput : undefined}>
                            {!isFavouritesOpen ? <FavoriteIcon fill="currentColor" /> : <SearchIcon fill="currentColor"/> }
                        </div>
                        {isFavouritesOpen && isSearchInputOpen ? (
                            <div className={css.sidebar_search_input}>
                                <input
                                    className={css.search_input}
                                    type="text"
                                    placeholder="Search..."
                                    autoFocus
                                />
                                <div onClick={handleOpenSearchInput}>
                                    <CloseIcon/>
                                </div>

                            </div>

                        ) : (
                            <div className={css.sidebar_menu_action_btn_tooltip}>
                                <div>Favourites</div>
                                <div
                                    className={css.show_more_btn}
                                    onClick={handleOpenFavourites}
                                >
                                    {!isFavouritesOpen ? "+" : "-"}
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={css.sidebar_menu_action_container}
                        data-active={isTagsOpen}>
                        <div className={css.sidebar_menu_action_btn}>
                            <TagsIcon fill="currentColor" />
                        </div>
                        <div className={css.sidebar_menu_action_btn_tooltip}>
                            <div>Tags</div>
                            <div
                                className={css.show_more_btn}
                                onClick={handleOpenTags}
                            >
                                {!isTagsOpen ? "+" : "-"}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};