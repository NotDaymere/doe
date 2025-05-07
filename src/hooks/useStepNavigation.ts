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
                    if (step === 8.3) {
                        setStep(9);
                    } else {
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
            } else if (step >= 9 && step <= 9.3) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    if (step === 9.3) {
                        setStep(10);
                    } else {
                        nextSubStep();
                    }
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    if (step === 9) {
                        prevStep();
                    } else {
                        prevSubStep();
                    }
                }
            } else if (step === 13) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    nextStep();
                }
                if (e.key === "ArrowLeft") {
                    setStep(11);
                }
            } else if (step >= 18 && step <= 18.9) {
                if (e.key === "ArrowRight") {
                    if (step === 18.4) {
                        setCursorMoving();
                        setStep(19);
                    } else if (step === 18) {
                        setStep(18.1);
                    } else {
                        setStep(18.4);
                    }
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    setStep(16);
                }
            } else if (step >= 19 && step <= 19.2) {
                if (e.key === "ArrowRight") {
                    if (step === 19.2) {
                        setStep(20);
                    } else {
                        nextSubStep();
                    }
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    if (step === 19) {
                        setStep(17);
                    } else {
                        prevSubStep();
                    }
                }
            } else if (step >= 21 && step <= 21.2) {
                if (e.key === "ArrowRight") {
                    if (step === 21.2) {
                        setStep(22);
                    } else {
                        nextSubStep();
                    }
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    if (step === 21) {
                        setStep(20);
                    } else {
                        prevSubStep();
                    }
                }
            } else if (step === 22) {
                if (e.key === "ArrowRight") {
                    setStep(22.1);
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    prevStep();
                }
            } else if (step === 22.1) {
                if (e.key === "ArrowRight") {
                    setStep(23);
                }
                if (e.key === "ArrowLeft") {
                    setStep(21);
                }
            } else if (step === 28.1) {
                if (e.key === "ArrowRight") {
                    setStep(30);
                }
                if (e.key === "ArrowLeft") {
                    setStep(28);
                }
            } else if (step >= 38 && step <= 38.1) {
                if (e.key === "ArrowRight") {
                    if (step === 38.1) {
                        setStep(39);
                    } else {
                        nextSubStep();
                    }
                }
                if (e.key === "ArrowLeft") {
                    setStep(36);
                }
            } else if (step === 39) {
                if (e.key === "ArrowRight") {
                    nextStep();
                }
                if (e.key === "ArrowLeft") {
                    setStep(36);
                }
            } else if (step >= 46 && step <= 48) {
                if (e.key === "ArrowRight") {
                    if (step === 48) {
                        setStep(49);
                    } else {
                        setStep(48);
                    }
                }
                if (e.key === "ArrowLeft") {
                    setStep(45);
                }
            } else if (step === 51) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    nextStep();
                }
                if (e.key === "ArrowLeft") {
                    setStep(49);
                }
            } else if (step === 55) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    nextStep();
                }
                if (e.key === "ArrowLeft") {
                    setStep(53);
                }
            } else if (step >= 1) {
                if (e.key === "ArrowRight") {
                    setCursorMoving();
                    nextStep();
                }
                if (e.key === "ArrowLeft") {
                    setCursorMoving();
                    prevStep();
                    if (step === 19) setStep(16);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [step, nextStep, prevStep]);
}
