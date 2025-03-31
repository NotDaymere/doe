import { IMessage } from "./Message";

export interface IMessageNode {
    id: string;
    parent?: IMessageNode;
    children?: IMessageNode[];
    currentChildrenVersion?: number
    message?: IMessage;
    isRootNode: boolean;
}
