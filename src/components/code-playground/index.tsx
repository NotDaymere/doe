import Editor, { OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import './index.less'
import React, { useRef, useState } from 'react';
import { useApp } from '../app';
import { calculateButtonPosition } from './helpers/calculateButtonPosition';
import { QuestionButton } from './assets/QuestionButton';
import { useEditorContext } from 'src/contexts/EditorProvider';
import { CloseCircleOutlined } from "@ant-design/icons"
import { Flex } from "antd";
import Pen from "./assets/Pen";
import DecreasePlayground from "./assets/DecreasePlayground";
import CloudPlus from "./assets/CloudPlus";


const CodePlayground = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { editor } = useEditorContext()
  const determineCodeType = (code: string) => {
    const isMultiline = code.includes('\n');
    if (isMultiline) {
      return `<pre class="code-highlight block"><code>${code}</code></pre>`;
    } else {
      return `<code class="code-highlight inline">${code}</code>`;
    }
  };
  const { setPlayground } = useApp().app

  const handleSetContent = () => {
    if (selectedText) {
      const template = `I have a question about ${determineCodeType(selectedText)}<div class="inline-wrapper">:<div data-tag="true" class="custom-tag yellow">question</div></div>`;
      const contentHTML = template;

      editor?.commands.setContent(contentHTML)
    }

    window.getSelection()?.removeAllRanges();

    setSelectedText(null);
    setButtonPosition(null);
  }

  const customTheme: monaco.editor.IStandaloneThemeData = {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'string', foreground: 'A5201E' },
      { token: 'keyword', foreground: '0000FF' },
      { token: 'identifier', foreground: '0171C1' },
      { token: 'variable', foreground: '0171C1' },
      { token: 'delimiter', foreground: '3D3F46' },
      { token: 'function', foreground: '0000FF' },
    
    ],
    colors: {
      'editor.background': '#FAFAF9',
      'editor.lineHighlightBackground': '#FAFAF9',
      'editor.selectionBackground': '#c1d3ff',
    }
  };

  const handleEditorMouseUp = (editor: monaco.editor.IStandaloneCodeEditor) => {
    updateSelectedText(editor);
    const position = calculateButtonPosition(editor);
    if (position) {
      setButtonPosition(position);
    }
  };

  const updateSelectedText = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const selection = editor.getSelection();
    if (selection) {
      const model = editor.getModel();
      if (!model) return;

      const selectedText = model.getValueInRange(selection);
      setSelectedText(selectedText);
    }
  };
  const closeCodePlayground = () => {
    setPlayground(prev => ({
      ...prev,
      type: null,
      open: false,
    }))
  }
  
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  
    monaco.editor.defineTheme('myCustomTheme', customTheme);
    monaco.editor.setTheme('myCustomTheme');
  
    editor.onMouseUp(() => {
      handleEditorMouseUp(editor);
    });
  
    editor.onKeyUp(() => {
      handleEditorMouseUp(editor);
    });
  };

  const language = 'javascript';

  return (
    <div className={"code-playground-section"} style={{ position: 'relative', height: '100%' }}>
      <Flex justify={"flex-end"} className={"close-code-playground-btn"}>
        <CloseCircleOutlined onClick={closeCodePlayground}/>
      </Flex>
      <Editor
        onMount={handleEditorMount}
        theme={'light'}
        language={language}
        className={'code-editor'}
        height={'100%'}
        options={{
          tabSize: 2,
          insertSpaces: true,
          minimap: { enabled: false },
        }}
        defaultValue={` function calculateArea(radius) {
      if (radius <= 0) {
        throw new Error("Radius must be positive.");
      }
      return Math.PI * Math.pow(radius, 2);
    }

    const area = calculateArea(5);
    console.log("Area:", area);`}
      />
      <Pen />
      <DecreasePlayground />
      <CloudPlus />
      {selectedText && <QuestionButton
        buttonPosition={{
          top: buttonPosition?.top,
          left: buttonPosition?.left
        }}
        onClick={handleSetContent}
      />
      }
    </div>
  );
};

export default CodePlayground;
