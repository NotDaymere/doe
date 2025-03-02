export const MODE = {
    TRANSLATION: "translation",
    RECORDING: "recording",
    SHARED_WITH_YOU: "sharedWithYou",
    INITIAL: null,
} as const;

export type ModeType = (typeof MODE)[keyof typeof MODE];
