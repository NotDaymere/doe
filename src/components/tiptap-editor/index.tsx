import { FC, useEffect, useState } from "react";
import { EditorContent, Editor } from '@tiptap/react'
import FormulaInput from "./assets/FormulaInput";
import { MathJax } from "better-react-mathjax";
import { LinkInput } from "./assets/LinkInput";
import { useEditorContext } from "src/contexts/EditorProvider";
import './index.less'

interface Props {
  editor: Editor | null
  classname?: string
}

export const CustomEditor: FC<Props> = ({ editor, classname }) => {
  const { 
    setInputPosition, 
    linkUrl, 
    closeFormulaInput, 
    closeLinkInput,
    setLinkUrl,
    setFormulaFocused,
    setFormula,
    linkInputVisible,
    formulaInputVisible,
    inputPosition,
    formula,
    setEditor,
    setFormulaInputVisible,
    setLinkFocused
  } = useEditorContext()

  useEffect(() => {
    if (editor) {
      const { from } = editor.state.selection;

      try {
        const coords = editor.view.coordsAtPos(from);
        setInputPosition({
          top: coords.top,
          left: coords.left
        });
      } catch (error) {
        console.error("Error getting coordinates:", error);
      }
    }
  }, [editor]);

  const handleLinkSubmit = () => {
    if (!editor) return;

    
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      closeLinkInput();
      return;
    }

    const { to } = editor.state.selection;

    editor.chain()
      .focus()
      .setLink({ href: linkUrl })
      .setTextSelection({ from: to, to: to })
      .run();

    setLinkUrl('');
    closeLinkInput();
  };

  const handleFormulaSubmit = (formula: string) => {
    if (editor) {
      editor.commands.insertFormula(formula.trim());
      setFormula('');
      setFormulaInputVisible(false);
    }
  };

  useEffect(() => {
    setEditor(editor)
  }, [])

  return (
    <div 
      className={classname} 
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <MathJax>
        <EditorContent 
          onFocus={() => setEditor(editor)}
          placeholder={'Ask Doe anything you’d like about the world…'}
          className={'chat-input-editor'} 
          editor={editor} 
        />
      </MathJax>

      {linkInputVisible && (
        <LinkInput 
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          inputPosition={inputPosition}
          closeLinkInput={closeLinkInput}
          handleLinkSubmit={handleLinkSubmit}
          setLinkFocused={setLinkFocused}
        />
      )}

      {formulaInputVisible && (
        <FormulaInput
          inputPosition={inputPosition}
          formula={formula}
          closeFormulaInput={closeFormulaInput}
          handleFormulaSubmit={handleFormulaSubmit}
          setFormula={setFormula}
          setIsFormulaFocused={setFormulaFocused}
        />
      )}
    </div>
  )
}