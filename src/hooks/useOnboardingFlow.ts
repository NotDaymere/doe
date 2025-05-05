import { useCallback, useEffect, useState } from "react";
import { useCursor } from "src/contexts/CursorContext";
import {
    transcribeText,
    translation,
    translationOrigin,
    translationOriginTranscribed,
} from "src/helpers/onboardingMessages";
import { useAppStore } from "src/shared/providers";
import { OnboardingMessage } from "src/shared/types/Message";
import { useStepNavigation } from "./useStepNavigation";

export function useOnboardingFlow(
    setMessages?: React.Dispatch<React.SetStateAction<OnboardingMessage[]>>
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
    const [userClickedTranscribe, setUserClickedTranscribe] = useState(false);
    const [blockSteps, setBlockSteps] = useState(false);
    const { gaiaActive, setGaiaActive } = useAppStore();

    // --- Step Navigation ---

    const nextStep = useCallback(() => {
        if (blockSteps) return;

        setStep((prev) => Math.min(prev + 1, 60));
    }, [blockSteps]);

    const nextSubStep = useCallback(() => {
        if (blockSteps) return;

        setStep((prev) => parseFloat((prev + 0.1).toFixed(1)));
    }, [blockSteps]);

    const prevStep = useCallback(() => {
        if (blockSteps) return;

        setStep((prev) => Math.max(prev - 1, 5));
    }, [blockSteps]);

    const prevSubStep = useCallback(() => {
        if (blockSteps) return;

        setStep((prev) => parseFloat((prev - 0.1).toFixed(1)));
    }, [blockSteps]);

    // listener for arrow keys to navigate through the steps
    useStepNavigation(step, nextStep, prevStep, nextSubStep, prevSubStep, setStep);

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
        setBlockSteps(false);
        setBlockInput(true);
        setCursorMoving();
        setTimeout(() => setStep(5), 100);
    }

    function handleMathPromptTypedOut() {
        setCursorMoving();
        setStep(8.1);
    }

    function handleMathFormulaTypedOut() {
        setStep(8.3);
    }

    function handleCodePromptTypedOut() {
        setCursorMoving();
        setStep(9.1);
    }

    function handlePythonCodeTypedOut() {
        setStep(9.3);
    }

    function handleUntranslatedTypedOut() {
        setBlockSteps(true);
        setStep(19.1);
    }

    function handleVoiceMessageAppearing() {
        setBlockSteps(true);
        setStep(21.1);
    }

    function handleSendProjectMessage() {
        setStep(28.1);
    }

    // ------ OTHER HANDLERS ------

    function handleUserClickedSidebarButton(type: string) {
        if (type === "bold") {
            setUserClickedBold((prev) => !prev);
        } else if (type === "italic") {
            setUserClickedItalic((prev) => !prev);
        } else if (type === "underline") {
            setUserClickedUnderline((prev) => !prev);
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

    function handleDeleteMessages() {
        setMessages?.([]);
    }

    function handleAddGreetingMessages() {
        setBlockInput(false);
        setMessages?.([
            { role: "user", content: `Hey Doe, I'm John Smith`, noTypeEffect: true },
            { role: "ai", content: `Hey, John Smith, I'm Doe!`, noTypeEffect: true },
            { role: "ai", content: `Let me introduce my main functionality.`, noTypeEffect: true },
        ]);
    }

    // ------ STEP-SPECIFIC EFFECTS ------

    useEffect(() => {
        if (step === 7) {
            handleDeleteMessages();
        }

        if (step === 9) {
            setMessages?.([]);
        }
        if (step === 10) {
            handleDeleteMessages();
        }
        if (step === 12) {
            setBlockSteps(true);
            setTimeout(() => {
                nextStep();
                setBlockSteps(false);
            }, 500);
        }
        if (step === 18) {
            handleDeleteMessages();
        }
        if (step >= 18.1 && step < 18.4) {
            setTimeout(() => {
                nextSubStep();
            }, 1100);
        }
        if (step === 19) {
            setMessages?.([
                {
                    role: "ai",
                    content: translation,
                    origin: translationOrigin,
                    originTranscribed: translationOriginTranscribed,
                },
            ]);
        }
        if (step === 21) {
            setMessages?.([
                {
                    role: "ai",
                    recording: true,
                    content: transcribeText,
                },
            ]);
        }
        if (step === 25) {
            handleDeleteMessages();
        }
        if (step === 26) {
            setGaiaActive(false);
            handleDeleteMessages();
        }
        if (step === 27 && !gaiaActive) {
            handleAddGreetingMessages();
            setBlockInput(false);
            setTimeout(() => {
                setGaiaActive(true);
            }, 1100);
        }
        if (step === 28) {
            setGaiaActive(false);
        }
        if (step === 29) {
            setBlockInput(true);
        }
        if (step === 37) {
            setTimeout(() => {
                nextStep();
            }, 2000);
        }
        if (step === 40) {
            setMessages?.((prev) => prev.slice(-2));
        }
        if (step === 46) {
            setTimeout(() => {
                nextStep();
            }, 1000);
        }
        if (step === 47) {
            setTimeout(() => {
                nextStep();
            }, 1000);
        }
        if (step === 50) {
            setTimeout(() => {
                nextStep();
            }, 500);
        }
        if (step === 54) {
            setTimeout(() => {
                nextStep();
            }, 500);
        }
    }, [step, setMessages]);

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
    };
}
