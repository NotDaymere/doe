import { IMessage } from "./Message";

export interface IBranch {
    id: number | null;
    name: string;
    messages: IMessage[];
}