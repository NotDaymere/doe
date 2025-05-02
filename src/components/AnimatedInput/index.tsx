import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { ReactComponent as Grid } from "src/assets/icons/dot-grid.svg";
import { pythonCodeSmall } from "src/helpers/onboardingMessages";
import { MessageType } from "src/hooks/useChat";
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
    sendButtonEnabled?: boolean;
    showTooltip: boolean;
    userClickedBold: boolean;
    userClickedUnderline: boolean;
    userClickedItalic: boolean;
    handleGreetingPlaceholderTypedOut: () => void;
    handleBoldPlaceholderTypedOut: () => void;
    handleMathPromptTypedOut: () => void;
    handleMathFormulaTypedOut: () => void;
    handleCodePromptTypedOut: () => void;
    handlePythonCodeTypedOut: () => void;
    handleSendProjectMessage: () => void;
    onSendMessage: (message: string, type: MessageType) => void;
}

export function AnimatedInput({
    step,
    blockInput,
    sendButtonEnabled,
    showTooltip,
    userClickedBold,
    userClickedUnderline,
    userClickedItalic,
    handleGreetingPlaceholderTypedOut,
    handleBoldPlaceholderTypedOut,
    handleMathPromptTypedOut,
    handleMathFormulaTypedOut,
    handleCodePromptTypedOut,
    handlePythonCodeTypedOut,
    handleSendProjectMessage,
    onSendMessage,
}: AnimatedInputProps) {
    if (!step || step < 4 || (step > 18 && step < 28)) return null;
    const [userInput, setUserInput] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showSelectedText, setShowSelectedText] = useState(false);
    const [stressTooltip, setStressTooltip] = useState(false);
    const [stressSendButton, setStressButton] = useState(false);
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
        delay: 1000,
        onComplete: () => {
            setShowSelectedText(true);
            setIsMessageSent(false);
            if (step === 4.7) handleBoldPlaceholderTypedOut();
        },
        startTyping: step === 4.7,
    });

    const typedMathPrompt = useTypewriterEffect({
        text: "Please put together a sample project that uses the equation: ",
        speed: 50,
        delay: 1200,
        onComplete: () => {
            if (step === 8) handleMathPromptTypedOut();
        },
        startTyping: step === 8,
    });

    const typedMathFormula = useTypewriterEffect({
        text: "$Nat(C(-, X), F) cong F(X)$",
        speed: 50,
        delay: 1200,
        onComplete: () => {
            setIsMathBlock(true);
            setIsMessageSent(false);
            if (step === 8.2) handleMathFormulaTypedOut();
        },
        startTyping: step === 8.2,
    });

    const typedCodePrompt = useTypewriterEffect({
        text: "Write me the deletion function in Python that starts with: ",
        speed: 50,
        delay: 1200,
        onComplete: () => {
            setIsMessageSent(false);
            if (step === 9) handleCodePromptTypedOut();
        },
        startTyping: step === 9,
    });

    const typedPythonCode = useTypewriterEffect({
        text: pythonCodeSmall,
        speed: 50,
        delay: 1200,
        onComplete: () => {
            if (step === 9.2) handlePythonCodeTypedOut();
        },
        startTyping: step === 9.2,
    });

    const linkText = useTypewriterEffect({
        text: "https://thisaichatbot.com",
        speed: 90,
        delay: 3000,
        startTyping: step === 10,
    });

    const handleSendMessage = () => {
        if (!sendButtonEnabled) return;

        let messageType: MessageType;

        switch (safeStep) {
            case 4.5:
                messageType = "greeting";
                break;
            case 8.3:
                messageType = "math";
                break;
            case 9.3:
                messageType = "code";
                break;
            case 28:
                messageType = "project";
                break;
            default:
                messageType = "project";
        }

        if (messageType === "project") {
            handleSendProjectMessage();
        }
        onSendMessage(userInput, messageType);
        setIsMessageSent(true);
        setUserInput("");
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
            if (e.key === "ArrowRight" && !isMessageSent && sendButtonEnabled) {
                e.preventDefault();
                e.stopPropagation();
                setStressButton(true);

                setTimeout(() => setStressButton(false), 350);
            }
            if (e.key === "Enter") {
                handleSendMessage();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [safeStep, isMessageSent, userInput]);

    const MemoizedGrid = useMemo(() => <Grid />, []);

    return (
        <div className={css.panel}>
            {step === 36 && <ReplyPanel />}
            <div className={clsx(css.panel_wrapper, { [css.active]: isActive && animationDone })}>
                <div className={clsx(css.panel_main, { [css.blocked]: blockInput && step >= 24 })}>
                    <MagicMenu step={step} />
                    <div className={clsx(css.panel_input_container, { [css.hide]: isMessageSent })}>
                        <span className={clsx(css.static_text, { [css.grow]: blockInput })}>
                            <InputStaticText
                                step={safeStep}
                                isMessageSent={isMessageSent}
                                blockInput={blockInput}
                                showSelectedText={showSelectedText}
                                typedGreeting={typedGreeting}
                                typedPrompt={typedPrompt}
                                typedMathPrompt={typedMathPrompt}
                                typedMathFormula={typedMathFormula}
                                typedCodePrompt={typedCodePrompt}
                                typedPythonCode={typedPythonCode}
                                linkText={linkText}
                                userClickedBold={userClickedBold}
                                userClickedUnderline={userClickedUnderline}
                                userClickedItalic={userClickedItalic}
                                isMathBlock={isMathBlock}
                            />
                        </span>
                        {showTooltip && !isMessageSent && (step === 4.5 || step === 28) && (
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
                                // onKeyDown={(e) => {
                                //     if (e.key === "Enter" && !blockInput && userInput.trim()) {
                                //         handleSendMessage();
                                //     }
                                // }}
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
                        className={clsx(css.panel_submitBtn, {
                            [css.btn_stressed]: stressSendButton,
                            [css.btn_disabled]: !sendButtonEnabled,
                        })}
                        onAnimationEnd={() => setAnimationDone(true)}
                        onClick={handleSendMessage}
                        data-step="send"
                        disabled={!sendButtonEnabled}
                    >
                        Send <ArrowUpIcon />
                    </button>
                    <div className={css.panel_grid}>{MemoizedGrid}</div>
                </div>
            </div>
        </div>
    );
}
