import clsx from "clsx";
import css from "./SidebarTools.module.less";

interface SidebarToolsProps {
    step?: number;
    isOpen: boolean;
    handleUserClickedSidebarButton: (type: string) => void;
}

export const SidebarTools = ({
    step,
    isOpen,
    handleUserClickedSidebarButton,
}: SidebarToolsProps) => {
    const toolButtons = [
        {
            icon: "/img/icons/translations.svg",
            label: "Translate content",
            dataStep: "translate",
            step: [19.1, 19.2],
            onClick: () => handleUserClickedSidebarButton("translate"),
            // onClick: () => console.log("translate"),
        },
        {
            icon: "/img/icons/recording.svg",
            label: "Listen and transcribe",
            dataStep: "transcribe",
            step: [21.1, 21.2],
            onClick: () => handleUserClickedSidebarButton("transcribe"),
        },
        {
            icon: "/img/icons/shared.svg",
            label: "Sharing Content",
            dataStep: "share",
            step: 23,
        },
    ];

    return (
        <div className={clsx(css.sidebar_controls_subgroup, { [css.open]: isOpen })}>
            <div className={css.sidebar_controls_title}>Live tools</div>
            <div className={css.sidebar_controls_group}>
                {toolButtons.map(({ icon, label, dataStep, onClick, step: btnStep }) => (
                    <button
                        key={dataStep}
                        className={clsx(css.sidebar_controls_btn, {
                            [css.highlighted]:
                                step &&
                                (Array.isArray(btnStep)
                                    ? btnStep.includes(step)
                                    : step === btnStep),
                        })}
                        data-step={dataStep}
                        disabled={
                            !step ||
                            (Array.isArray(btnStep) ? !btnStep.includes(step) : btnStep !== step)
                        }
                        onClick={onClick}
                    >
                        <img src={icon} alt={label} />
                        <div className={css.sidebar_controls_text}>{label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
