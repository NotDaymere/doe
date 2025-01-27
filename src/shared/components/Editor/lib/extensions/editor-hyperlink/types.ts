import { LinkProtocolOptions } from "@tiptap/extension-link";

export interface HyperlinkOptions {
    autolink: boolean;
    protocols: Array<LinkProtocolOptions | string>;
    openOnClick: boolean;
    linkOnPaste: boolean;
    validate?: (url: string) => boolean;
}