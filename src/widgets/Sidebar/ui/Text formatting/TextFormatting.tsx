import React, { ReactComponentElement, useState } from "react";
import clsx from "clsx";
import { MathJax } from "better-react-mathjax";
import ReactDOMServer from "react-dom/server";
import BoldIcon from "../../../../shared/icons/Bold.icon";
import UnderlineIcon from "../../../../shared/icons/Underline.icon";
import ItalicIcon from "../../../../shared/icons/Italic.icon";
import FunctionIcon from "../../../../shared/icons/Function.icon";
import CodeIcon from "../../../../shared/icons/Code.icon";
import LinkIcon from "../../../../shared/icons/Link.icon";
import { useEditorContext } from "src/shared/components/Editor";
import { useEditorContext as useEditorContext2 } from "src/contexts/EditorProvider";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import css from "./TextFormatting.module.less";
import ReactDOM from "react-dom";
import { TextToLatexService } from "./LatexService";
import { renderLatexInEditor } from "./RenderLaTeX";


interface EditorState {
    toggleBold: () => void;
    toggleUnderline: () => void;
    toggleItalic: () => void;
    toggleCode: () => void;
    isBold: boolean;
    isUnderline: boolean;
    isItalic: boolean;
    isCode: boolean;
}

interface Editor {
    state: {
        selection: { from: number; to: number };
        doc: { textBetween: (from: number, to: number) => string };
    };
    chain: () => {
        focus: () => {
            insertContentAt: (range: { from: number; to: number }, content: string) => {
                run: () => void;
            };
        };
    };
}

interface ConversionResult {
    display: string;
    results: string[];
}

interface IconProps {
    fill: string;
    width: number;
    height: number;
}

