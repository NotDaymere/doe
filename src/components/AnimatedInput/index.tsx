import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as Grid } from "src/assets/icons/dot-grid.svg";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import MicrophoneIcon from "src/shared/icons/Microphone.icon";
import ScreenShareIcon from "src/shared/icons/ScreenShare.icon";
import { MagicMenu } from "src/widgets/home-screens";
import { ButtonAccordion } from "../ButtonAccordion";
import { InputStaticText } from "../InputStaticText";
import { ReplyPanel } from "../ReplyPanel";
import { Tooltip } from "../Tooltip";
import css from "./AnimatedInput.module.less";

interface AnimatedInputProps {
    step?: number;
    blockInput: boolean;
    showTooltip: boolean;
    userClickedBold: boolean;
    userClickedUnderline: boolean;
    userClickedItalic: boolean;
    handleGreetingPlaceholderTypedOut: () => void;
    handleBoldPlaceholderTypedOut: () => void;
    handleMathPromptTypedOut: () => void;
    handleMathFormulaTypedOut: () => void;
    onSendMessage: (message: string, type: "greeting" | "project") => void;
}

export function AnimatedInput({
    step,
    blockInput,
    showTooltip,
    userClickedBold,
    userClickedUnderline,
    userClickedItalic,
    handleGreetingPlaceholderTypedOut,
    handleBoldPlaceholderTypedOut,
    handleMathPromptTypedOut,
    handleMathFormulaTypedOut,
    onSendMessage,
}: AnimatedInputProps) {
    if (!step || step < 4 || (step > 18 && step < 28)) return null;
    const [userInput, setUserInput] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showSelectedText, setShowSelectedText] = useState(false);
    const [stressTooltip, setStressTooltip] = useState(false);
    const [isMathBlock, setIsMathBlock] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const safeStep = step ?? 0;

    const typedGreeting = useTypewriterEffect({
        text: "Hey Doe, I'm John Smith",
        speed: 90,
        onComplete: handleGreetingPlaceholderTypedOut,
        startTyping: animationDone && safeStep <= 5,
    });

    const typedPrompt = useTypewriterEffect({
        text: "Write a song about ",
        speed: 100,
        onComplete: () => {
            setShowSelectedText(true);
            if (step === 4.7) handleBoldPlaceholderTypedOut();
        },
        startTyping: step === 4.7,
    });

    const typedMathPrompt = useTypewriterEffect({
        text: "Please put together a sample project that uses the equation ",
        speed: 100,
        onComplete: () => {
            if (step === 8) handleMathPromptTypedOut();
        },
        startTyping: step === 8,
    });

    const typedMathFormula = useTypewriterEffect({
        text: "$Nat(C(-, X), F) cong F(X)$",
        speed: 10,
        onComplete: () => {
            setIsMathBlock(true);
            if (step === 8.2) handleMathFormulaTypedOut();
        },
        startTyping: step === 8.2,
    });

    const linkText = useTypewriterEffect({
        text: "https://thisaichatbot.com",
        speed: 90,
        startTyping: step === 10,
    });

    const handleSendMessage = () => {
        setUserInput("");
        onSendMessage(userInput, safeStep <= 10 ? "greeting" : "project");
        setIsMessageSent(true);
    };

    useEffect(() => {
        if (!blockInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [blockInput]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && safeStep == 28 && !isMessageSent) {
                e.preventDefault();
                e.stopPropagation();
                setStressTooltip(true);

                setTimeout(() => setStressTooltip(false), 1500);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [safeStep, isMessageSent]);

    return (
        <div className={css.panel}>
            {step === 36 && <ReplyPanel />}
            <div className={clsx(css.panel_wrapper, { [css.active]: isActive && animationDone })}>
                <div className={clsx(css.panel_main, { [css.blocked]: blockInput && step >= 24 })}>
                    <MagicMenu step={step} />
                    <div className={clsx(css.panel_input_container, { [css.hide]: isMessageSent })}>
                        <span
                            className={clsx(css.static_text, {
                                [css.ghost]: !isMessageSent && blockInput,
                            })}
                        >
                            <InputStaticText
                                step={safeStep}
                                isMessageSent={isMessageSent}
                                blockInput={blockInput}
                                showSelectedText={showSelectedText}
                                typedGreeting={typedGreeting}
                                typedPrompt={typedPrompt}
                                typedMathPrompt={typedMathPrompt}
                                typedMathFormula={typedMathFormula}
                                linkText={linkText}
                                userClickedBold={userClickedBold}
                                userClickedUnderline={userClickedUnderline}
                                userClickedItalic={userClickedItalic}
                                isMathBlock={isMathBlock}
                            />
                        </span>
                        {showTooltip && !isMessageSent && (
                            <Tooltip position="top" stressed={stressTooltip}>
                                {safeStep <= 10
                                    ? "Type your first and last name here:"
                                    : "Ask Doe to write a small project for you!"}
                            </Tooltip>
                        )}
                        {!blockInput && (
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !blockInput && userInput.trim()) {
                                        handleSendMessage();
                                    }
                                }}
                                onFocus={() => setIsActive(true)}
                                onBlur={() => setIsActive(false)}
                                className={clsx(css.input_field, {
                                    [css.ghost]: !isMessageSent && blockInput,
                                })}
                                disabled={blockInput}
                                placeholder={
                                    blockInput && step >= 29
                                        ? "Ask Doe anything you’d like about the world..."
                                        : ""
                                }
                                autoFocus
                            />
                        )}
                    </div>

                    <button
                        className={clsx(css.panel_button, {
                            [css.highlighted]: step >= 51 && step <= 53,
                        })}
                        disabled={step < 51 || step > 53}
                        data-step="screen-share"
                    >
                        <div className={css.panel_button_test} data-step="input">
                            <ScreenShareIcon className={css.panel_button_icon} />
                        </div>
                        {step === 52 && <ButtonAccordion />}
                    </button>
                    <button className={css.panel_button}>
                        <MicrophoneIcon />
                    </button>
                    <button
                        className={css.panel_submitBtn}
                        onAnimationEnd={() => setAnimationDone(true)}
                        onClick={handleSendMessage}
                        data-step="send"
                    >
                        Send <ArrowUpIcon />
                    </button>
                    <div className={css.panel_grid}>
                        <Grid />
                    </div>
                </div>
            </div>
        </div>
    );
}
