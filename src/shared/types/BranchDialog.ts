import { IMessage } from "./Message";

export interface IBranchDialog {
    userRequest: IMessage;
    botMessages?: IMessage;
}