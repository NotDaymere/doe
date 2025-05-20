import React from "react";
import { ReflectionsMessage } from "./ReflectionsMessage";

interface LatestMessageInfoProps {
    messages: ReflectionsMessage[];
}

const LatestMessageInfo: React.FC<LatestMessageInfoProps> = ({ messages }) => {
    const standardDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayAbbr = new Date().toLocaleDateString("en-US", { weekday: "short" });
    const baseDate = "1970-01-01";

    const getLatestMessage = (): ReflectionsMessage | null => {
        if (messages.length === 0) return null;
        const dayIndexMap = standardDays.reduce(
            (acc, day, index) => ({ ...acc, [day]: index }),
            {} as Record<string, number>
        );
        const now = new Date();
        const nowTime = new Date(
            `${baseDate} ${now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })}`
        ).getTime();
        const currentIndex = dayIndexMap[todayAbbr];

        let best = messages[0];
        let bestDiff = Number.MAX_SAFE_INTEGER;

        messages.forEach((msg) => {
            const msgIndex = dayIndexMap[msg.day];
            const msgTime = new Date(`${baseDate} ${msg.time}`).getTime();
            let dayDiff = currentIndex - msgIndex;
            if (dayDiff < 0) dayDiff += 7;
            let diff = dayDiff * 24 * 60 * 60 * 1000 + (nowTime - msgTime);
            if (diff < 0) diff += 7 * 24 * 60 * 60 * 1000;
            if (diff < bestDiff) {
                bestDiff = diff;
                best = msg;
            }
        });
        return best;
    };

    const latestMsg = getLatestMessage();
    const resultText = latestMsg
        ? `Latest ${latestMsg.day === todayAbbr ? "Today" : latestMsg.day}, ${latestMsg.time}`
        : "Latest";

    return <span>{resultText}</span>;
};

export default LatestMessageInfo;
