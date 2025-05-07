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
    hasCode?: boolean;
    mathBlock?: string;
    translation?: string;
    origin?: string;
    originTranscribed?: string;
    recording?: boolean;
    betaWidget?: boolean;
    noTypeEffect?: boolean;
}
