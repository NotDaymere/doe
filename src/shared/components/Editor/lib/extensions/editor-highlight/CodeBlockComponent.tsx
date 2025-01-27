import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { supportLanguages } from "./editor-highlight";
import css from "./CodeBlockComponent.module.less";

export function CodeBlockComponent({
    node: { attrs },
    updateAttributes,
    extension,
}: NodeViewProps) {
    return (
        <NodeViewWrapper className={css.codeBlock}>
            <select
                contentEditable={false}
                defaultValue={attrs.language}
                onChange={(event) => updateAttributes({ language: event.target.value })}
            >
                <option value="null">Auto</option>
                <option disabled>—</option>
                {supportLanguages.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
}
