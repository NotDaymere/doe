import { Mark } from "@tiptap/react";
import { HyperlinkOptions } from "./types";

export const Hyperlink = Mark.create<HyperlinkOptions>({
    name: "hyperlink",

    priority: 1000,
})