import { memo } from "react";
import css from "./WelcomeText.module.less";

interface WelcomeTextProps {
    onComplete: () => void;
    text: string;
    step: number;
}

function WelcomeText({ onComplete, text, step }: WelcomeTextProps) {
    // const text = "Welcome to Doe, let’s get to know each other.";

    return (
        <p className={css.welcome_text} onAnimationEnd={onComplete}>
            {step < 5 ? (
                text.split("").map((char, index) => (
                    <span
                        key={index}
                        className={css.letter}
                        style={{ animationDelay: `${index * 0.03}s` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))
            ) : (
                <p>{text}</p>
            )}
        </p>
    );
}

export default memo(WelcomeText);
