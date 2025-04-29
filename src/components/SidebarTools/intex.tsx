import clsx from "clsx";
import css from "./SidebarTools.module.less";

const toolButtons = [
    {
        icon: "/img/icons/translations.svg",
        label: "Translate content",
        dataStep: "translate",
        step: 19,
    },
    {
        icon: "/img/icons/recording.svg",
        label: "Listen and transcribe",
        dataStep: "transcribe",
        step: 21,
    },
    {
        icon: "/img/icons/shared.svg",
        label: "Sharing Content",
        dataStep: "share",
        step: 23,
    },
];

interface SidebarToolsProps {
    step?: number;
    isOpen: boolean;
}

export const SidebarTools = ({ step, isOpen }: SidebarToolsProps) => {
    return (
        <div className={clsx(css.sidebar_controls_subgroup, { [css.open]: isOpen })}>
            <div className={css.sidebar_controls_title}>Live tools</div>
            <div className={css.sidebar_controls_group}>
                {toolButtons.map(({ icon, label, dataStep, step: btnStep }) => (
                    <button
                        key={dataStep}
                        className={clsx(css.sidebar_controls_btn, {
                            [css.highlighted]: step === btnStep,
                        })}
                        data-step={dataStep}
                        disabled={btnStep !== step}
                    >
                        <img src={icon} alt={label} />
                        <div className={css.sidebar_controls_text}>{label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
