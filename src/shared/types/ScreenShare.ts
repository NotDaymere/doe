import { ReactElement } from "react";

export interface IScreenShareConfig {
    title: string;
    description: string;
    label?: string;
    icon?: ReactElement;
    actions?: boolean;
    videoUrl?: string;
}

export interface IScreenSharePopup {
    shareScreen: IScreenShareConfig;
    shareViaBluetooth: IScreenShareConfig;
    shareViaCabel: IScreenShareConfig;
    connectionFailed: IScreenShareConfig;
    connectionSuccessful: IScreenShareConfig;
}

export type ShareType = keyof IScreenSharePopup;
