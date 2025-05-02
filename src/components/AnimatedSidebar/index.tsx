import clsx from "clsx";
import { useCursor } from "src/contexts/CursorContext";
import { useEditorContext } from "src/shared/components/Editor";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import MoonIcon from "src/shared/icons/Moon.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import { useChatStore } from "src/shared/providers";
import { SidebarGaia } from "src/widgets/Sidebar/ui";
import { SidebarFormatting } from "../SidebarFormatting/intex";
import { SidebarMenu } from "../SidebarMenu/intex";
import { SidebarTools } from "../SidebarTools/intex";
import css from "./AnimatedSidebar.module.less";

interface SidebarProps {
    step: number;
    darkMode?: boolean;
    showSidebar: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
    handleUserClickedSidebarButton: (type: string) => void;
    profileData: {
        name: string;
        email: string;
        photo: string;
    };
}

export const AnimatedSidebar = ({
    step,
    darkMode,
    showSidebar,
    handleSidebarOpen,
    handleSidebarClose,
    handleUserClickedSidebarButton,
    profileData,
}: SidebarProps) => {
    const { cursorMoving } = useCursor();
    const { editor } = useChatStore();
    const editorState = useEditorContext(editor);
    const safeStep = step ?? 0;
    const isOpen = safeStep >= 12 && safeStep <= 16;

    return (
        <aside
            className={clsx(css.sidebar, { [css.open]: isOpen, [css.hidden]: !showSidebar })}
            // onTransitionEnd={isOpen && step === 11 ? handleSidebarClose : handleSidebarOpen}
            onTransitionEnd={step === 17 ? handleSidebarClose : handleSidebarOpen}
        >
            <SidebarGaia />

            <div className={css.sidebar_profile}>
                <img
                    src={profileData.photo}
                    alt=""
                    data-step="profile"
                    className={clsx(css.sidebar_profile_img, {
                        [css.highlighted_profile]: step === 18,
                    })}
                />
                <div className={css.sidebar_profile_container}>
                    <div className={css.sidebar_profile_name}>John Doe</div>
                    <div className={css.sidebar_profile_email}>johndoe@gmail.com</div>
                </div>
            </div>

            <div
                className={clsx(css.sidebar_theme, {
                    [css.dark]: darkMode,
                    [css.light]: (step === 24 || step === 26) && !cursorMoving,
                })}
            >
                <div className={css.sidebar_theme_toggler}>
                    <button className={css.sidebar_theme_btn} disabled data-step="lightMode">
                        <LightThemeIcon />
                    </button>
                    <button className={css.sidebar_theme_btn} data-step="darkMode">
                        <MoonIcon />
                    </button>
                </div>
                {isOpen && <p className={css.sidebar_theme_text}>Light theme</p>}
            </div>

            <div className={css.sidebar_controls}>
                <SidebarMenu step={step} isOpen={isOpen} />

                <SidebarFormatting
                    step={step}
                    isOpen={isOpen}
                    editorState={editorState}
                    handleUserClickedSidebarButton={handleUserClickedSidebarButton}
                />

                <SidebarTools step={step} isOpen={isOpen} />
            </div>

            <button className={css.sidebar_removeMsg} data-step="delete">
                <TrashIcon />
                <div className={css.sidebar_controls_text}>Delete all messages</div>
            </button>
        </aside>
    );
};
