import { useEffect, useMemo } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { calcNextStep } from "src/helpers/navigator";
import { onboardingFlow } from "src/helpers/onboardingFlow";

export function useArrowNavigation(
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
) {
    const { setCursorMoving } = useCursor();
    const currentStep = useMemo(() => onboardingFlow.find((st) => st.id === step), [step]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();

            const dir = e.key === "ArrowRight" ? "right" : "left";

            if (dir === "right" && currentStep?.stressTooltipOnArrowRight) {
                return;
            }

            const next = calcNextStep(step, dir);
            if (next !== step) {
                setCursorMoving();
                setStep(next);
            }
        };

        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, [step, setStep, setCursorMoving]);
}
