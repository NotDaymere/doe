import { Mark } from '@tiptap/core';

export const CustomBlock = Mark.create({
    name: 'customBlock',
    parseHTML() {
        return [
            {
                tag: 'span.calculate-block.right',
            }
        ];
    },
    renderHTML() {
        return ['span', { class: 'calculate-block right' }, 0];
    }
});
