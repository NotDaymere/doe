import React from "react";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import MoonIcon from "src/shared/icons/Moon.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import { useEditorContext } from "src/shared/components/Editor";
import { useChatStore } from "src/shared/providers";
import { SidebarGaia } from "./ui";
import css from "./Sidebar.module.less";
import { Theme } from "@monaco-editor/react";
import { SideBarMenu } from "./ui/SideBarMenu/SideBarMenu";
import { TextFormatting } from "./ui/Text formatting/TextFormatting";
import { LiveTools } from "./ui/Live tools/LiveTools";

export const Sidebar: React.FC = () => {
    const { isSideBarOpen, setIsSideBarOpen } = useChatStore();
    const { editor } = useChatStore();
    const editorState = useEditorContext(editor);
    const { playground } = useChatStore();
    // const {isHyperlinkInputOpen, setIsHyperlinkInputOpen } = useChatStore();
    const [theme, setTheme] = React.useState<"Light" | "Dark">("Light")

    const handleOpenSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const handleToggleTheme = (theme: "Light" | "Dark") => {
        setTheme(theme);
    };

    const ballPositionStyle = isSideBarOpen
        ? { left: theme === "Light" ? "6px" : "37px" }
        : { top: theme === "Light" ? "6px" : "37px" };

    return (
        <aside className={isSideBarOpen ? css.sidebar_open : css.sidebar}>

            <SidebarGaia />

            <div className={css.sidebar_separator}>
                <div className={css.inner_sidebar_separator}></div>
            </div>

            <div className={css.profile_container}>
                <div className={css.sidebar_profile}>
                    <img
                        className={css.sidebar_profile_img}
                        src="/temp/profile.jpg"
                        alt=""
                    />
                </div>
                {isSideBarOpen && (
                    <div className={css.profile_user_info}>
                        <div className={css.profile_username}>John Doe</div>
                        <div className={css.profile_email}>johndoe@gmail.com</div>
                    </div>
                )}
            </div>

            <div className={css.sidebar_theme_container}>
                <div className={css.theme_toggle}>
                    <div
                        className={css.theme_toggle_ball}
                        style={ballPositionStyle}
                    />
                    <div
                        className={
                            theme === "Light"
                                ? css.toggle_light_theme_active_icon
                                : css.toggle_light_theme_icon
                        }
                        onClick={() => handleToggleTheme("Light")}
                    >
                        <LightThemeIcon width={20} height={20} />
                    </div>
                    <div
                        className={
                            theme === "Dark"
                                ? css.toggle_dark_theme_active_icon
                                : css.toggle_dark_theme_icon
                        }
                        onClick={() => handleToggleTheme("Dark")}
                    >
                        <MoonIcon width={20} height={20} />
                    </div>
                </div>
                {isSideBarOpen && (
                    <div className={css.theme_name}>
                        {theme} Theme
                    </div>
                )}
            </div>

            <div className={css.sidebar_separator}>
                <div className={css.inner_sidebar_separator}></div>
            </div>
            <div className={css.sidebar_controls}>

                <SideBarMenu />
                <div className={css.sidebar_separator}>
                    <div className={css.inner_sidebar_separator}></div>
                </div>
                <TextFormatting />
                <div className={css.sidebar_separator}>
                    <div className={css.inner_sidebar_separator}></div>
                </div>
                <div className={css.margin_bottom}>
                    <LiveTools />
                </div>


                <div className={css.delete_all_messages_btn_container}>
                    <button className={css.delete_all_messages_btn}>
                        <TrashIcon />
                    </button>
                    <div className={css.delete_all_messages_btn_tooltip}>
                        Delete All Messages
                    </div>
                </div>
            </div>


            <div
                className={css.sidebar_resize_handler}
                onClick={handleOpenSideBar}
            />

        </aside>
    );
};