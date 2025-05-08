import { useCallback, useState } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { OnboardingMessage } from "src/shared/types/Message";
import { useArrowNavigation } from "./useArrowNavigation";
import { useStepEffects } from "./useStepEffects";

export function useOnboardingFlow(
    setMessages: React.Dispatch<React.SetStateAction<OnboardingMessage[]>>
) {
    const { setCursorMoving } = useCursor();
    const [step, setStep] = useState(0);
    const [logoSlide, setLogoSlide] = useState(false);
    const [blockInput, setBlockInput] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const [userClickedBold, setUserClickedBold] = useState(false);
    const [userClickedUnderline, setUserClickedUnderline] = useState(false);
    const [userClickedItalic, setUserClickedItalic] = useState(false);
    const [userClickedTranslate, setUserClickedTranslate] = useState(false);
    const [blockSteps, setBlockSteps] = useState(false);

    // --- Step Navigation ---

    const nextStep = useCallback(() => {
        if (blockSteps) return;

        setStep((prev) => Math.min(prev + 1, 60));
    }, [blockSteps]);

    const nextSubStep = useCallback(() => {
        if (blockSteps) return;

        setStep((prev) => parseFloat((prev + 0.1).toFixed(1)));
    }, [blockSteps]);

    // listener for arrow keys to navigate through the steps
    useArrowNavigation(step, setStep);

    // ------ HANDLERS IN ORDER ------

    // STEP 1 — show welcome text and prepare flow (starts automatically)
    function startOnboardingFlow() {
        if (step <= 1) setStep(1);
    }

    // STEP 2 — after welcome text typed out, slide logo
    function handleWelcomeTextTypedOut() {
        if (step <= 3) setStep(2);
        setTimeout(() => {
            setLogoSlide(true);
        }, 1500);
    }

    // STEP 3 — after logo slide completes, wait for cursor acknowledgment
    function handleLogoSlideComplete() {
        if (step < 3) {
            setTimeout(() => {
                setStep(3);
            }, 10);
        }
    }

    // STEP 4 — input appearing and placeholder input text is being typed out
    function handleCursorAcknowledged() {
        nextStep();
        setBlockSteps(true);
    }

    // #5 -> placeholder text is typed out, waiting for user input
    function handleGreetingPlaceholderTypedOut() {
        setTimeout(() => {
            if (step < 5) setStep(4.5);
            setShowTooltip(true);
            setBlockInput(false);
        }, 1200);
    }

    // #6 -> sidebar opening; navigation appearing next
    function handleSidebarOpen() {
        if (step < 4.7) {
            setTimeout(() => {
                setStep(4.6);
                setMessages?.([]);
                setBlockInput(true);
            }, 1000);
        }
    }

    // #7 -> navigation animation over; typing out text for demonstrating sidebar buttons
    function handleNavigationAnimation() {
        if (step < 4.7) {
            setTimeout(() => {
                setStep(4.7);
            }, 3000);
        }
    }

    // #8 -> text is typed out, cursor going to sidebar to show sidebar buttons functionality
    function handleBoldPlaceholderTypedOut() {
        setCursorMoving();
        setBlockSteps(false);
        setBlockInput(true);
        setTimeout(() => setStep(5), 100);
    }

    function handleMathPromptTypedOut() {
        setStep(8.1);
    }

    function handleMathFormulaTypedOut() {
        setStep(8.3);
    }

    function handleCodePromptTypedOut() {
        setStep(9.1);
    }

    function handlePythonCodeTypedOut() {
        setStep(9.3);
    }

    function handleUntranslatedTypedOut() {
        setBlockSteps(true);
        setStep(19.1);
    }

    function handleBranchTypedOut() {
        setTimeout(() => {
            setStep(39);
        }, 2000);
    }

    function handleVoiceMessageAppearing() {
        setBlockSteps(true);
        setStep(21.1);
    }

    function handleSendProjectMessage() {
        setStep(28.1);
    }

    function handleTalkModeClick() {
        setStep(46);
    }

    function handleScreenSharing() {
        setStep(52);
    }

    function handleCloseScreenSharing() {
        setStep(53);
    }

    function handleFirstReadyMessage() {
        setStep(59);
    }

    function handleSecondReadyMessage() {
        setStep(60);
    }

    // ------ OTHER HANDLERS ------

    function handleUserClickedSidebarButton(type: string) {
        if (type === "bold") {
            setUserClickedBold((prev) => !prev);
            setTimeout(() => {
                setCursorMoving();
                nextStep();
            }, 1000);
        } else if (type === "italic") {
            setUserClickedItalic((prev) => !prev);
            setTimeout(() => {
                setCursorMoving();
                nextStep();
            }, 1000);
        } else if (type === "underline") {
            setUserClickedUnderline((prev) => !prev);
            setTimeout(() => {
                setCursorMoving();
                nextStep();
            }, 1000);
        } else if (type === "math") {
            nextSubStep();
        } else if (type === "code") {
            nextSubStep();
        } else if (type === "translate") {
            setUserClickedTranslate(true);
            setStep(19.2);
            setBlockSteps(false);
        } else if (type === "transcribe") {
            setStep(21.2);
            setBlockSteps(false);
        }
    }

    function handleSidebarClose() {
        setStep(18);
        setBlockInput(true);
    }

    // ------ STEP-SPECIFIC EFFECTS ------

    useStepEffects(step, setMessages, nextStep, nextSubStep, setBlockInput, setBlockSteps);

    return {
        // Step number, changing step
        step,
        nextStep,
        setStep,

        // Start onboarding
        startOnboardingFlow, // #1
        handleWelcomeTextTypedOut, // #2
        handleLogoSlideComplete, // #3
        handleCursorAcknowledged, // #4
        handleGreetingPlaceholderTypedOut, // #5
        handleSidebarOpen, // #6
        handleNavigationAnimation, // #7
        handleBoldPlaceholderTypedOut, // #8
        handleMathPromptTypedOut,
        handleMathFormulaTypedOut,
        handleCodePromptTypedOut,
        handlePythonCodeTypedOut,
        handleUntranslatedTypedOut,
        handleVoiceMessageAppearing,
        handleSendProjectMessage,
        handleBranchTypedOut,
        handleTalkModeClick,
        handleScreenSharing,
        handleCloseScreenSharing,
        handleFirstReadyMessage,
        handleSecondReadyMessage,

        handleSidebarClose,

        logoSlide,
        blockInput,
        showTooltip,

        // Sidebar button clicks (not necessary)
        userClickedBold,
        userClickedUnderline,
        userClickedItalic,
        userClickedTranslate,
        handleUserClickedSidebarButton,
        setBlockSteps,
        blockSteps,
    };
}
