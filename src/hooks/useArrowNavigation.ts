import { useEffect } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { calcNextStep } from "src/helpers/navigator";
import { OnboardingStep } from "src/helpers/onboardingFlow";
import { OnboardingMessage } from "src/shared/types/Message";

export function useArrowNavigation(
    step: number,
    currentStep: OnboardingStep | undefined,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    ctx: {
        setMessages: React.Dispatch<React.SetStateAction<OnboardingMessage[]>>;
        setCursorMoving: () => void;
        setGaiaActive: (bool: boolean) => void;
        setBlockSteps: React.Dispatch<React.SetStateAction<boolean>>;
        setBlockInput: React.Dispatch<React.SetStateAction<boolean>>;
        setManualSkip: React.Dispatch<React.SetStateAction<boolean>>;
        setBlockAutoSkip: React.Dispatch<React.SetStateAction<boolean>>;
        setUserClickedBold: React.Dispatch<React.SetStateAction<boolean>>;
        setUserClickedUnderline: React.Dispatch<React.SetStateAction<boolean>>;
        setUserClickedItalic: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
    const { setCursorMoving } = useCursor();

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();

            const dir = e.key === "ArrowRight" ? "right" : "left";

            if (dir === "right" && currentStep?.stressTooltipOnArrowRight) {
                return;
            }

            const target = dir === "right" ? currentStep?.navigationOverrideStep : undefined;

            const next = target ?? calcNextStep(step, dir);
            if (next !== step) {
                if (target) {
                    ctx.setManualSkip(true);
                    currentStep?.onKeyboardSkip?.(ctx);
                }
                if (!currentStep?.keyboardSkipDelay) {
                    setCursorMoving();
                    setStep(next);
                } else {
                    setTimeout(() => {
                        setCursorMoving();
                        setStep(next);
                    }, currentStep.keyboardSkipDelay);
                }
            }
        };

        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [step, setStep, setCursorMoving]);
}
