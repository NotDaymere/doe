export const splitText = (text: string) => {
    const lastDotIndex = text.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return { beforeLastDot: text, afterLastDot: "" };
    }
    const beforeLastDot = text.substring(0, lastDotIndex + 1);
    const afterLastDot = text.substring(lastDotIndex + 1);
    return { beforeLastDot, afterLastDot };
};
