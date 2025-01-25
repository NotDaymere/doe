import { FC, useEffect, useRef, useState } from 'react';
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea';

interface Props {
  formula: string | null
  inputPosition: {
    top: number | null;
    left: number | null;
  }
  setFormula: React.Dispatch<React.SetStateAction<string | null>>
  handleFormulaSubmit: (formula: string) => void
  setIsFormulaFocused: React.Dispatch<React.SetStateAction<boolean>>
  closeFormulaInput: () => void
}

const FormulaInput: FC<Props> = ({ 
  formula, 
  inputPosition,
  setFormula,
  setIsFormulaFocused,
  handleFormulaSubmit,
  closeFormulaInput
}) => {
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef<TextAreaRef>(null);
  
  useEffect(() => {
    if (textAreaRef.current) {
      const initialHeight = textAreaRef.current.resizableTextArea?.textArea.scrollHeight || 0;
      setHeight(initialHeight);
    }
  }, []);

  const onBlur = () => {
    setIsFormulaFocused(false);

    if (!formula) {
      closeFormulaInput();
    }
  }

  const onSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!formula) return 

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormulaSubmit(formula);
      setIsFormulaFocused(false)
    }
  }

  const handleResize = () => {
    if (textAreaRef.current) {
      const newHeight = textAreaRef.current.resizableTextArea?.textArea.scrollHeight || 0;
      setHeight(newHeight);
    }
  };

  return (
    <TextArea
      onKeyDown={(e) => onSubmit(e)}
      value={formula ? formula : ''}
      ref={textAreaRef}
      size={'small'}
      onResize={handleResize}
      autoSize={{ minRows: 2, maxRows: 6 }}
      onBlur={onBlur}
      onChange={(e) => setFormula(e.target.value)}
      onFocus={() => setIsFormulaFocused(true)}
      placeholder={'Enter your formula here...'}
      style={{
        position: 'fixed',
        top: `${inputPosition.top && inputPosition.top - height}px`,
        left: `${inputPosition.left}px`,
        minWidth: '16rem',
        maxWidth: '32rem',
        width: 'auto',
      }}
    />
  );
};

export default FormulaInput;
