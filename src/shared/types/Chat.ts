export const MODE = {
    TRANSLATION: "translation",
    RECORDING: "recording",
    INITIAL: null,
} as const;

export type ModeType = (typeof MODE)[keyof typeof MODE];
