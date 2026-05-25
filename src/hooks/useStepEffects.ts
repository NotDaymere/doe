import { useEffect, useRef } from "react";
import { onboardingFlow } from "src/helpers/onboardingFlow";
import { OnboardingMessage } from "src/shared/types/Message";

export function useStepEffects(
    step: number,
    nextStep: () => void,
    nextSubStep: () => void,
    blockAutoSkip: boolean,
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

        if (curr?.canPreventAutoSkip && blockAutoSkip) {
            prevStepRef.current = step;
            return;
        }

        if (curr?.newAutoSkip && blockAutoSkip) {
            const t = setTimeout(() => nextStep(), curr.newAutoSkip);
            prevStepRef.current = step;
            // setBlockAutoSkip(false);
            return () => clearTimeout(t);
        }

        /** auto‑skip */
        if (curr?.autoSkip) {
            const t = setTimeout(() => nextStep(), curr.autoSkip);
            return () => clearTimeout(t);
        } else if (curr?.autoSkipSubStep) {
            const t = setTimeout(() => nextSubStep(), curr.autoSkipSubStep);
            return () => clearTimeout(t);
        }

        prevStepRef.current = step;
    }, [step, ctx]);
}