export const TextFormatting: React.FC = () => {
    const { formulaToDisplay, setFormulaToDisplay } = useEditorContext2();
    const { isSideBarOpen, isHyperlinkInputOpen, setIsHyperlinkInputOpen } = useAppStore();
    const { editor } = useChatStore();
    const editorState = useEditorContext(editor) as EditorState;
    const [isSideBarTextFormattingOpen, setIsSideBarTextFormattingOpen] = useState<boolean>(true);
    const [isMathModeActive, setIsMathModeActive] = useState<boolean>(false);


    const superscriptMap: { [key: string]: string } = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '-': '⁻',
        '/': '/',
    };

    // Математические константы
    const constants: { [key: string]: string | number } = {
        'e': Math.E,
        'pi': Math.PI,
        'i': 'i',
    };

    // Преобразование числа или строки в верхний индекс для MathJax
    const toSuperscript = (exponent: string): string => {
        if (exponent.includes('/')) {
            const [numerator, denominator] = exponent.split('/');
            return `\\frac{${numerator.split('').map((char) => superscriptMap[char] || char).join('')}}{${denominator.split('').map((char) => superscriptMap[char] || char).join('')}}`;
        }
        return exponent.split('').map((char) => superscriptMap[char] || char).join('');
    };

    // Форматирование числа без лишних нулей
    const formatNumber = (num: number): string => {
        const parsed = parseFloat(num.toFixed(10));
        return parsed % 1 === 0 ? parsed.toString() : parsed.toFixed(4).replace(/\.?0+$/, '');
    };

    // Вычисление степени (только для числовых оснований и константы i)
    const calculatePower = (base: number | string, exponent: string): string | null => {
        if (base === 'i') {
            // Для i обрабатываем только целые показатели
            const exponentNum = parseFloat(exponent);
            if (!Number.isInteger(exponentNum)) return null; // Дробные показатели для i не поддерживаются
            const mod = Math.abs(exponentNum) % 4;
            const sign = exponentNum < 0 ? '-' : '';
            if (mod === 0) return `${sign}1`;
            if (mod === 1) return `${sign}i`;
            if (mod === 2) return `${sign}-1`;
            if (mod === 3) return `${sign}-i`;
        }
        if (typeof base === 'number') {
            let exponentNum: number;
            if (exponent.includes('/')) {
                const [numerator, denominator] = exponent.split('/').map(Number);
                exponentNum = numerator / denominator;
            } else {
                exponentNum = parseFloat(exponent);
            }
            return formatNumber(Math.pow(base, exponentNum));
        }
        return null; // Для букв результат не вычисляется
    };

    // Преобразование текста с нотацией степени
    const convertCaretNotationToUnicode = (text: string): ConversionResult => {
        // Регулярное выражение для поиска основание^степень (включая отрицательные и дробные показатели)
        const pattern = /([a-zA-Z]|\d*\.?\d*|e|pi|i)\^([-]?\d+(?:\/\d+)?)/g;
        const matches = [...text.matchAll(pattern)];

        if (!matches.length) {
            return { display: text, results: [] };
        }

        let display = text;
        const results: string[] = [];

        // Обрабатываем каждое совпадение
        for (const match of matches) {
            const base = match[1];
            const exponent = match[2];
            let baseValue: number | string;
            let formattedBase: string;

            // Проверяем основание: константа, число или буква
            if (constants.hasOwnProperty(base)) {
                baseValue = constants[base];
                formattedBase = base === 'i' ? 'i' : formatNumber(constants[base] as number);
            } else if (!isNaN(parseFloat(base))) {
                baseValue = parseFloat(base);
                formattedBase = formatNumber(baseValue);
            } else {
                baseValue = base; // Латинская буква
                formattedBase = base;
            }

            // Преобразуем степень в верхний индекс
            const superscriptExponent = exponent.startsWith('-')
                ? `^{-${toSuperscript(exponent.slice(1))}}`
                : exponent.includes('/')
                    ? `^{${toSuperscript(exponent)}}`
                    : toSuperscript(exponent);
            const formattedExpression = `${formattedBase}${superscriptExponent}`;

            // Заменяем оригинальное выражение в тексте
            display = display.replace(match[0], formattedExpression);

            // Вычисляем результат, если возможно
            const result = calculatePower(baseValue, exponent);
            if (result) {
                results.push(`${formattedExpression} = ${result}`);
            }
        }

        return { display, results };
    };

    const handleToggleMathMode = (): void => {
        if(!editor) return

        const selection = editor.state.selection;
        let selectionCoords = { from: selection.from, to: selection.to}
        let selectionText = editor.state.doc.textBetween(selection.from, selection.to)
        if(selection.from === selection.to){ 
            selectionText = editor.state.doc.textContent;
            selectionCoords = {from: 0, to: editor.state.doc.textContent.length + 1}
        }
        const renderedLatexArray = renderLatexInEditor(editor)
        try{
            renderedLatexArray[0].rendered
        }
        catch(er){
            setFormulaToDisplay('')
        }

        
        const renderedLatex = renderedLatexArray[0].rendered;
        
        setFormulaToDisplay(`${renderedLatex}`) ;
        if(!formulaToDisplay) return
        
    };

    const pointerDown = (event: React.PointerEvent): void => {
        event.preventDefault();
    };

    const handleOpenSideBarTextFormatting = (): void => {
        setIsSideBarTextFormattingOpen(!isSideBarTextFormattingOpen);
    };

    return (
        <div className={isSideBarOpen ? css.sidebar_open_text_formatting : css.sidebar_text_formatting}>
            <div className={css.text_formatting_actions_section_name}>
                <div>Text formatting</div>
                <div
                    className={css.text_formatting_show_actions_btn}
                    onClick={handleOpenSideBarTextFormatting}
                >
                    {!isSideBarTextFormattingOpen ? "+" : "-"}
                </div>
            </div>

            {isSideBarTextFormattingOpen && (
                <div className={css.text_formatting_actions_section_container}>
                    <div
                        className={css.sidebar_text_formatting_action_container}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleBold}
                        data-active={editorState.isBold}
                    >
                        <button className={css.sidebar_text_formatting_action_btn}>
                            <BoldIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            <span>Bold</span>
                            <span>Text</span>
                        </div>
                    </div>

                    <div
                        className={css.sidebar_text_formatting_action_container}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleUnderline}
                        data-active={editorState.isUnderline}
                    >
                        <button className={css.sidebar_text_formatting_action_btn}>
                            <UnderlineIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            <span>Underlined</span>
                            <span>text</span>
                        </div>
                    </div>

                    <div
                        className={css.sidebar_text_formatting_action_container}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleItalic}
                        data-active={editorState.isItalic}
                    >
                        <button className={css.sidebar_text_formatting_action_btn}>
                            <ItalicIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            <span>Italic</span>
                            <span>text</span>
                        </div>
                    </div>

                    <div
                        className={css.sidebar_text_formatting_action_container}
                        onPointerDown={pointerDown}
                        onClick={handleToggleMathMode}
                        data-active={isMathModeActive}
                    >
                        <button className={css.sidebar_text_formatting_action_btn}>
                            <FunctionIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            <span>Math</span>
                            <span>Mode</span>
                        </div>
                    </div>

                    <div
                        className={css.sidebar_text_formatting_action_container}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleCode}
                        data-active={editorState.isCode}
                    >
                        <button className={css.sidebar_text_formatting_action_btn}>
                            <CodeIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            <span>Code</span>
                            <span>Mode</span>
                        </div>
                    </div>

                    <div
                        className={css.sidebar_text_formatting_action_container}
                        onPointerDown={pointerDown}
                        onClick={() => {
                            setIsHyperlinkInputOpen(!isHyperlinkInputOpen)
                            console.log(editor?.chain().focus())
                        }}
                        data-active={isHyperlinkInputOpen}
                    >
                        <button
                            className={clsx(css.sidebar_text_formatting_action_btn, {
                                [css.active]: isHyperlinkInputOpen,
                            })}
                        >
                            <LinkIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            <span>Insert</span>
                            <span>Link</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};