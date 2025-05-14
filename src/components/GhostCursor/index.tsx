import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
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
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                if (currentStep?.id === 3) handleCursorAcknowledged?.();
                if (currentStep?.stressTooltipOnArrowRight) {
                    e.preventDefault();
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

    const tooltipPositionOverride = useMemo(() => {
        if (currentStep?.overrideTooltipPosition) {
            const element = document.querySelector(currentStep?.overrideTooltipPosition);
            const rect = element?.getBoundingClientRect();
            return {
                top: rect?.bottom,
                left: rect?.right,
            };
        }
        return null;
    }, [currentStep?.overrideTooltipPosition]);

    return (
        <>
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
                {!cursorMoving && currentStep?.tooltip && !currentStep?.overrideTooltipPosition && (
                    <Tooltip
                        key={currentStep.id}
                        stressed={stressTooltip}
                        position={currentStep?.tooltipPosition}
                        className={`highlight-step highlight-step-${currentStep.id} ${
                            currentStep.id >= 25 && currentStep.id <= 26 ? "continuous" : ""
                        }`}
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

            {/* tooltip on overrideTooltipPosition location */}
            {!cursorMoving && currentStep?.overrideTooltipPosition && (
                <div
                    className={clsx(css.tooltip_override, {
                        [`tooltip_${currentStep.location}`]: currentStep.overrideTooltipPosition,
                    })}
                    style={{
                        top: tooltipPositionOverride?.top,
                        left: 40,
                    }}
                >
                    <Tooltip
                        stressed={stressTooltip}
                        position="right"
                        className={`highlight-step highlight-step-${currentStep.id}`}
                    >
                        <div className={css.tooltip_content}>
                            {currentStep?.tooltipTitle}
                            {currentStep?.tooltipParagraph1}
                            {currentStep?.tooltipParagraph2}
                            {currentStep?.tooltipIcons}
                        </div>
                    </Tooltip>
                </div>
            )}
        </>
    );
}
