import { FileWithId} from "../../widgets/home-screens/lib/hooks/useDragFile";

export interface IMessage {
    id: number;
    name?: string;
    content: string;
    files?: FileWithId[];
    isUser: boolean;
    isCode: boolean;
    isLiked?: boolean;
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
