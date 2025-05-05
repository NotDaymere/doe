import { useRef } from "react";
import { ReactComponent as Grid } from "src/assets/icons/dot-grid.svg";
import { ReactComponent as Logo } from "src/assets/icons/logo-gradient.svg";
import WelcomeText from "src/components/WelcomeText";
import { OnboardingMessage } from "src/shared/types/Message";
import ChatMessage from "../ChatMessage";
import css from "./ReadyMessage.module.less";

interface ReadyMessageProps {
    step: number;
    text: string;
    handleWelcomeTextTypedOut: () => void;
}

export const ReadyMessage = ({ step, text, handleWelcomeTextTypedOut }: ReadyMessageProps) => {
    if (step <= 57) return null;
    const historyRef = useRef<HTMLDivElement>(null);

    const messages: OnboardingMessage[] = [
        { role: "ai", content: "Welcome to doe's private beta!" },
        { role: "ai", content: "To learn more about how the model work" },
    ];

    return (
        <div className={css.header_container} data-step="head" ref={historyRef}>
            <div className={css.logo_grid}>
                <Grid />
            </div>

            <div className={css.logo_container}>
                <Logo />
            </div>

            <WelcomeText onComplete={handleWelcomeTextTypedOut} text={text} step={step} />

            <div className={css.messages}>
                {messages.map((msg, index) => (
                    <ChatMessage
                        message={msg}
                        prevRole={index > 0 ? messages[index - 1]?.role : undefined}
                        step={step}
                        ref={historyRef}
                    />
                ))}
            </div>
        </div>
    );
};
