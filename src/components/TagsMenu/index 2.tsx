import clsx from "clsx";
import { useState } from "react";
import { ReactComponent as MinusIcon } from "src/assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "src/assets/icons/plus.svg";
import paths from "src/assets/icons/paths.svg";
import css from "./TagsMenu.module.less";

interface TagsMenuProps {
    label: string;
    step?: number;
    triggerStep: number;
    isOpen: boolean;
}

export const TagsMenu = ({ step, label, triggerStep, isOpen }: TagsMenuProps) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [circleColor, setCircleColor] = useState("#A9ED34");
    const toggleColorPicker = () => setShowColorPicker((prev) => !prev);

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
                        <div
                            className={css.circle}
                            onClick={toggleColorPicker}
                            style={{ backgroundColor: `${circleColor}` }}
                        />
                        {showColorPicker && (
                            <div className={css.color_picker_popup}>
                                <div
                                    className={css.color_circle}
                                    style={{ backgroundColor: "#A9ED34" }}
                                    onClick={() => {
                                        setShowColorPicker(false);
                                        setCircleColor("#A9ED34");
                                    }}
                                />
                                <div
                                    className={css.color_circle}
                                    style={{ backgroundColor: "#BF6FFF" }}
                                    onClick={() => {
                                        setShowColorPicker(false);
                                        setCircleColor("#BF6FFF");
                                    }}
                                />
                                <div
                                    className={css.color_circle}
                                    style={{ backgroundColor: "#5B5B5B" }}
                                    onClick={() => {
                                        setShowColorPicker(false);
                                        setCircleColor("#5B5B5B");
                                    }}
                                />
                                <div
                                    className={css.color_circle}
                                    style={{ backgroundColor: "#FFD600" }}
                                    onClick={() => {
                                        setShowColorPicker(false);
                                        setCircleColor("#FFD600");
                                    }}
                                />
                                <div className={css.dots}> ⋮ </div>
                            </div>
                        )}
                        <div className={css.sidebar_controls_text}>Green Tag</div>
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
                        {step === triggerStep && (
                            <div className={css.minus}>
                                <MinusIcon />
                            </div>
                        )}
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
                            {step === triggerStep && (
                                <div className={css.minus}>
                                    <MinusIcon />
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
                            <div className={clsx(css.sidebar_controls_head)}>
                                <img src={paths} alt="" />
                                <div className={css.sidebar_controls_text}>The Python code ...</div>
                            </div>
                            {step === triggerStep && (
                                <div className={css.minus}>
                                    <MinusIcon />
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
                            <div className={clsx(css.sidebar_controls_head)}>
                                <img src={paths} alt="" />
                                <div className={css.sidebar_controls_text}>
                                    We will write thi...
                                </div>
                            </div>
                            {step === triggerStep && (
                                <div className={css.minus}>
                                    <MinusIcon />
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                <button
                    className={clsx(css.sidebar_controls_btn, {
                        [css.open]: isOpen,
                        [css.highlighted]: step === triggerStep,
                    })}
                    data-step={label}
                >
                    <div className={css.sidebar_controls_head}>
                        <div className={clsx(css.circle, css.purple)} />
                        <div className={css.sidebar_controls_text}>Purple Tag</div>
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
                        <div className={clsx(css.circle, css.orange)} />
                        <div className={css.sidebar_controls_text}>Orange Tag</div>
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
