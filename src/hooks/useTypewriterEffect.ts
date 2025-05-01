import { useEffect, useRef, useState } from "react";

interface UseTypewriterEffectOptions {
    text: string;
    speed?: number;
    onComplete?: () => void;
    startTyping?: boolean;
}

export function useTypewriterEffect({
    text,
    speed = 100,
    onComplete,
    startTyping = true,
}: UseTypewriterEffectOptions) {
    const [displayText, setDisplayText] = useState("");
    const indexRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const previousTextRef = useRef<string | null>(null);

    useEffect(() => {
        if (!startTyping || text.length === 0 || previousTextRef.current === text) return;

        setDisplayText("");
        indexRef.current = 0;
        previousTextRef.current = text;

        intervalRef.current = setInterval(() => {
            indexRef.current += 1;
            setDisplayText((prev) => text.substring(0, prev.length + 1));
            if (indexRef.current >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed, startTyping]);

    return displayText;
}
