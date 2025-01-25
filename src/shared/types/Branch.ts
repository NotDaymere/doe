import { IMessage } from "./Message";

export interface IBranch {
    id: number;
    name: string;
    messages: IMessage[];
}