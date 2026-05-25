export const generateBrightColor = (): string => {
    let hue = Math.floor(Math.random() * 360);
    if (hue > 50 && hue < 80) hue += 40;
    const saturation = Math.floor(70 + Math.random() * 30); // 70% - 100%
    const lightness = Math.floor(40 + Math.random() * 20); // 40% - 60%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const applyAlphaToHsl = (hsl: string, alpha: number): string => {
    const hslRegex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
    const match = hsl.match(hslRegex);

    if (!match) {
        throw new Error("Invalid HSL color format");
    }

    const [, h, s, l] = match;
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
};

export const increaseSaturation = (hsl: string, amount: number = 15): string => {
    const hslRegex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
    const match = hsl.match(hslRegex);

    if (!match) {
        throw new Error("Invalid HSL color format");
    }

    const [, h, s, l] = match;
    const newS = Math.min(100, Number(s) + amount);

    return `hsl(${Number(h) + 10}, ${newS}%, ${l}%)`;
};
