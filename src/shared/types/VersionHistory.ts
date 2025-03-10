import { App } from "../../types";
import Playground = App.Playground;

export interface IVersionHistory {
    id: number,
    name: string | null,
    time: string,
    user: string,
    photo: string,
    playgroundId: string | null,
    playground: Playground | null,
}