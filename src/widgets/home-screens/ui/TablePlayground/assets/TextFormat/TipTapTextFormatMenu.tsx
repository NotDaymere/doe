import { ReactComponent as General } from "src/assets/icons/general.svg";
import { ReactComponent as Bold } from "src/assets/icons/bold.svg";
import { ReactComponent as Indian } from "src/assets/icons/indian.svg";
import { ReactComponent as UnderLine } from "src/assets/icons/underlining.svg";
import { ReactComponent as StrikeThrough } from "src/assets/icons/strikethrough.svg";
import { ReactComponent as UpperLowerCase } from "src/assets/icons/upper-lower-case.svg";
import { ReactComponent as PencilUnderline } from "src/assets/icons/pencil-underline.svg";
import { ReactComponent as Paint } from "src/assets/icons/paint.svg";
import { ReactComponent as ActivePaintIcon } from "src/assets/icons/active-paint.svg";
import { ReactComponent as Quotes } from "src/assets/icons/quotes.svg";
import { ReactComponent as CloudQuotes } from "src/assets/icons/cloud-quotes.svg";
import { ReactComponent as Degree } from "src/assets/icons/degree.svg";
import { ReactComponent as Format } from "src/assets/icons/format.svg";
import { ReactComponent as LinkOther } from "src/assets/icons/link-other.svg";
import { ReactComponent as Menu } from "src/assets/icons/menu.svg";
import { ReactComponent as ActiveMenuIcon } from "src/assets/icons/active-menu.svg";
import { ReactComponent as CardPlus } from "src/assets/icons/card-plus.svg";

import './TipTapTextFormatMenu.less';
import { Button, Flex } from "antd";
import { useState } from "react";
import ActivePaint from "../../../PlaygroundButtons/ActivePaint/ActivePaint";
import ActiveMenu from "../../../PlaygroundButtons/ActiveMenu/ActiveMenu";
import { Editor } from "@tiptap/react";

type TextFormatProps = {
    isPen?: boolean;
    buttonPosition: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    };
    editor: Editor | null;
};

