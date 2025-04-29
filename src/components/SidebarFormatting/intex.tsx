import clsx from "clsx";
import BoldIcon from "src/shared/icons/Bold.icon";
import CodeIcon from "src/shared/icons/Code.icon";
import FunctionIcon from "src/shared/icons/Function.icon";
import ItalicIcon from "src/shared/icons/Italic.icon";
import LinkIcon from "src/shared/icons/Link.icon";
import UnderlineIcon from "src/shared/icons/Underline.icon";
import css from "./SidebarFormatting.module.less";

interface SidebarFormattingProps {
    step?: number;
    isOpen: boolean;
    editorState: any;
    handleUserClickedSidebarButton: (type: string) => void;
}

export const SidebarFormatting = ({
    step,
    isOpen,
    editorState,
    handleUserClickedSidebarButton,
}: SidebarFormattingProps) => {
    const formattingButtons = [
        {
            icon: <BoldIcon />,
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
            icon: <UnderlineIcon />,
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
            icon: <ItalicIcon />,
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
            icon: <FunctionIcon />,
            label: "Math mode",
            step: 8,
            dataStep: "function",
        },
        {
            icon: <CodeIcon />,
            label: "Code mode",
            step: 9,
            dataStep: "code",
            onClick: editorState.toggleCode,
            isActive: editorState.isCode,
        },
        {
            icon: <LinkIcon />,
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
                                [css.highlighted]: step === btnStep,
                            })}
                            onPointerDown={pointerDown}
                            onClick={onClick}
                            data-active={isActive}
                            data-step={dataStep}
                            disabled={btnStep !== step}
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
