import { Mark } from '@tiptap/core';


export const Highlight = Mark.create({
  name: 'highlight',


  addAttributes() {
    return {
      class: {
  
        default: 'highlighted',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span.highlighted',
  
    },
    ];
  },

  
  renderHTML({ HTMLAttributes }) {
    return ['span', { class: 'highlighted', ...HTMLAttributes }];
  },
});