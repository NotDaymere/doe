import clsx from "clsx";
import { BranchBar } from "src/components/BranchBar";
import { HistorySlider } from "src/components/HistorySlider";
import { MagicBox } from "src/components/MagicBox";
import OnboardingChatHistory from "src/components/OnboardingChatHistory";
import { OnboardingInput } from "src/components/OnboardingInput";
import { ReadyMessage } from "src/components/ReadyMessage";
import { WelcomeHeader } from "src/components/WelcomeHeader";
import { getBlurClasses } from "src/helpers/getBlurClasses";
import { OnboardingStep } from "src/helpers/onboardingFlow";
import { MessageType } from "src/hooks/useChat";
import { OnboardingMessage } from "src/shared/types/Message";
import css from "../OnboardingLayout.module.less";

interface OnboardingBodyProps {
    step: number;
    logoSlide: boolean;
    currentStep?: OnboardingStep;
    messages: OnboardingMessage[];
    onSendMessage: (message: string, type: MessageType) => void;
    manualSkip: boolean;
    blockInput: boolean;
    showTooltip: boolean;
    userClickedBold: boolean;
    userClickedUnderline: boolean;
    userClickedItalic: boolean;
    startOnboardingFlow: () => void;
    handleLogoSlideComplete: () => void;
    handleWelcomeTextTypedOut: () => void;
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
    handleFirstReadyMessage: () => void;
    handleSecondReadyMessage: () => void;
    setStep: (value: number) => void;
}

export function OnboardingBody(props: OnboardingBodyProps) {
    const {
        step,
        logoSlide,
        currentStep,
        messages,
        onSendMessage,
        manualSkip,
        blockInput,
        showTooltip,
        userClickedBold,
        userClickedUnderline,
        userClickedItalic,
        startOnboardingFlow,
        handleLogoSlideComplete,
        handleWelcomeTextTypedOut,
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
        handleFirstReadyMessage,
        handleSecondReadyMessage,
        setStep,
    } = props;

    return (
        <div
            onTransitionEnd={handleLogoSlideComplete}
            className={clsx(css.layout_body, ...getBlurClasses(currentStep?.blur), {
                [css.end]: step >= 8,
                [css.tableOpen]: currentStep?.openTable,
                [css.gap]: step >= 28.1 && step < 58,
                [css.blur_top]: step >= 58,
                [css.centered]: step >= 60,
            })}
        >
            <div
                className={clsx(css.layout_chat, {
                    // [css.centered]: step >= 60,
                    [css.chat_end]: step >= 8,
                    [css.chat_top]: step >= 40 && step <= 43,
                })}
            >
                {step < 31 && (
                    <WelcomeHeader
                        step={step}
                        logoSlide={logoSlide}
                        startOnboardingFlow={startOnboardingFlow}
                        handleWelcomeTextTypedOut={handleWelcomeTextTypedOut}
                        text="Welcome to Doe, let’s get to know each other."
                        handleLogoSlideComplete={handleLogoSlideComplete}
                    />
                )}

                {step >= 40 && step <= 43 ? (
                    <>
                        <div className={css.branch_bar_wrapper}>
                            <BranchBar withDots step={step} />
                        </div>
                        <div className={css.layout_history} data-step="history">
                            <HistorySlider messages={messages} step={step} />
                        </div>
                    </>
                ) : (
                    <div className={css.layout_history} data-step="history">
                        <OnboardingChatHistory messages={messages} step={step} setStep={setStep} />
                    </div>
                )}

                <ReadyMessage
                    step={step}
                    handleWelcomeTextTypedOut={handleWelcomeTextTypedOut}
                    handleFirstReadyMessage={handleFirstReadyMessage}
                    handleSecondReadyMessage={handleSecondReadyMessage}
                    text="Okay, you are ready to start!"
                />
            </div>

            {(step <= 18 || step >= 28) && (
                <div className={css.layout_input}>
                    <OnboardingInput
                        step={step}
                        currentStep={currentStep}
                        manualSkip={manualSkip}
                        blockInput={blockInput}
                        showTooltip={showTooltip}
                        userClickedBold={userClickedBold}
                        userClickedUnderline={userClickedUnderline}
                        userClickedItalic={userClickedItalic}
                        sendButtonEnabled={currentStep?.sendButtonEnabled}
                        handleGreetingPlaceholderTypedOut={handleGreetingPlaceholderTypedOut}
                        handleBoldPlaceholderTypedOut={handleBoldPlaceholderTypedOut}
                        handleMathPromptTypedOut={handleMathPromptTypedOut}
                        handleMathFormulaTypedOut={handleMathFormulaTypedOut}
                        handleCodePromptTypedOut={handleCodePromptTypedOut}
                        handlePythonCodeTypedOut={handlePythonCodeTypedOut}
                        handleSendProjectMessage={handleSendProjectMessage}
                        handleBranchTypedOut={handleBranchTypedOut}
                        handleNewBranchClick={handleNewBranchClick}
                        handleTalkModeClick={handleTalkModeClick}
                        handleScreenSharing={handleScreenSharing}
                        handleCloseScreenSharing={handleCloseScreenSharing}
                        onSendMessage={onSendMessage}
                    />
                </div>
            )}

            <MagicBox step={step} />
        </div>
    );
}
