import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { supportLanguages } from "./editor-highlight";
import css from "./CodeBlockComponent.module.less";
import { LanguageDropDownSelect } from "./LanguageDropDownSelect/LanguageDropDownSelect";

export function CodeBlockComponent({
    node: { attrs },
    updateAttributes,
    extension,
}: NodeViewProps) {
    const languageOptions = [
        { value: "null", label: "Auto" },
        ...supportLanguages.map((lang) => ({
            value: lang.name,
            label: lang.name,
        })),
    ];

    return (
        <NodeViewWrapper className={css.codeBlock}>
            <LanguageDropDownSelect
                options={languageOptions}
                defaultValue={attrs.language}
                onChange={(value) => updateAttributes({ language: value })}
            />
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
}
