import {IMessage} from "../../../../../../shared/types/Message";

export interface ReflectionsMessage extends IMessage {
    isPinned: boolean;
    day: string;
    time: string
    isRead: boolean;
}