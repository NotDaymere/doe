export type PuzzleProps = {
    category?: "Identity" | "Preferences" | "Knowledge" | "Intent" | "Cognition" | null;
    isColored: boolean;
    isPlaceholder?: boolean;
};
export const fillColors = {
    Identity: "rgb(255, 212, 212)",
    Preferences: "rgb(255, 223, 178)",
    Knowledge: "rgb(254, 229, 150)",
    Intent: "rgb(237, 255, 206)",
    Cognition: "rgb(229, 255, 255)",
};

export const defaultBgColor = "rgb(248, 248, 248)";
export const defaultPlaceholderColor = "rgb(240, 240, 240)";
