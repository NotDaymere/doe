import clsx from "clsx";
import { ReactComponent as MinusIcon } from "src/assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "src/assets/icons/plus.svg";
import paths from "src/assets/icons/paths.svg";
import css from "./ChatMenu.module.less";

interface ChatMenuProps {
    label: string;
    step?: number;
    triggerStep: number;
    isOpen: boolean;
}

export const ChatMenu = ({ step, label, triggerStep, isOpen }: ChatMenuProps) => {
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
                    <div className={css.sidebar_controls_head}>
                        <div className={css.circle}></div>
                        <div className={css.sidebar_controls_text}>Chat 1</div>
                    </div>
                    <div className={css.icons}>
                        {step === triggerStep && <div className={css.dots}>⋮</div>}
                        {step === triggerStep && (
                            <div className={css.minus}>
                                <MinusIcon />
                            </div>
                        )}
                    </div>
                </button>
                <div className={css.sidebar_controls_title}>Branches</div>
                <div className={css.chats}>
                    <button
                        className={clsx(css.sidebar_controls_btn, {
                            [css.open]: isOpen,
                            [css.highlighted]: step === triggerStep,
                        })}
                        data-step={label}
                    >
                        <div className={css.sidebar_controls_head}>
                            <img src={paths} alt="" />
                            <div className={css.sidebar_controls_text}>Create a simple ...</div>
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
                            <img src={paths} alt="" />
                            <div className={css.sidebar_controls_text}>The Python code ...</div>
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
                            <img src={paths} alt="" />
                            <div className={css.sidebar_controls_text}>We will write thi...</div>
                        </div>
                        {step === triggerStep && <div className={css.dots}>⋮</div>}
                    </button>
                </div>
                <button
                    className={clsx(css.sidebar_controls_btn, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={css.sidebar_controls_head}>
                        <div className={clsx(css.circle, css.orange)} />
                        <div className={css.sidebar_controls_text}>Chat 2</div>
                    </div>
                    {step === triggerStep && (
                        <div className={css.plus}>
                            <PlusIcon />
                        </div>
                    )}
                </button>
                <button
                    className={clsx(css.sidebar_controls_btn, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={css.sidebar_controls_head}>
                        <div className={clsx(css.circle, css.purple)} />
                        <div className={css.sidebar_controls_text}>Chat 3</div>
                    </div>
                    {step === triggerStep && (
                        <div className={css.plus}>
                            <PlusIcon />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};
