import { Mark } from '@tiptap/core';

export const Unselectable = Mark.create({
  name: 'unselectable',

 
  addAttributes() {
    return {
      class: {
        default: 'unselectable-text',
    
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({
          class: attributes.class,
        }),
      },
 
    };
  },

  parseHTML() {
 
    return [
      {
        tag: 'span.unselectable-text',
     
      },
 
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes];
  },
});