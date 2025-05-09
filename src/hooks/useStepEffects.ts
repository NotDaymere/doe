import { useEffect, useRef } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { onboardingFlow } from "src/helpers/onboardingFlow";
import { useAppStore } from "src/shared/providers";
import { OnboardingMessage } from "src/shared/types/Message";

export function useStepEffects(
    step: number,
    setMessages: React.Dispatch<React.SetStateAction<OnboardingMessage[]>>,
    nextStep: () => void,
    nextSubStep: () => void,
    setBlockSteps: (b: boolean) => void,
    setBlockInput: React.Dispatch<React.SetStateAction<boolean>>
) {
    const { setCursorMoving } = useCursor();
    const { setGaiaActive } = useAppStore();

    const prevStepRef = useRef<number>(step);

    useEffect(() => {
        if (step === prevStepRef.current) return;
        const ctx = {
            setMessages,
            setCursorMoving,
            setGaiaActive,
            setBlockSteps,
            setBlockInput,
        };

        //  exit handler for previous step
        const prev = onboardingFlow.find((s) => s.id === prevStepRef.current);
        prev?.onExit?.(ctx);

        //  enter handler for current step
        const curr = onboardingFlow.find((s) => s.id === step);
        curr?.onEnter?.(ctx);

        /** auto‑skip */
        if (curr?.autoSkip) {
            const t = setTimeout(() => nextStep(), curr.autoSkip);
            return () => clearTimeout(t);
        } else if (curr?.autoSkipSubStep) {
            const t = setTimeout(() => nextSubStep(), curr.autoSkipSubStep);
            return () => clearTimeout(t);
        }

        prevStepRef.current = step;
    }, [step, setMessages, setCursorMoving, setGaiaActive, setBlockInput, setBlockSteps]);
}
