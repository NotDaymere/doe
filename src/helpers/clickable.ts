import { Mark, mergeAttributes } from '@tiptap/core';

export const Clickable = Mark.create({
  name: 'clickable',


  addOptions() {
    return {
      HTMLAttributes: {},
    };
  
  },

  parseHTML() {
    return [
  
      {
        tag: 'span[data-clickable]',
      },
    ];
  
  },

  renderHTML({ HTMLAttributes }) {
    return [
  
      'span',
      mergeAttributes(HTMLAttributes, { 
        'data-clickable': 'true', 
        'data-id': HTMLAttributes.id, // Ensure we pass the id here
        class: 'clickable-text' 
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      id: {
        default: null, // Ensure the id can be passed dynamically
      },
    };
  },
});