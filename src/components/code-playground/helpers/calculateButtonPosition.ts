import * as monaco from 'monaco-editor';

export const calculateButtonPosition = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const selection = editor.getSelection();
  const model = editor.getModel();
  if (!selection || !model) return null;

  const cursorPosition = editor.getPosition();
  if (!cursorPosition) return null;

  const domNode = editor.getDomNode();
  if (!domNode) return null;

  const editorRect = domNode.getBoundingClientRect();
  const cursorCoords = editor.getScrolledVisiblePosition(cursorPosition);

  if (!cursorCoords) return null;

  const buttonHeight = 24;
  const buttonWidth = 24;

  let buttonTop = editorRect.top + cursorCoords.top - buttonHeight - 10;
  let buttonLeft = editorRect.left + cursorCoords.left;

  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  if (buttonTop < 0) {
    buttonTop = 0;
  } else if (buttonTop + buttonHeight > viewportHeight) {
    buttonTop = viewportHeight - buttonHeight;
  }

  if (buttonLeft < 0) {
    buttonLeft = 0;
  } else if (buttonLeft + buttonWidth > viewportWidth) {
    buttonLeft = viewportWidth - buttonWidth;
  }

  return {
    top: buttonTop,
    left: buttonLeft,
  };
};
