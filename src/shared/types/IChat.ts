import { IMessage } from "./Message";

export interface IChat {
    id: string;
    name: string;
    messages: IMessage[];
}

