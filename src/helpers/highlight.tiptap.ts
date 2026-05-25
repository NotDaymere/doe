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
    {
      tag: 'span.highlighted-1',
    },
    {
      tag: 'span.highlighted-typing-1',
   
    },
    {
      tag: 'span.highlighted-2',
    },
    {
      tag: 'span.highlighted-typing-2',
    },
    {
      tag: 'span.highlighted-3',
   
    },
    {
      tag: 'span.highlighted-typing-3',
    },
    {
      tag: 'span.highlighted-4',
    },
    {
      tag: 'span.highlighted-typing-4',
   
    },
    {
      tag: 'span.highlighted-5',
    },
    {
      tag: 'span.highlighted-typing-5',
    },
    {
      tag: 'span.highlighted-6',
   
    },
    {
      tag: 'span.highlighted-typing-6',
    },
    {
      tag: 'span.highlighted-7',
    },
    {
      tag: 'span.highlighted-typing-7',
   
    },
    {
      tag: 'span.highlighted-8',
    },
    {
      tag: 'span.highlighted-typing-8',
    },
    {
      tag: 'span.highlighted-9',
   
    },
    {
      tag: 'span.highlighted-typing-9',
    },
    {
      tag: 'span.highlighted-10',
    },
    {
      tag: 'span.highlighted-typing-10',
   
    },
    {
      tag: 'span.highlighted-11',
    },
    {
      tag: 'span.highlighted-typing-11',
    },
    {
      tag: 'span.highlighted-12',
   
    },
    {
      tag: 'span.highlighted-typing-12',
    },
  
  ];
},

  renderHTML({ HTMLAttributes }) {
  
    return ['span', HTMLAttributes];
  
  },
});