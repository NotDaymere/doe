import clsx from "clsx";
import { useEffect, useState } from "react";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import css from "./NavigationPrompt.module.less";

interface NavigationPromptProps {
    step: number;
    handleNavigationAnimation: () => void;
}

export const NavigationPrompt = ({ step, handleNavigationAnimation }: NavigationPromptProps) => {
    if (step < 4.5) return null;
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsFading(true);
        }, 4000);
    }, []);

    return (
        <div
            onTransitionEnd={() => step === 4.6 && handleNavigationAnimation()}
            className={clsx(css.navigation_prompt, {
                [css.visible]: step === 4.6,
            })}
        >
            <p className={css.navigation_text} data-step="navigation">
                To navigate through onboarding use your <b>keyboard buttons.</b>
            </p>
            <div className={css.navigation_buttons}>
                <div className={css.navigation_prev}>
                    <ArrowUpIcon />
                </div>
                <div className={css.navigation_next}>
                    <ArrowUpIcon />
                </div>
            </div>
        </div>
    );
};
