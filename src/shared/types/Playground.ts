import { ReactElement } from "react";

export interface IPlayground {
    id: string | null;
    type: "code" | "table" | "source" | null;
    open: boolean;
    data: any;
    text?: string;
}

export type SourceType = "web" | "apps" | "docs";

export interface ISourceTypeNode {
    icon: ReactElement;
    title: string;
    type: SourceType;
}

export interface ISourceTypeItem {
    icon: ReactElement;
    title: string;
    link: string;
}

export interface IPlaygroundSourceItemData {
    title: string;
    items: Array<ISourceTypeItem>;
    type: SourceType;
}

export interface IPlaygroundSourceData {
    web: IPlaygroundSourceItemData;
    apps: IPlaygroundSourceItemData;
    docs: IPlaygroundSourceItemData;
}

export interface IPreviewPlayground {
    type: SourceType | null;
    data: string;
}
