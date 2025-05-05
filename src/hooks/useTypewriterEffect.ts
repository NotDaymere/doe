import { useEffect, useRef, useState } from "react";

interface UseTypewriterEffectOptions {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
    startTyping?: boolean;
    enableSkip?: boolean;
    onSkip?: () => void;
}

export function useTypewriterEffect({
    text,
    speed = 100,
    delay = 0,
    onComplete,
    startTyping = true,
    enableSkip = true,
    onSkip,
}: UseTypewriterEffectOptions) {
    const [displayText, setDisplayText] = useState("");
    const [isDone, setIsDone] = useState(false);

    const indexRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const previousTextRef = useRef<string | null>(null);

    const finishImmediately = () => {
        if (isDone) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setDisplayText(text);
        setIsDone(true);
        onSkip?.();
        onComplete?.();
    };

    useEffect(() => {
        if (!startTyping || text.length === 0 || previousTextRef.current === text) return;

        setDisplayText("");
        setIsDone(false);
        indexRef.current = 0;
        previousTextRef.current = text;

        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                indexRef.current += 1;
                setDisplayText((prev) => text.substring(0, prev.length + 1));
                if (indexRef.current >= text.length) {
                    finishImmediately();
                }
            }, speed);
        }, delay);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [text, speed, delay, startTyping]);

    useEffect(() => {
        if (!enableSkip) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!startTyping || isDone) return;
            if (e.key === "ArrowRight") {
                e.preventDefault();
                e.stopPropagation();
                finishImmediately();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [enableSkip, startTyping, isDone]);

    return { text: displayText, isDone, skip: finishImmediately };
}
