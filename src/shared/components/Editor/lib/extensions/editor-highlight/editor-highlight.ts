import "./styles.less";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { CodeBlockComponent } from "./CodeBlockComponent";

const lowlight = createLowlight(all);

export const supportLanguages = [
    { name: "HTML", lang: html },
    { name: "CSS", lang: css },
    { name: "JavaScript", lang: js },
    { name: "TypeScript", lang: ts },
    { name: "Python", lang: python },
];

supportLanguages.forEach((item) => lowlight.register(item.name, item.lang));

export const getCodeBlockConfigured = () =>
    CodeBlockLowlight.extend({
        addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent);
        },
    }).configure({ lowlight });
