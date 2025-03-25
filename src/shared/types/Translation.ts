export const TRANSLATION_MENU_OPTIONS = {
    TRANSLATION: 0,
    CONNECT_TO_CAMERA: 1,
    PRACTICE_ENGLISH: 2,
    VOICE_MODE: 3,
} as const;

export type TranslationMenuOptionsType =
    (typeof TRANSLATION_MENU_OPTIONS)[keyof typeof TRANSLATION_MENU_OPTIONS];
