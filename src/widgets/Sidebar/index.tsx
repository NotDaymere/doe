import React from "react";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import MoonIcon from "src/shared/icons/Moon.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import { useEditorContext } from "src/shared/components/Editor";
import { useAppStore, useChatStore } from "src/shared/providers";
import { SidebarGaia } from "./ui";
import css from "./Sidebar.module.less";
import { Theme } from "@monaco-editor/react";
import { SideBarMenu } from "./ui/SideBarMenu/SideBarMenu";
import { TextFormatting } from "./ui/Text formatting/TextFormatting";
import { LiveTools } from "./ui/Live tools/LiveTools";
import ChangeProfileIcon from "../../shared/icons/ChangeProfileIcon";
import {ProfileMockData} from "./ui/ProfileMockData";
import {Profile} from "./ui/Profile";
import AddProfileIcon from "../../shared/icons/AddProfileIcon";
import {CSSTransition} from "react-transition-group";

export const Sidebar: React.FC = () => {
    const { isSideBarOpen, setIsSideBarOpen } = useAppStore();
    const { editor } = useAppStore();
    const editorState = useEditorContext(editor);
    const { playground , clearCurrentChatMessages} = useChatStore();
    const [theme, setTheme] = React.useState<"Light" | "Dark">("Light")
    const [isChangeProfilePanelOpen, setIsChangeProfilePanelOpen] = React.useState<boolean>(false)
    const [profiles, setProfiles] = React.useState<Profile[]>(ProfileMockData);

    const changeProfileRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isChangeProfilePanelOpen &&
                changeProfileRef.current &&
                !changeProfileRef.current.contains(event.target as Node)
            ) {
                setIsChangeProfilePanelOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isChangeProfilePanelOpen]);


    const handleOpenSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const handleToggleTheme = (theme: "Light" | "Dark") => {
        setTheme(theme);
    };

    const ballPositionStyle = isSideBarOpen
        ? { left: theme === "Light" ? "6px" : "37px" }
        : { top: theme === "Light" ? "6px" : "37px" };

    const handleOpenChangeProfilePanel = () => {
        setIsChangeProfilePanelOpen(!isChangeProfilePanelOpen)
    };

    const currentProfile = profiles.find(p => p.isCurrent);

    const handleSelectProfile = (id: number) => {
        setProfiles(prev =>
            prev.map(p => ({ ...p, isCurrent: p.id === id }))
        );
    };

    const handleDeleteAllMessages = () => {
        clearCurrentChatMessages();
    }

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
                        src={currentProfile ? currentProfile.imgSrc : ""}
                    />
                </div>
                {isSideBarOpen && (
                    <div className={css.profile_user_info_container}>
                        <div className={css.profile_user_info}>
                            <div className={css.profile_username}>{currentProfile ? currentProfile.username : ""}</div>
                            <div className={css.profile_email}>{currentProfile ? currentProfile.email : ""}</div>
                        </div>
                        <div
                            className={css.change_profile_btn}
                            onClick={handleOpenChangeProfilePanel}
                            data-active={isChangeProfilePanelOpen}>
                            <ChangeProfileIcon fill="currentColor" width={11} height={15}/>
                        </div>
                    </div>
                )}
            </div>
            <CSSTransition
                in={isChangeProfilePanelOpen}
                timeout={300}
                classNames={{
                    enter: css['changeProfile-enter'],
                    enterActive: css['changeProfile-enter-active'],
                    exit: css['changeProfile-exit'],
                    exitActive: css['changeProfile-exit-active']
                }}
                unmountOnExit
            >
                <div
                    className={css.change_profile_list}
                    ref={changeProfileRef}
                >
                    {ProfileMockData.map(profile => (
                        <div
                            key={profile.id}
                            className={css.profile_container}
                            onClick={() => handleSelectProfile(profile.id)}>
                            <div className={css.sidebar_profile}>
                                <img
                                    className={css.sidebar_profile_img}
                                    src={profile.imgSrc}
                                />
                            </div>
                            <div className={css.profile_user_info_container}>
                                <div className={css.profile_user_info}>
                                    <div className={css.profile_username}>{profile.username}</div>
                                    <div className={css.profile_email}>{profile.email}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={css.add_profile_btn}>
                        <div className={css.add_profile_btn_icon}>
                            <AddProfileIcon/>
                        </div>
                        <div>
                            Add account
                        </div>
                    </div>
                </div>
            </CSSTransition>

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

                <div className={css.delete_all_messages}>
                    <div className={css.delete_all_messages_btn_container}>
                        <button
                            className={css.delete_all_messages_btn}
                            onClick={handleDeleteAllMessages}
                        >
                            <TrashIcon />
                        </button>
                        <div className={css.delete_all_messages_btn_tooltip}>
                            Delete All Messages
                        </div>
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