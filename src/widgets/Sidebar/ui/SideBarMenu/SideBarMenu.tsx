import React from "react";
import { useAppStore } from "../../../../shared/providers";
import css from "./SideBarMenu.module.less";
import { ChatTagsEnum } from "../../../../shared/enums/ChatTagsEnum";
import { Corpora } from "./Corpora/Corpora";
import { Bookmarks } from "./Bookmarks/Bookmarks";
import { Tags } from "./Tags/Tags";
import { IndividualChats } from "./IndividualChats/IndividualChats";


export const TAG_META: Record<ChatTagsEnum, { defaultName: string; color: string }> = {
    [ChatTagsEnum.Green]: { defaultName: "Green", color: "#A9ED34" },
    [ChatTagsEnum.Purple]: { defaultName: "Purple", color: "#BF6FFF" },
    [ChatTagsEnum.Orange]: { defaultName: "Orange", color: "#FFA930" },
    [ChatTagsEnum.Yellow]: { defaultName: "Yellow", color: "#FFD600" },
    [ChatTagsEnum.Red]: { defaultName: "Red", color: "#FF5F5F" },
    [ChatTagsEnum.Blue]: { defaultName: "Blue", color: "#28ABFB" },
    [ChatTagsEnum.Black]: { defaultName: "Black", color: "#5B5B5B" },
    [ChatTagsEnum.Beige]: { defaultName: "Beige", color: "#FFFBE9" },
    [ChatTagsEnum.Gray]: { defaultName: "Gray", color: "#DDDDDD" },
};

export const SideBarMenu = () => {
    const { isSideBarOpen } = useAppStore();
    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = React.useState(true);

    const handleOpenSideBarMenu = () => {
        setIsSideBarMenuOpen(!isSideBarMenuOpen);
    };

    return (
        <div className={isSideBarOpen ? css.sidebar_open_menu : css.sidebar_menu}>
            <div className={css.menu_actions_section_name}>
                <div>Menu</div>
                <div className={css.show_actions_btn} onClick={handleOpenSideBarMenu}>
                    {!isSideBarMenuOpen ? "+" : "-"}
                </div>
            </div>

            {isSideBarMenuOpen && (
                <div className={css.menu_actions_section_container}>

                    <Corpora
                        isSideBarOpen={isSideBarOpen}
                        isSideBarMenuOpen={isSideBarMenuOpen}
                    />

                    <IndividualChats
                        isSideBarOpen={isSideBarOpen}
                        isSideBarMenuOpen={isSideBarMenuOpen}/>

                    <Bookmarks
                        isSideBarOpen={isSideBarOpen}
                        isSideBarMenuOpen={isSideBarMenuOpen}/>

                    <Tags
                        isSideBarOpen={isSideBarOpen}
                        isSideBarMenuOpen={isSideBarMenuOpen} />

                </div>
            )}
        </div>
    );
};
