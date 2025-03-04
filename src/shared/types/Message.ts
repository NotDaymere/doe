export interface IMessage {
    id: number;
    content: string;
    files?: File[];
    isUser: boolean;
    isCode: boolean;
}
