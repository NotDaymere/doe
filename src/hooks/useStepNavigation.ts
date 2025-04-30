import { useEffect } from "react";
import { useCursor } from "src/contexts/CursorContext";

export function useStepNavigation(
    step: number,
    nextStep: () => void,
    prevStep: () => void,
    nextSubStep: () => void,
    prevSubStep: () => void,
    setStep: (value: number) => void
) {
    const { setCursorMoving } = useCursor();
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (step >= 8 && step <= 8.3) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    console.log("out");
                    if (step === 8.3) {
                        setStep(9);
                    } else {
                        console.log("in");
                        nextSubStep();
                    }
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    if (step === 8) {
                        prevStep();
                    } else {
                        prevSubStep();
                    }
                }
            } else if (step >= 1) {
                console.log("test");
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
