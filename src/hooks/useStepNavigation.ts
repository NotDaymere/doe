import { useEffect } from "react";
import { useCursor } from "src/contexts/CursorContext";

export function useStepNavigation(
    step: number,
    nextStep: () => void,
    prevStep: () => void,
    setStep: (value: number) => void
) {
    const { setCursorMoving } = useCursor();
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (step >= 1) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    nextStep();
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    prevStep();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [step, nextStep, prevStep]);
}
