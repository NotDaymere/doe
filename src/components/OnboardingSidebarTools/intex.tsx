import clsx from "clsx";
import css from "./OnboardingSidebarTools.module.less";

interface OnboardingSidebarToolsProps {
    step?: number;
    isOpen: boolean;
}

export const OnboardingSidebarTools = ({ step, isOpen }: OnboardingSidebarToolsProps) => {
    const toolButtons = [
        {
            icon: "/img/icons/translations3.svg",
            label: "Translate content",
            dataStep: "translate",
            step: [19, 20],
        },
        {
            icon: "/img/icons/recording3.svg",
            label: "Listen and transcribe",
            dataStep: "transcribe",
            step: [21, 22],
        },
        {
            icon: "/img/icons/shared3.svg",
            label: "Sharing Content",
            dataStep: "share",
            step: 23,
        },
    ];

    return (
        <div className={clsx(css.sidebar_controls_subgroup, { [css.open]: isOpen })}>
            <div className={css.sidebar_controls_title}>Live tools</div>
            <div className={css.sidebar_controls_group}>
                {toolButtons.map(({ icon, label, dataStep, step: btnStep }) => (
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
                    >
                        <img src={icon} alt={label} />
                        <div className={css.sidebar_controls_text}>{label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
