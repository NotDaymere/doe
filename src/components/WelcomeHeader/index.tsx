import clsx from "clsx";
import { useState } from "react";
import { ReactComponent as Grid } from "src/assets/icons/dot-grid.svg";
import { ReactComponent as Logo } from "src/assets/icons/logo-gradient.svg";
import WelcomeText from "src/components/WelcomeText";
import css from "./WelcomeHeader.module.less";

interface WelcomeHeaderProps {
    step: number;
    text: string;
    logoSlide: boolean;
    startOnboardingFlow: () => void;
    handleWelcomeTextTypedOut: () => void;
    handleLogoSlideComplete: () => void;
}

export const WelcomeHeader = ({
    step,
    text,
    logoSlide,
    startOnboardingFlow,
    handleWelcomeTextTypedOut,
    handleLogoSlideComplete,
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
            className={clsx(css.header_container, {
                [css.hidden]: step >= 28.1 && step <= 57,
                [css.blurred]: step === 7,
            })}
            style={{ marginTop: `${logoSlide ? 10 : 18}%` }}
            data-step="head"
            onTransitionEnd={handleLogoSlideComplete}
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
