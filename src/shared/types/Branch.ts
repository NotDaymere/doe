import { IMessage } from "./Message";
import { IBranchDialog } from "./BranchDialog";

export interface IBranch {
    id: number | null;
    name: string;
    messages: IMessage[];
    dialogsMessages: IBranchDialog[];
    mainMessageId?: number | string;
    isMain?: boolean;
}