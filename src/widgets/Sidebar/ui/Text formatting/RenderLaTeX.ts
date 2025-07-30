import { Editor } from '@tiptap/core';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Интерфейс для возвращаемого результата
interface RenderedLatex {
  original: string;
  rendered: string;
  isInline: boolean;
  from: number;
  to: number;
}

export function renderLatexInEditor(editor: Editor): RenderedLatex[] {
  const results: RenderedLatex[] = [];
  
  // Получаем содержимое редактора в виде JSON
  const content = editor.getJSON();
  
  // Функция для рекурсивного обхода содержимого
  function traverseNode(node: any, pos: number = 0) {
    if (node.type === 'text' && node.text) {
      const inlineRegex = /\$(.*?[^\\])\$/g;
      const blockRegex = /\$\$(.*?[^\\])\$\$/g;
      
      let match;
      let currentPos = pos;
      
      // Обработка инлайн-формул
      while ((match = inlineRegex.exec(node.text)) !== null) {
        const latex = match[1];
        const original = match[0];
        const matchStart = currentPos + match.index;
        const matchEnd = matchStart + original.length;
        
        try {
          const rendered = katex.renderToString(latex, {
            throwOnError: false,
            displayMode: false,
          });
          
          results.push({
            original,
            rendered,
            isInline: true,
            from: matchStart,
            to: matchEnd,
          });
        } catch (error) {
          console.error(`Ошибка рендеринга LaTeX (инлайн): ${latex}`, error);
        }
      }
      
      // Обработка блоковых формул
      while ((match = blockRegex.exec(node.text)) !== null) {
        const latex = match[1];
        const original = match[0];
        const matchStart = currentPos + match.index;
        const matchEnd = matchStart + original.length;
        
        try {
          const rendered = katex.renderToString(latex, {
            throwOnError: false,
            displayMode: true,
          });
          
          results.push({
            original,
            rendered,
            isInline: false,
            from: matchStart,
            to: matchEnd,
          });
        } catch (error) {
          console.error(`Ошибка рендеринга LaTeX (блок): ${latex}`, error);
        }
      }
      
      currentPos += node.text.length;
      return currentPos;
    }
    
    // Рекурсивно обходим дочерние узлы
    if (node.content) {
      let childPos = pos;
      node.content.forEach((child: any) => {
        childPos = traverseNode(child, childPos);
      });
      return childPos;
    }
    
    return pos;
  }
  
  // Начинаем обход с корневого узла
  traverseNode(content);
  
  // Применяем изменения в редакторе
//   editor.chain().focus().run();
  
  results.forEach((result) => {
    const { from, to, rendered, original, isInline } = result;
    
    // Удаляем оригинальный LaTeX-код
    // editor.commands.deleteRange({ from, to });
    
    // Вставляем отрендеренный текст
    const cleanText = rendered.replace(/<[^>]+>/g, ''); // Удаляем HTML-теги
    // editor.commands.insertContent(cleanText, { updateSelection: true });
    
    // Находим новую позицию вставленного текста
    const newFrom = from;
    const newTo = from + cleanText.length;
    
    // Применяем метку customSpanWithAttrs
    // editor
    //   .chain()
    //   .focus()
    //   .setTextSelection({ from: newFrom, to: newTo })
    //   .setMark('customSpanWithAttrs', {
        // 'data-latex': original,
        // style: isInline ? 'background:red;' : 'background: blue;',
    //   }).run();
  });
  
  return results;
}