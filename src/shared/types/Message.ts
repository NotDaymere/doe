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
