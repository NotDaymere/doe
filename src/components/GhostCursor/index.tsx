import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { OnboardingStep } from "src/helpers/onboardingFlow";
import { useElementCursorPosition } from "src/hooks/useElementCursorPosition";
import CursorIcon from "src/shared/icons/Cursor.icon";
import { Tooltip } from "../Tooltip";
import css from "./GhostCursor.module.less";

interface GhostCursorProps {
    currentStep: OnboardingStep | undefined;
    handleCursorAcknowledged: () => void;
}

export function GhostCursor({ currentStep, handleCursorAcknowledged }: GhostCursorProps) {
    const { setCursorStopped, cursorMoving } = useCursor();
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const [clicked, setClicked] = useState(false);
    const [stressTooltip, setStressTooltip] = useState(false);

    const position = useElementCursorPosition({
        location: currentStep?.location,
        cursorPosition: currentStep?.cursorPosition,
        cursorCentered: currentStep?.cursorCentered,
        delay: currentStep?.cursorDelay,
    });

    useEffect(() => {
        if (currentStep?.id !== 3 && currentStep?.id !== 19.1 && currentStep?.id !== 21.1) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                if (currentStep?.id === 3) handleCursorAcknowledged?.();
                if (currentStep.id === 19.1 || currentStep.id === 21.1) {
                    setStressTooltip(true);

                    setTimeout(() => setStressTooltip(false), 1500);
                }
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentStep, handleCursorAcknowledged]);

    useEffect(() => {
        if (currentStep?.cursorClickPrevPosition) {
            setClicked(true);
            setTimeout(() => setClicked(false), 300);
        }
    }, [currentStep]);

    const cursorSpeed = currentStep?.cursorSpeed ?? 1000; // fallback to 1000ms

    const cursorPositionAndSpeed = {
        top: currentStep?.cursorCentered ? "50vh" : position.top,
        left: currentStep?.cursorCentered ? "50vw" : position.left,
        transition: `top ${cursorSpeed}ms ease, left ${cursorSpeed}ms ease`,
    };

    return (
        <div
            className={clsx(css.cursor, {
                [css.cursor_hidden]: !currentStep?.cursorVisible,
                [css.cursor_highlighted]: currentStep?.id === 3,
                [css.cursor_clicked]: clicked,
            })}
            style={cursorPositionAndSpeed}
            onTransitionEnd={() => {
                clearTimeout(transitionTimeoutRef.current);
                transitionTimeoutRef.current = setTimeout(() => {
                    setCursorStopped();

                    if (currentStep?.cursorClick) {
                        setClicked(true);
                        setTimeout(() => setClicked(false), 300);
                    }
                }, 100);
            }}
        >
            <CursorIcon className={css.cursor_icon} />
            {!cursorMoving && currentStep?.tooltip && (
                <Tooltip
                    key={currentStep.id}
                    stressed={stressTooltip}
                    position={currentStep?.tooltipPosition}
                    className={`highlight-step highlight-step-${currentStep.id}`}
                >
                    <div className={css.tooltip_content}>
                        {currentStep?.tooltipTitle}
                        {currentStep?.tooltipParagraph1}
                        {currentStep?.tooltipParagraph2}
                        {currentStep?.tooltipIcons}
                    </div>
                </Tooltip>
            )}
        </div>
    );
}
