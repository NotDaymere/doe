export interface IMessage {
    id: number;
    content: string;
    files: File[];
    isUser: boolean;
    isCode: boolean;
}
export interface OnboardingMessage {
    role: "user" | "ai";
    content: string;
    content2?: string;
    mathBlock?: string;
    translation?: string;
    origin?: string;
    originTranscribed?: string;
    recording?: boolean;
}
