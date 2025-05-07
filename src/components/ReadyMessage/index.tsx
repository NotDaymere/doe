import { useEffect, useRef, useState } from "react";
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
    handleFirstReadyMessage: () => void;
    handleSecondReadyMessage: () => void;
}

export const ReadyMessage = ({
    step,
    text,
    handleWelcomeTextTypedOut,
    handleFirstReadyMessage,
    handleSecondReadyMessage,
}: ReadyMessageProps) => {
    if (step <= 57) return null;
    const historyRef = useRef<HTMLDivElement>(null);
    const [visibleMessages, setVisibleMessages] = useState<OnboardingMessage[]>([]);

    useEffect(() => {
        setVisibleMessages([{ role: "ai", content: "Welcome to doe's private beta!" }]);

        const timeout = setTimeout(() => {
            setVisibleMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: "To learn more about how the model works, check out:",
                    betaWidget: true,
                },
            ]);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

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
                {visibleMessages.map((msg, index) => (
                    <ChatMessage
                        message={msg}
                        prevRole={index > 0 ? visibleMessages[index - 1]?.role : undefined}
                        step={step}
                        ref={historyRef}
                        handleFirstReadyMessage={handleFirstReadyMessage}
                        handleSecondReadyMessage={handleSecondReadyMessage}
                    />
                ))}
            </div>
        </div>
    );
};
