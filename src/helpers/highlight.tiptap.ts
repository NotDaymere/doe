import { Mark } from '@tiptap/core';

export const Highlight = Mark.create({
  name: 'highlight',

  
  addAttributes() {
    return {
      class: {
        default: 'highlighted-typing',
  
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => ({
          class: attributes.class,
        }),
  
      },
    };
  },

  
  parseHTML() {
    return [
      {
        tag: 'span.highlighted',
  
      },
      {
        tag: 'span.highlighted-typing',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes];
  
  },
});
