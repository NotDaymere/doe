import { SVGProps } from "react";

export type PuzzleProps = {
    category?: "Identity" | "Preferences" | "Knowledge" | "Intent" | "Cognition" | null;
    isColored: boolean;
    isPlaceholder?: boolean;
} & SVGProps<SVGSVGElement>;
export const fillColors = {
    Identity: "rgb(255, 212, 212)",
    Preferences: "rgb(255, 223, 178)",
    Knowledge: "rgb(254, 229, 150)",
    Intent: "rgb(237, 255, 206)",
    Cognition: "rgb(229, 255, 255)",
};

export const defaultBgColor = "var(--var-1)";
export const defaultPlaceholderColor = "var(--var-161)";
export const withoutCategoryBorderColor = "var(--icon-puzzle-without-category)";
export const unselectedBorderColor = "var(--var-162)";
