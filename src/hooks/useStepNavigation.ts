import { useEffect } from "react";

export function useStepNavigation(
    step: number,
    nextStep: () => void,
    prevStep: () => void,
    setStep: (value: number) => void
) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (step >= 5 && step <= 7) {
                if (e.key === "ArrowRight") {
                    setStep(8);
                    return;
                }
                if (e.key === "ArrowLeft") {
                    prevStep();
                    return;
                }
            }
            if (step >= 1) {
                if (e.key === "ArrowRight") nextStep();
                if (e.key === "ArrowLeft") prevStep();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [step, nextStep, prevStep]);
}