function TipTapTextFormatMenu({ buttonPosition, isPen, editor }: TextFormatProps) {
    const [activePaint, setActivePaint] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);

    const handleRemoveFormat = () => {
        if (!editor) return;
        editor.chain().focus().unsetAllMarks().clearNodes().run();
    };

    const applyBold = () => {
        if (!editor) return;
        editor.chain().focus().toggleBold().run();
    };

    const applyItalic = () => {
        if (!editor) return;
        editor.chain().focus().toggleItalic().run();
    };

    const applyUnderline = () => {
        if (!editor) return;
        editor.chain().focus().toggleUnderline().run();
    };

    const applyStrikeThrough = () => {
        if (!editor) return;
        editor.chain().focus().toggleStrike().run();
    };

    const toggleUpperLowerCase = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;
        const selectedText = editor.state.doc.textBetween(from, to, "");
        const newText =
            selectedText === selectedText.toUpperCase()
                ? selectedText.toLowerCase()
                : selectedText.toUpperCase();
        editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
    };

    const applyPencilUnderline = () => {
        if (!editor) return;
        editor.chain().focus().toggleUnderline().run();
    };

    const applyQuotes = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;
        const selectedText = editor.state.doc.textBetween(from, to, "");
        const newText = `"${selectedText}"`;
        editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
    };

    const applyCloudQuotes = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;
        const selectedText = editor.state.doc.textBetween(from, to, "");
        const newText = `“${selectedText}”`;
        editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
    };


    const insertDegreeSymbol = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return; // ничего не выделено

        const selectedText = editor.state.doc.textBetween(from, to, "");

        if (/^\d+$/.test(selectedText)) {
            editor.chain().focus().toggleSuperscript().run();
        } else {
            editor.chain()
                .focus()
                .deleteRange({ from, to })
                .insertContent([
                    { type: 'text', text: selectedText },
                    {
                        type: 'text',
                        text: '²',
                        marks: [{ type: 'superscript' }],
                    },
                ])
                .run();
        }
    };


    const applyFormatBlock = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;

        const selectedText = editor.state.doc.textBetween(from, to, "");

        if (/^\d+$/.test(selectedText)) {
            editor.chain().focus().toggleSubscript().run();
        } else {
            editor.chain()
                .focus()
                .deleteRange({ from, to })
                .insertContent([
                    { type: 'text', text: selectedText },
                    {
                        type: 'text',
                        text: '¹',
                        marks: [{ type: 'subscript' }],
                    },
                ])
                .run();
        }
    };

    const applyLink = () => {
        if (!editor) return;

    };

    const handlePenClick = () => {
        setActivePaint(!activePaint);
    };

    const applyColor = (color: string) => {
        if (!editor) return;
        editor.chain().focus().setColor(color).run();
    };

    const handleMenuClick = () => {
        setActiveMenu(!activeMenu);
    };

    const handleCardPlus = () => {
        if (!editor) return;
        editor.chain().focus().insertContent('<div class="card">New Card</div>').run();
    };

    return (
        <>
            <Flex
                className={"text-format-container"}
                style={
                    isPen
                        ? {
                            position: "absolute",
                            bottom: "110px",
                            right: "14px",
                        }
                        : {
                            top: `${buttonPosition?.top}px`,
                            left: buttonPosition?.left ? `${buttonPosition.left - 200}px` : "auto",
                            bottom: `${buttonPosition?.bottom}px`,
                            right: `${buttonPosition?.right}px`,
                        }
                }
            >
                {/* Сброс стилей */}
                <Button className={"button"} onClick={handleRemoveFormat}>
                    <General />
                </Button>

                {/* Жирный */}
                <Button className={"button"} onClick={applyBold}>
                    <Bold />
                </Button>

                {/* Курсив */}
                <Button className={"button"} onClick={applyItalic}>
                    <Indian />
                </Button>

                {/* Подчёркивание */}
                <Button className={"button"} onClick={applyUnderline}>
                    <UnderLine />
                </Button>

                {/* Зачёркивание */}
                <Button className={"button"} onClick={applyStrikeThrough}>
                    <StrikeThrough />
                </Button>

                {/* Переключение регистров */}
                <Button className={"button"} onClick={toggleUpperLowerCase}>
                    <UpperLowerCase />
                </Button>

                {/* «карандашное» подчёркивание */}
                <Button className={"button"} onClick={applyPencilUnderline}>
                    <PencilUnderline />
                </Button>

                {/* Палитра цветов */}
                <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                    <Button
                        className={activePaint ? "button-active" : "button"}
                        onClick={handlePenClick}
                    >
                        {!activePaint ? <Paint /> : <ActivePaintIcon />}
                    </Button>
                    {activePaint && <ActivePaint onColorSelect={applyColor} />}
                </div>

                {/* Кавычки "..." */}
                <Button className={"button"} onClick={applyQuotes}>
                    <Quotes />
                </Button>

                {/* Кавычки “...” */}
                <Button className={"button"} onClick={applyCloudQuotes}>
                    <CloudQuotes />
                </Button>

                <Button className={"button"} onClick={insertDegreeSymbol}>
                    <Degree />
                </Button>

                <Button className={"button"} onClick={applyFormatBlock}>
                    <Format />
                </Button>

                <Button className={"button"} onClick={applyLink}>
                    <LinkOther />
                </Button>

                {isPen && (
                    <>
                        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                            <Button
                                className={activeMenu ? "button-active" : "button"}
                                onClick={handleMenuClick}
                            >
                                {!activeMenu ? <Menu /> : <ActiveMenuIcon />}
                            </Button>
                            {activeMenu && <ActiveMenu />}
                        </div>

                        <Button className={"button"} onClick={handleCardPlus}>
                            <CardPlus />
                        </Button>
                    </>
                )}
            </Flex>
        </>
    );
}

export default TipTapTextFormatMenu;
