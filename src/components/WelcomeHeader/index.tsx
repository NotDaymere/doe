import clsx from "clsx";
import { useState } from "react";
import { ReactComponent as Grid } from "src/assets/icons/dot-grid.svg";
import { ReactComponent as Logo } from "src/assets/icons/logo-gradient.svg";
import WelcomeText from "src/components/WelcomeText";
import css from "./WelcomeHeader.module.less";

interface WelcomeHeaderProps {
    step: number;
    text: string;
    startOnboardingFlow: () => void;
    handleWelcomeTextTypedOut: () => void;
}

export const WelcomeHeader = ({
    step,
    text,
    startOnboardingFlow,
    handleWelcomeTextTypedOut,
}: WelcomeHeaderProps) => {
    if ((step > 7 && step < 28) || (step >= 39 && step <= 57)) return null;
    const [animationComplete, setAnimationComplete] = useState(false);

    const hideGrid = step <= 27;

    const onLogoAppearing = () => {
        setAnimationComplete(true);
        startOnboardingFlow();
    };

    return (
        <div
            className={clsx(css.header_container, { [css.hidden]: step >= 29 && step <= 57 })}
            data-step="head"
        >
            {hideGrid && (
                <div className={css.logo_grid}>
                    <Grid />
                </div>
            )}
            <div
                className={clsx(css.logo_container, {
                    [css.logo_no_shadow]: step >= 28,
                })}
                onAnimationEnd={onLogoAppearing}
            >
                <Logo />
            </div>

            {(animationComplete || step > 5) && (
                <WelcomeText onComplete={handleWelcomeTextTypedOut} text={text} step={step} />
            )}
        </div>
    );
};
