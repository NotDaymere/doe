import { useEffect, useState } from "react";

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
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!startTyping || text.length === 0) return;

        setDisplayText("");
        setIndex(0);

        const typingInterval = setInterval(() => {
            setDisplayText((prev) => text.substring(0, prev.length + 1));
            setIndex((prevIndex) => {
                if (prevIndex + 1 >= text.length) {
                    clearInterval(typingInterval);
                    if (onComplete) onComplete();
                }
                return prevIndex + 1;
            });
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed, startTyping]);

    return displayText;
}
