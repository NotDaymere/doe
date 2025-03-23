import { IMessage } from "./Message";
import { ChatTagsEnum } from "../enums/ChatTagsEnum";
import { IBranch } from "./Branch";

export interface IChat {
    id: string;
    name: string;
    messages: IMessage[];
    tags: ChatTagsEnum[];
    notificationsCount: number;
    branches: IBranch[];
}

