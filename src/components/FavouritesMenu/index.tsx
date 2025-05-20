import clsx from "clsx";
import StarsIcon from "src/shared/icons/Stars.icon";
import css from "./FavouritesMenu.module.less";

interface FavouritesMenuProps {
    label: string;
    step?: number;
    triggerStep: number;
    isOpen: boolean;
}

export const FavouritesMenu = ({ step, label, triggerStep, isOpen }: FavouritesMenuProps) => {
    return (
        <div className={clsx(css.sidebar_item_container, { [css.hidden]: step !== triggerStep })}>
            <div className={css.sidebar_submenu} key={`${label}-submenu`}>
                <button
                    className={clsx(css.sidebar_controls_btn, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={clsx(css.sidebar_controls_head)}>
                        <StarsIcon />
                        <div className={css.sidebar_controls_text}>Result: The Yoneda ...</div>
                    </div>
                    {step === triggerStep && <div className={css.dots}>⋮</div>}
                </button>
                <button
                    className={clsx(css.sidebar_controls_btn, css.low_opacity, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={clsx(css.sidebar_controls_head)}>
                        <StarsIcon />
                        <div className={css.sidebar_controls_text}>Theory The Yoneda Le...</div>
                    </div>
                    {step === triggerStep && <div className={css.dots}>⋮</div>}
                </button>
                <button
                    className={clsx(css.sidebar_controls_btn, css.low_opacity, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={clsx(css.sidebar_controls_head)}>
                        <StarsIcon />
                        <div className={css.sidebar_controls_text}>Explain the Yoneda Le...</div>
                    </div>
                    {step === triggerStep && <div className={css.dots}>⋮</div>}
                </button>
            </div>
        </div>
    );
};
