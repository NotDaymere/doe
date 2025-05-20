import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { ReactComponent as Grid } from "src/assets/icons/dot-grid.svg";
import { OnboardingStep } from "src/helpers/onboardingFlow";
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
import css from "./OnboardingInput.module.less";

interface OnboardingInputProps {
    step?: number;
    currentStep?: OnboardingStep;
    manualSkip: boolean;
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
    handleBranchTypedOut: () => void;
    handleNewBranchClick: () => void;
    handleSendProjectMessage: () => void;
    handleTalkModeClick: () => void;
    handleScreenSharing: () => void;
    handleCloseScreenSharing: () => void;
    onSendMessage: (message: string, type: MessageType) => void;
}

export function OnboardingInput({
    step,
    currentStep,
    manualSkip,
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
    handleBranchTypedOut,
    handleNewBranchClick,
    handleSendProjectMessage,
    handleTalkModeClick,
    handleScreenSharing,
    handleCloseScreenSharing,
    onSendMessage,
}: OnboardingInputProps) {
    if (!step || step < 4 || (step > 18 && step < 28)) return null;
    const [userInput, setUserInput] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showSelectedText, setShowSelectedText] = useState(false);
    const [stressSendButton, setStressButton] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const safeStep = step ?? 0;

    const typedGreetingState = useTypewriterEffect({
        text: "Hey Doe, I'm John Smith",
        speed: 90,
        onComplete: handleGreetingPlaceholderTypedOut,
        startTyping: animationDone && safeStep <= 5,
    });

    const typedPromptState = useTypewriterEffect({
        text: "Write a song about ",
        speed: 100,
        delay: 1000,
        onComplete: () => {
            setShowSelectedText(true);
            setIsMessageSent(false);
            handleBoldPlaceholderTypedOut();
        },
        startTyping: step === 4.7,
    });

    const typedMathPromptState = useTypewriterEffect({
        text: "Please put together a sample project that uses the equation: ",
        speed: 50,
        delay: 1200,
        onComplete: () => {
            handleMathPromptTypedOut();
        },
        enableSkip: false,
        startTyping: step === 8,
        reset: step === 7 || step === 9 || manualSkip,
    });

    const typedMathFormulaState = useTypewriterEffect({
        text: "$Nat(C(-, X), F) cong F(X)$",
        speed: 50,
        delay: 1200,
        onComplete: () => {
            setIsMessageSent(false);
            handleMathFormulaTypedOut();
        },
        enableSkip: false,
        startTyping: step === 8.2,
        reset: step === 7 || step === 9 || manualSkip,
    });

    const typedCodePromptState = useTypewriterEffect({
        text: "Write me the deletion function in Python that starts with: ",
        speed: 50,
        delay: 1200,
        onComplete: () => {
            setIsMessageSent(false);
            handleCodePromptTypedOut();
        },
        enableSkip: false,
        startTyping: step === 9,
        reset: step === 8 || step === 10 || manualSkip,
    });

    const typedPythonCodeState = useTypewriterEffect({
        text: pythonCodeSmall,
        speed: 50,
        delay: 1200,
        onComplete: () => {
            handlePythonCodeTypedOut();
        },
        enableSkip: false,
        startTyping: step === 9.2,
        reset: step === 8 || step === 10 || manualSkip,
    });

    const typedBranchPromptState = useTypewriterEffect({
        text: "Create new branch",
        speed: 30,
        delay: 2000,
        onComplete: () => {
            // handleBranchTypedOut();
        },
        enableSkip: false,
        startTyping: step === 38,
        reset: step === 37,
    });

    const typedBranchState = useTypewriterEffect({
        text: "Create a simple project for me in any language.",
        speed: 50,
        delay: 2000,
        onComplete: () => {
            handleBranchTypedOut();
        },
        enableSkip: false,
        startTyping: step === 38.1,
        reset: step === 37,
    });

    const { text: linkText } = useTypewriterEffect({
        text: "https://thisaichatbot.com",
        speed: 90,
        delay: 3000,
        enableSkip: false,
        startTyping: step === 10,
        reset: step === 9 || step === 11,
    });

    const handleSendMessage = () => {
        if (!sendButtonEnabled || isMessageSent) return;

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
        setIsMessageSent(false);
    }, [step]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "ArrowRight" &&
                !isMessageSent &&
                currentStep?.stressSendButtonOnArrowRight
            ) {
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
        <div className={clsx(css.panel, { [css.panel_lowered]: step >= 28.1 })}>
            {step === 36 && <ReplyPanel />}
            <div
                className={clsx(css.panel_wrapper, {
                    [css.active]: isActive && animationDone && sendButtonEnabled,
                })}
            >
                <div className={clsx(css.panel_main, { [css.blocked]: blockInput && step >= 24 })}>
                    <MagicMenu
                        step={step}
                        handleTalkModeClick={handleTalkModeClick}
                        handleNewBranchClick={handleNewBranchClick}
                    />
                    <div className={clsx(css.panel_input_container, { [css.hide]: isMessageSent })}>
                        <span className={clsx(css.static_text, { [css.grow]: blockInput })}>
                            <InputStaticText
                                step={safeStep}
                                isMessageSent={isMessageSent}
                                blockInput={blockInput}
                                showSelectedText={showSelectedText}
                                typedGreeting={typedGreetingState}
                                typedPrompt={typedPromptState}
                                typedMathPrompt={typedMathPromptState}
                                typedMathFormula={typedMathFormulaState}
                                typedCodePrompt={typedCodePromptState}
                                typedPythonCode={typedPythonCodeState}
                                typedBranchPrompt={typedBranchPromptState}
                                typedBranch={typedBranchState}
                                linkText={linkText}
                                userClickedBold={userClickedBold}
                                userClickedUnderline={userClickedUnderline}
                                userClickedItalic={userClickedItalic}
                                isMathBlock={typedMathFormulaState.isDone}
                            />
                        </span>
                        {showTooltip && !isMessageSent && (step === 4.5 || step === 28) && (
                            <Tooltip position="top">
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
                                disabled={blockInput || isMessageSent}
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
                        onClick={handleScreenSharing}
                    >
                        <div className={css.panel_button_test} data-step="input">
                            <ScreenShareIcon className={css.panel_button_icon} />
                        </div>
                        {step === 52 && (
                            <ButtonAccordion handleCloseScreenSharing={handleCloseScreenSharing} />
                        )}
                    </button>
                    <button className={css.panel_button}>
                        <MicrophoneIcon />
                    </button>
                    <button
                        className={clsx(css.panel_submitBtn, {
                            [css.btn_stressed]: stressSendButton,
                            [css.btn_disabled]: !sendButtonEnabled || isMessageSent,
                        })}
                        onAnimationEnd={() => setAnimationDone(true)}
                        onClick={handleSendMessage}
                        data-step="send"
                        disabled={!sendButtonEnabled || isMessageSent}
                    >
                        Send <ArrowUpIcon />
                    </button>
                </div>
                <div className={css.panel_grid}>{MemoizedGrid}</div>
            </div>
        </div>
    );
}
