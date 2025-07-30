import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import clsx from "clsx";
import { EditorContent, Editor as IEditor } from "@tiptap/react";
import { EditorProps, useInitialEditor } from "../..";
import css from "./Editor.module.less";
import { useEditorContext } from "src/contexts/EditorProvider";
import { Mark } from "@tiptap/react";


interface EditorRef {
    focus: () => void;
}

type Props = {
    className?: string;
    clearContent?: boolean;
    handleKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
} & EditorProps;

export const Editor = forwardRef<EditorRef, Props>(
    (
        {
            className,
            classNameEditor,
            classNameFocus,
            classNamePlaceholder,
            clearContent,
            handleKeyDown,
            ...editorProps
        },
        ref
    ) => {
        const span = Mark.create({
          name: 'span', 
        
          
          addAttributes() {
            return {
              style: {
                default: 'background: var(--var-26)',
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                  if (!attributes.style) {
                    return {};
                  }
                  return { style: attributes.style };
                },
              },
            };
          },
        
          // Парсим HTML для span
          parseHTML() {
            return [
              {
                tag: 'span',
                getAttrs: element => {
                  const style = element.getAttribute('style');
                  if (style === 'background: red') {
                    return { style };
                  }
                  return false;
                },
              },
            ];
          },
        
          // Рендерим span с атрибутами
          renderHTML({ HTMLAttributes }) {
            return ['span', HTMLAttributes, 0];
          },
        });
        const { formulaToDisplay, setFormulaToDisplay } = useEditorContext();
        const editor = useInitialEditor({
            ...editorProps,
            classNameEditor: clsx(css.editor_editor, classNameEditor),
            classNameFocus: clsx(css.editor_focused, classNameFocus),
            classNamePlaceholder: clsx(css.editor_placeholder, classNamePlaceholder),
        });
        const { setEditor } = useEditorContext();
        setEditor(editor);

        React.useEffect(() => {
            if (clearContent) editor?.commands.clearContent();
        }, [clearContent, editor]);

        useImperativeHandle(
            ref,
            () => ({
                focus: () => {
                    editor?.chain().focus().run();
                },
            }),
            [editor]
        );
//         setFormulaToDisplay(`<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>N</mi><mi>a</mi><mi>t</mi><mo stretchy="false">(</mo><mi>C</mi><mo stretchy="false">(</mo><mo>−</mo><mo separator="true">,</mo><mi>X</mi><mo stretchy="false">)</mo><mo separator="true">,</mo><mi>F</mi><mo stretchy="false">)</mo><msqrt><mi>F</mi></msqrt><mo stretchy="false">(</mo><mi>X</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">Nat(C(-,X),F) \sqrt F(X)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1767em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mopen">(</span><span class="mord">−</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mclose">)</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mclose">)</span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;padding-left:0.833em;">F</span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="1.08em" viewBox="0 0 400000 1080" preserveAspectRatio="xMinYMin slice"><path d="M95,702
// c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
// c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
// c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
// s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
// c69,-144,104.5,-217.7,106.5,-221
// l0 -0
// c5.3,-9.3,12,-14,20,-14
// H400000v40H845.2724
// s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
// c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
// M834 80h400000v40h-400000z"/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mclose">)</span></span></span></span>`);

        return (
            <div className={clsx(css.editor, className)}>
                <EditorContent
                    editor={editor}
                    onKeyDown={handleKeyDown}
                    onMouseUp={editorProps.onMouseUp}
                />
              <div 
              className={`${!(formulaToDisplay?.trim() == "") || formulaToDisplay?.trim() == " " ? css.formulaContainer : css.formulaContainerHidden}`}
              dangerouslySetInnerHTML={{
                __html: 
                String(formulaToDisplay)
              }}
              ></div>
            </div>
        );
    }
);
