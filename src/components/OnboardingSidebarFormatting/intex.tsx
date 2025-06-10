import clsx from "clsx";
import { useCursor } from "src/contexts/CursorContext";
import BoldIcon from "src/shared/icons/Bold.icon";
import CodeIcon from "src/shared/icons/Code.icon";
import FunctionIcon from "src/shared/icons/Function.icon";
import ItalicIcon from "src/shared/icons/Italic.icon";
import LinkIcon from "src/shared/icons/Link.icon";
import UnderlineIcon from "src/shared/icons/Underline.icon";
import css from "./OnboardingSidebarFormatting.module.less";

interface OnboardingSidebarFormattingProps {
    step?: number;
    isOpen: boolean;
    editorState: any;
    handleUserClickedSidebarButton: (type: string) => void;
}

const ICONS = {
    bold: <BoldIcon />,
    underline: <UnderlineIcon />,
    italic: <ItalicIcon />,
    function: <FunctionIcon />,
    code: <CodeIcon />,
    link: <LinkIcon />,
};

export const OnboardingSidebarFormatting = ({
    step,
    isOpen,
    editorState,
    handleUserClickedSidebarButton,
}: OnboardingSidebarFormattingProps) => {
    const { cursorMoving } = useCursor();

    const formattingButtons = [
        {
            icon: ICONS.bold,
            label: "bold text",
            step: 5,
            dataStep: "bold",
            onClick: () => {
                editorState.toggleBold?.();
                handleUserClickedSidebarButton("bold");
            },
            isActive: editorState.isBold,
        },
        {
            icon: ICONS.underline,
            label: "Underlined text",
            step: 6,
            dataStep: "underline",
            onClick: () => {
                editorState.toggleUnderline?.();
                handleUserClickedSidebarButton("underline");
            },
            isActive: editorState.isUnderline,
        },
        {
            icon: ICONS.italic,
            label: "Italic text",
            step: 7,
            dataStep: "italic",
            onClick: () => {
                editorState.toggleItalic?.();
                handleUserClickedSidebarButton("italic");
            },
            isActive: editorState.isItalic,
        },
        {
            icon: ICONS.function,
            label: "Math mode",
            step: [8.1, 8.2, 8.3, 8.4],
            dataStep: "function",
            onClick: () => {
                handleUserClickedSidebarButton("math");
            },
        },
        {
            icon: ICONS.code,
            label: "Code mode",
            step: [9.1, 9.2, 9.3, 9.4],
            dataStep: "code",
            onClick: () => {
                editorState.toggleCode?.();
                handleUserClickedSidebarButton("code");
            },
            isActive: editorState.isCode,
        },
        {
            icon: ICONS.link,
            label: "Insert link",
            step: 10,
            dataStep: "link",
        },
    ];

    const pointerDown = (event: React.PointerEvent) => {
        event.preventDefault();
    };

    return (
        <div className={clsx(css.sidebar_controls_subgroup, { [css.open]: isOpen })}>
            <div className={css.sidebar_controls_title}>Text formatting</div>
            <div className={css.sidebar_controls_group}>
                {formattingButtons.map(
                    ({ icon, label, step: btnStep, dataStep, onClick, isActive }) => (
                        <button
                            key={dataStep}
                            className={clsx(css.sidebar_controls_btn, {
                                [css.highlighted]:
                                    !cursorMoving &&
                                    step &&
                                    (Array.isArray(btnStep)
                                        ? btnStep.includes(step)
                                        : step === btnStep),
                            })}
                            onPointerDown={pointerDown}
                            onClick={onClick}
                            data-active={isActive}
                            data-step={dataStep}
                            disabled={
                                !step ||
                                (Array.isArray(btnStep)
                                    ? !btnStep.includes(step)
                                    : btnStep !== step)
                            }
                        >
                            {icon}
                            <div className={css.sidebar_controls_text}>{label}</div>
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
