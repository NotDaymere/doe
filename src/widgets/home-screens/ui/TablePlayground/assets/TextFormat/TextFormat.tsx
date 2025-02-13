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
import './TextFormat.less'
import { Button, Flex } from "antd";
import { useState, useRef } from "react";
import ActivePaint from "./ActivePaint/ActivePaint";
import ActiveMenu from "./ActiveMenu/ActiveMenu";
import Underline from "@tiptap/extension-underline";

type Props = {
    isPen?: boolean,
    buttonPosition: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    }
}

function TextFormat({ buttonPosition, isPen }: Props) {
    const [activePaint, setActivePaint] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const [editableText, setEditableText] = useState("Edit this text");
    const textRef = useRef<HTMLDivElement>(null);

    const handlePenClick = () => {
        setActivePaint(!activePaint);
    };

    const handleMenuClick = () => {
        setActiveMenu(!activeMenu);
    };

    const handleTextChange = () => {
        if (textRef.current) {
            setEditableText(textRef.current.innerText);
        }
    };

    return (
        <>
            <Flex
                className={'text-format-container'}
                style={{
                    top: `${buttonPosition?.top}px`,
                    left: buttonPosition?.left ? `${buttonPosition.left - 200}px` : 'auto',
                    bottom: `${buttonPosition?.bottom}px`,
                    right: `${buttonPosition?.right}px`,
                }}
            >
                <Button className={'button'}><General /></Button>
                <Button className={'button'}><Bold /></Button>
                <Button className={'button'}><Indian /></Button>
                <Button className={'button'}><UnderLine /></Button>
                <Button className={'button'}><StrikeThrough /></Button>
                <Button className={'button'}><UpperLowerCase /></Button>
                <Button className={'button'}><PencilUnderline /></Button>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <Button className={activePaint ? 'button-active' : 'button'} onClick={handlePenClick}>
                        {!activePaint ? <Paint /> : <ActivePaintIcon />}
                    </Button>
                    {activePaint && (<ActivePaint />)}
                </div>
                <Button className={'button'}><Quotes /></Button>
                <Button className={'button'}><CloudQuotes /></Button>
                <Button className={'button'}><Degree /></Button>
                <Button className={'button'}><Format /></Button>
                <Button className={'button'}><LinkOther /></Button>
                {isPen && (<>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <Button className={activeMenu ? ' button-active' : 'button'} onClick={handleMenuClick}>
                            {!activeMenu ? <Menu /> : <ActiveMenuIcon />}
                        </Button>
                        {activeMenu && (<ActiveMenu />)}
                    </div>
                    <Button className={'button'}><CardPlus /></Button>
                </>)}
            </Flex>


            <div
                className="editable-text"
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={textRef}
                onInput={handleTextChange}
                style={{ border: "1px solid #ccc", padding: "10px", minHeight: "40px", marginTop: "10px" }}
            >
                {editableText}
            </div>
        </>
    );
}

export default TextFormat;