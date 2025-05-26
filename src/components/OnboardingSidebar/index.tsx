import clsx from "clsx";
import { useCursor } from "src/contexts/CursorContext";
import { useEditorContext } from "src/shared/components/Editor";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import MoonIcon from "src/shared/icons/Moon.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import { useChatStore } from "src/shared/providers";
import { SidebarGaia } from "src/widgets/Sidebar/ui";
import { OnboardingSidebarFormatting } from "../OnboardingSidebarFormatting/intex";
import { OnboardingSidebarMenu } from "../OnboardingSidebarMenu/intex";
import { OnboardingSidebarTools } from "../OnboardingSidebarTools/intex";
import css from "./OnboardingSidebar.module.less";

interface OnboardingSidebarProps {
    step: number;
    darkMode?: boolean;
    showSidebar: boolean;
    handleSidebarOpen: () => void;
    handleUserClickedSidebarButton: (type: string) => void;
    profileData: {
        name: string;
        email: string;
        photo: string;
    };
}

export const OnboardingSidebar = ({
    step,
    darkMode,
    showSidebar,
    handleSidebarOpen,
    handleUserClickedSidebarButton,
    profileData,
}: OnboardingSidebarProps) => {
    const { cursorMoving } = useCursor();
    const { editor } = useChatStore();
    const editorState = useEditorContext(editor);
    const safeStep = step ?? 0;
    const isOpen = safeStep >= 12 && safeStep <= 16;

    return (
        <aside
            className={clsx(css.sidebar, {
                [css.open]: isOpen,
                [css.hidden]: !showSidebar,
                [css.dark_mode]: darkMode,
                [css.border]: safeStep < 5,
            })}
            onTransitionEnd={handleSidebarOpen}
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
                <div
                    className={clsx(css.sidebar_theme_toggler, {
                        [css.sidebar_theme_toggler_horizontal]: step >= 12 && step <= 16,
                    })}
                >
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
                <OnboardingSidebarMenu
                    step={step}
                    isOpen={isOpen}
                    handleUserClickedSidebarButton={handleUserClickedSidebarButton}
                />

                <OnboardingSidebarFormatting
                    step={step}
                    isOpen={isOpen}
                    editorState={editorState}
                    handleUserClickedSidebarButton={handleUserClickedSidebarButton}
                />

                <OnboardingSidebarTools step={step} isOpen={isOpen} />
            </div>

            <button className={css.sidebar_removeMsg} data-step="delete">
                <TrashIcon />
                <div className={css.sidebar_controls_text}>Delete all messages</div>
            </button>
        </aside>
    );
};
