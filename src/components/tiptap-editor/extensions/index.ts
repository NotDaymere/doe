import { Node, RawCommands, mergeAttributes } from "@tiptap/core";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "prosemirror-state";
import { useEditorContext } from "src/contexts/EditorProvider";

interface DisableEnterWithShiftProps {
    onSendMessage: (message: string) => void;
}

const createDisableEnterWithShift = ({ onSendMessage }: DisableEnterWithShiftProps) => {
    const { isFormulaFocused, isLinkFocused } = useEditorContext();

    return Extension.create({
        name: "disableEnterWithShift",
        addProseMirrorPlugins() {
            return [
                new Plugin({
                    key: new PluginKey("eventHandler"),
                    props: {
                        handleKeyDown: (view, event) => {
                            const { state } = view;
                            const { $from } = state.selection;
                            const isInCodeBlock = $from.parent.type.name === "codeBlock";

                            if (event.key === "Enter") {
                                if (event.shiftKey) {
                                    if (isInCodeBlock) {
                                        view.dispatch(view.state.tr.insertText("\n"));
                                    } else {
                                        view.dispatch(
                                            view.state.tr.split(view.state.selection.from)
                                        );
                                    }
                                    return true;
                                } else {
                                    return true;
                                }
                            }
                            return false;
                        },
                    },
                }),
            ];
        },
    });
};

const createHandleTab = () =>
    Extension.create({
        name: "handleTab",
        addProseMirrorPlugins() {
            return [
                new Plugin({
                    key: new PluginKey("handleTab"),
                    props: {
                        handleKeyDown: (view, event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                                const { state, dispatch } = view;
                                const { $from } = state.selection;
                                const node = $from.node();

                                const space = "  ";
                                dispatch(state.tr.insertText(space));
                                return true;
                            }
                            return false;
                        },
                    },
                }),
            ];
        },
    });

const Formula = Node.create({
    name: "formula",
    inline: true,
    group: "inline",
    selectable: false,
    parseHTML() {
        return [{ tag: "span.formula" }];
    },
    renderHTML({ node, HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(HTMLAttributes, { class: "formula" }),
            `\\(${node.attrs.formula}\\)`,
        ];
    },
    addAttributes() {
        return {
            formula: {
                default: null,
            },
        };
    },
    addCommands(): Partial<RawCommands> {
        return {
            insertFormula:
                (formula: string) =>
                ({ commands }: { commands: any }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { formula },
                    });
                },
        };
    },
});

const Div = Node.create({
    name: "div",
    group: "block",
    content: "block+",

    addAttributes() {
        return {
            class: {
                default: null,
            },
            "data-tag": {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div",
                getAttrs: (node) => {
                    const element = node as HTMLElement;
                    return {
                        class: element.getAttribute("class"),
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["div", mergeAttributes(HTMLAttributes), 0];
    },
});

const CustomCodeBlock = CodeBlock.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: (element) => element.getAttribute("class"),
                renderHTML: (attributes) => {
                    return {
                        class: attributes.class || null,
                    };
                },
            },
        };
    },
});

const CustomInlineCode = Code.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: (element) => element.getAttribute("class"),
                renderHTML: (attributes) => {
                    return {
                        class: attributes.class || null,
                    };
                },
            },
        };
    },
});

const CustomParagraph = Node.create({
    name: "paragraph",
    content: "inline*",
    parseHTML() {
        return [
            {
                tag: "p",
                getAttrs: (node) => {
                    const element = node as HTMLElement;
                    return {
                        class: element.getAttribute("class"),
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["p", HTMLAttributes, 0];
    },

    addAttributes() {
        return {
            class: {
                default: null,
            },
        };
    },
});

const CustomSpan = Node.create({
    name: "span",
    inline: true,
    group: "inline",
    selectable: false,
    content: "text*",

    addAttributes() {
        return {
            class: {
                default: null,
            },
            deletable: {
                default: false,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "span",
                getAttrs: (node) => {
                    const element = node as HTMLElement;
                    return {
                        class: element.getAttribute("class"),
                        deletable: element.getAttribute("data-deletable") === "true",
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["span", mergeAttributes(HTMLAttributes), 0];
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("customSpanDeleteHandler"),
                props: {
                    handleKeyDown(view, event) {
                        const { state, dispatch } = view;
                        const { selection } = state;
                        const { $from, $to } = selection;

                        if (event.key === "Backspace" || event.key === "Delete") {
                            const isDeletingBackwards = event.key === "Backspace";
                            const pos = isDeletingBackwards ? $from.before() : $to.after();
                            const node = state.doc.nodeAt(pos);

                            if (node?.type.name === "span" && node.attrs.deletable) {
                                dispatch(state.tr.delete($from.before(), $to.after()));
                                return true;
                            }
                        }
                        return false;
                    },
                },
            }),
        ];
    },
});

export {
    CustomCodeBlock,
    CustomInlineCode,
    CustomParagraph,
    CustomSpan,
    Div,
    Formula,
    createDisableEnterWithShift,
    createHandleTab,
};
