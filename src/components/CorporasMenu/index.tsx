import clsx from "clsx";
import paths from "src/assets/icons/paths.svg";
import corpora1 from "src/assets/images/corpora1.png";
import corpora2 from "src/assets/images/corpora2.png";
import corpora3 from "src/assets/images/corpora3.png";
import { ReactComponent as MinusIcon } from "src/assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "src/assets/icons/plus.svg";
import css from "./CorporasMenu.module.less";

interface CorporasMenuProps {
    label: string;
    step?: number;
    triggerStep: number;
    isOpen: boolean;
}

export const CorporasMenu = ({ step, label, triggerStep, isOpen }: CorporasMenuProps) => {
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
                        <img src={corpora1} alt="" />
                        <div className={css.sidebar_controls_text}>Corpora 1</div>
                    </div>
                    {step === triggerStep && (
                        <div className={css.minus}>
                            <MinusIcon />
                        </div>
                    )}
                </button>
                <div className={css.sidebar_controls_title}>Chats</div>
                <div className={css.chats}>
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

                        <div className={css.sidebar_controls_buttons}>
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
                            <div className={css.sidebar_controls_buttons}>
                                {step === triggerStep && <div className={css.dots}>⋮</div>}
                                {/* {step === triggerStep && (
                                    <div className={css.minus}>
                                        <MinusIcon />
                                    </div>
                                )} */}
                            </div>
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
                            {/* {step === triggerStep && (
                                <div className={css.minus}>
                                    <MinusIcon />
                                </div>
                            )} */}
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
                                <div className={css.sidebar_controls_text}>
                                    We will write thi...
                                </div>
                            </div>
                            {/* {step === triggerStep && (
                                <div className={css.minus}>
                                    <MinusIcon />
                                </div>
                            )} */}
                        </button>
                    </div>
                </div>
                <button
                    className={clsx(css.sidebar_controls_btn, css.low_opacity, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={css.sidebar_controls_head}>
                        <img src={corpora2} alt="" />
                        <div className={css.sidebar_controls_text}>Corpora 2</div>
                    </div>
                    {step === triggerStep && (
                        <div className={css.plus}>
                            <PlusIcon />
                        </div>
                    )}
                </button>
                <button
                    className={clsx(css.sidebar_controls_btn, css.low_opacity, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={css.sidebar_controls_head}>
                        <img src={corpora3} alt="" />
                        <div className={css.sidebar_controls_text}>Corpora 3</div>
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
