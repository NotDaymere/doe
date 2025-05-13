import { useEffect, useRef } from "react";
import { onboardingFlow } from "src/helpers/onboardingFlow";
import { OnboardingMessage } from "src/shared/types/Message";

export function useStepEffects(
    step: number,
    nextStep: () => void,
    nextSubStep: () => void,
    ctx: {
        setMessages: React.Dispatch<React.SetStateAction<OnboardingMessage[]>>;
        setCursorMoving: () => void;
        setGaiaActive: (bool: boolean) => void;
        setBlockSteps: React.Dispatch<React.SetStateAction<boolean>>;
        setBlockInput: React.Dispatch<React.SetStateAction<boolean>>;
        setManualSkip: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
    const prevStepRef = useRef<number>(step);

    useEffect(() => {
        if (step === prevStepRef.current) return;

        //  exit handler for previous step
        const prev = onboardingFlow.find((s) => s.id === prevStepRef.current);
        prev?.onExit?.(ctx);

        //  enter handler for current step
        const curr = onboardingFlow.find((s) => s.id === step);
        curr?.onEnter?.(ctx);

        console.log("curr: ", curr);
        /** auto‑skip */
        if (curr?.autoSkip) {
            const t = setTimeout(() => nextStep(), curr.autoSkip);
            console.log("t: ", t);
            return () => clearTimeout(t);
        } else if (curr?.autoSkipSubStep) {
            const t = setTimeout(() => nextSubStep(), curr.autoSkipSubStep);
            return () => clearTimeout(t);
        }

        prevStepRef.current = step;
    }, [step, ctx]);
}
