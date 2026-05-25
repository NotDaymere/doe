import Format from "../../../../../../shared/icons/Format";
import General from "src/shared/icons/General"
import Bold from "../../../../../../shared/icons/Bold";
import Indian from "../../../../../../shared/icons/Indian";
import Underline from "../../../../../../shared/icons/Underline";
import StrikeThrough from "../../../../../../shared/icons/StrikeThrough";
import UpperLowerCase from "../../../../../../shared/icons/UpperLowerCase";
import PencilUnderline from "../../../../../../shared/icons/PencilUnderline";
import Paint from "../../../../../../shared/icons/Paint";
import ActivePaintIcon from "../../../../../../shared/icons/ActivePaintIcon";
import Quotes from "../../../../../../shared/icons/Quotes";
import CloudQuotes from "../../../../../../shared/icons/CloudQuotes";
import Degree from "../../../../../../shared/icons/Degree";
import LinkOther from "../../../../../../shared/icons/LinkOther";
import Menu from "../../../../../../shared/icons/Menu";
import ActiveMenuIcon from "../../../../../../shared/icons/ActiveMenuIcon";
import CardPlus from "../../../../../../shared/icons/CardPlus";
import './MonacoEditorMenu.less';
import { Button, Flex } from "antd";
import { useState } from "react";
import * as monaco from "monaco-editor";
import ActivePaint from "../../../PlaygroundButtons/ActivePaint/ActivePaint";
import ActiveMenu from "../../../PlaygroundButtons/ActiveMenu/ActiveMenu";

type TextFormatProps = {
    isPen?: boolean;
    buttonPosition: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    };
    editor: monaco.editor.IStandaloneCodeEditor | null;
};

function MonacoEditorMenu({ buttonPosition, isPen, editor }: TextFormatProps) {
    const [activePaint, setActivePaint] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);

    const getEditorSelection = () => {
        if (!editor) return null;
        const selection = editor.getSelection();
        if (!selection) return null;
        const model = editor.getModel();
        if (!model) return null;
        const selectedText = model.getValueInRange(selection);
        return { selection, model, selectedText };
    };

    const applyEdit = (range: monaco.Range, newText: string) => {
        if (!editor) return;
        editor.executeEdits(null, [
            {
                range,
                text: newText,
                forceMoveMarkers: true,
            },
        ]);
    };

    const applyRemoveFormat = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const plainText = selectedText.replace(/<\/?[^>]+(>|$)/g, "");
        applyEdit(selection, plainText);
    };

    const applyBold = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<b>${selectedText}</b>`;
        applyEdit(selection, newText);
    };

    const applyItalic = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<i>${selectedText}</i>`;
        applyEdit(selection, newText);
    };

    const applyUnderline = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<u>${selectedText}</u>`;
        applyEdit(selection, newText);
    };

    const applyStrikeThrough = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<s>${selectedText}</s>`;
        applyEdit(selection, newText);
    };

    const toggleUpperLowerCase = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText =
            selectedText === selectedText.toUpperCase()
                ? selectedText.toLowerCase()
                : selectedText.toUpperCase();
        applyEdit(selection, newText);
    };

    const applyPencilUnderline = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<span style="text-decoration: underline dashed;">${selectedText}</span>`;
        applyEdit(selection, newText);
    };

    const applyQuotes = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `"${selectedText}"`;
        applyEdit(selection, newText);
    };

    const applyCloudQuotes = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `“${selectedText}”`;
        applyEdit(selection, newText);
    };

    const insertDegreeSymbol = () => {
        if (!editor) return;
        const selection = editor.getSelection();
        if (!selection) return;
        applyEdit(selection, '°');
    };

    const applyFormatBlock = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        // Обычный blockquote
        const newText = `<blockquote>${selectedText}</blockquote>`;
        applyEdit(selection, newText);
    };

    const applyLink = () => {
        const url = prompt("URL:");
        if (!url) return;
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<a href="${url}">${selectedText}</a>`;
        applyEdit(selection, newText);
    };

    const applyColor = (color: string) => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selection, selectedText } = sel;
        const newText = `<span style="color: ${color};">${selectedText}</span>`;
        applyEdit(selection, newText);
    };

    const handlePenClick = () => {
        setActivePaint(!activePaint);
    };

    const handleMenuClick = () => {
        setActiveMenu(!activeMenu);
    };

    return (
        <>
            <Flex
                className={'text-format-container'}
                style={{
                            top: `${buttonPosition?.top}px`,
                            left: buttonPosition?.left
                                ? `${buttonPosition.left - 200}px`
                                : 'auto',
                            bottom: `${buttonPosition?.bottom}px`,
                            right: `${buttonPosition?.right}px`,
                        }
                }
            >
                <Button className={'button'} onClick={applyRemoveFormat}>
                    <General />
                </Button>
                <Button className={'button'} onClick={applyBold}>
                    <Bold />
                </Button>
                <Button className={'button'} onClick={applyItalic}>
                    <Indian />
                </Button>
                <Button className={'button'} onClick={applyUnderline}>
                    <Underline />
                </Button>
                <Button className={'button'} onClick={applyStrikeThrough}>
                    <StrikeThrough />
                </Button>
                <Button className={'button'} onClick={toggleUpperLowerCase}>
                    <UpperLowerCase />
                </Button>
                <Button className={'button'} onClick={applyPencilUnderline}>
                    <PencilUnderline />
                </Button>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        className={activePaint ? 'button-active' : 'button'}
                        onClick={handlePenClick}
                    >
                        {!activePaint ? <Paint /> : <ActivePaintIcon />}
                    </Button>
                    {activePaint && (
                        <ActivePaint
                            onColorSelect={applyColor}
                        />
                    )}
                </div>

                <Button className={'button'} onClick={applyQuotes}>
                    <Quotes />
                </Button>
                <Button className={'button'} onClick={applyCloudQuotes}>
                    <CloudQuotes />
                </Button>
                <Button className={'button'} onClick={insertDegreeSymbol}>
                    <Degree />
                </Button>
                <Button className={'button'} onClick={applyFormatBlock}>
                    <Format />
                </Button>
                <Button className={'button'} onClick={applyLink}>
                    <LinkOther />
                </Button>

                {isPen && (
                    <>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <Button
                                className={activeMenu ? 'button-active' : 'button'}
                                onClick={handleMenuClick}
                            >
                                {!activeMenu ? <Menu /> : <ActiveMenuIcon />}
                            </Button>
                            {activeMenu && (<ActiveMenu />)}
                        </div>
                        <Button className={'button'}>
                            <CardPlus />
                        </Button>
                    </>
                )}
            </Flex>
        </>
    );
}

export default MonacoEditorMenu;
