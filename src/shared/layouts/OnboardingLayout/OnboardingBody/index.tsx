import clsx from "clsx";
import { AnimatedInput } from "src/components/AnimatedInput";
import { BranchBar } from "src/components/BranchBar";
import ChatHistory from "src/components/ChatHistory";
import { HistorySlider } from "src/components/HistorySlider";
import { MagicBox } from "src/components/MagicBox";
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
    blockInput: boolean;
    showTooltip: boolean;
    userClickedBold: boolean;
    userClickedUnderline: boolean;
    userClickedItalic: boolean;
    userClickedTranslate: boolean;
    startOnboardingFlow: () => void;
    handleLogoSlideComplete: () => void;
    handleWelcomeTextTypedOut: () => void;
    handleGreetingPlaceholderTypedOut: () => void;
    handleBoldPlaceholderTypedOut: () => void;
    handleMathPromptTypedOut: () => void;
    handleMathFormulaTypedOut: () => void;
    handleCodePromptTypedOut: () => void;
    handlePythonCodeTypedOut: () => void;
    handleUntranslatedTypedOut: () => void;
    handleVoiceMessageAppearing: () => void;
}

export function OnboardingBody(props: OnboardingBodyProps) {
    const {
        step,
        logoSlide,
        currentStep,
        messages,
        onSendMessage,
        blockInput,
        showTooltip,
        userClickedBold,
        userClickedUnderline,
        userClickedItalic,
        userClickedTranslate,
        startOnboardingFlow,
        handleLogoSlideComplete,
        handleWelcomeTextTypedOut,
        handleGreetingPlaceholderTypedOut,
        handleBoldPlaceholderTypedOut,
        handleMathPromptTypedOut,
        handleMathFormulaTypedOut,
        handleCodePromptTypedOut,
        handlePythonCodeTypedOut,
        handleUntranslatedTypedOut,
        handleVoiceMessageAppearing,
    } = props;

    return (
        <div
            onTransitionEnd={handleLogoSlideComplete}
            style={{ marginTop: `${getMarginTop(step, logoSlide)}%` }}
            className={clsx(css.layout_body, ...getBlurClasses(currentStep?.blur), {
                [css.end]: step >= 8,
                [css.tableOpen]: currentStep?.openTable,
            })}
        >
            <div className={css.layout_chat}>
                <HeaderSection
                    step={step}
                    startOnboardingFlow={startOnboardingFlow}
                    handleWelcomeTextTypedOut={handleWelcomeTextTypedOut}
                />

                <HistorySection
                    step={step}
                    messages={messages}
                    userClickedTranslate={userClickedTranslate}
                    handleUntranslatedTypedOut={handleUntranslatedTypedOut}
                    handleVoiceMessageAppearing={handleVoiceMessageAppearing}
                />

                <ReadyMessage
                    step={step}
                    handleWelcomeTextTypedOut={handleWelcomeTextTypedOut}
                    text="Okay, you are ready to start!"
                />
            </div>

            {(step <= 18 || step >= 28) && (
                <div
                    className={clsx(css.layout_input, {
                        [css.lower_height]: step >= 5,
                        [css.sm]: step >= 29,
                    })}
                >
                    <AnimatedInput
                        step={step}
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
                        onSendMessage={onSendMessage}
                    />
                </div>
            )}

            <MagicBox step={step} />
        </div>
    );
}

function HeaderSection({
    step,
    startOnboardingFlow,
    handleWelcomeTextTypedOut,
}: {
    step: number;
    startOnboardingFlow: () => void;
    handleWelcomeTextTypedOut: () => void;
}) {
    if (step >= 31) return null;
    return (
        <WelcomeHeader
            step={step}
            startOnboardingFlow={startOnboardingFlow}
            handleWelcomeTextTypedOut={handleWelcomeTextTypedOut}
            text="Welcome to Doe, let’s get to know each other."
        />
    );
}

function HistorySection({
    step,
    messages,
    userClickedTranslate,
    handleUntranslatedTypedOut,
    handleVoiceMessageAppearing,
}: {
    step: number;
    messages: OnboardingMessage[];
    userClickedTranslate: boolean;
    handleUntranslatedTypedOut: () => void;
    handleVoiceMessageAppearing: () => void;
}) {
    if (step >= 40 && step <= 42) {
        return (
            <>
                <BranchBar withDots step={step} />
                <div className={css.layout_history} data-step="history">
                    <HistorySlider messages={messages} step={step} />
                </div>
            </>
        );
    }
    return (
        <div className={css.layout_history} data-step="history">
            <ChatHistory
                messages={messages}
                step={step}
                userClickedTranslate={userClickedTranslate}
                handleUntranslatedTypedOut={handleUntranslatedTypedOut}
                handleVoiceMessageAppearing={handleVoiceMessageAppearing}
            />
        </div>
    );
}

function getMarginTop(step: number, logoSlide: boolean) {
    if (step >= 29) return 0;
    if (step <= 4.5) return logoSlide ? 10 : 18;
    return 5;
}
