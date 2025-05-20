import { IMessageNode } from "./MessageNode";
import { ChatTagsEnum } from "../enums/ChatTagsEnum";
import { IBranch } from "./Branch";

export interface IChat {
    id: string;
    name: string;
    messageNodeMap: Record<string, IMessageNode>;
    tags: ChatTagsEnum[];
    notificationsCount: number;
    branches: IBranch[];
}
export const MODE = {
    TRANSLATION: "translation",
    RECORDING: "recording",
    INITIAL: null,
} as const;

export type ModeType = (typeof MODE)[keyof typeof MODE];
