import '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands {
    insertFormula: {
      insertFormula: (formula: string) => void;
    };
  }
}
