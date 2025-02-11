import { ReactComponent as General } from "src/assets/icons/general.svg";
import { ReactComponent as Bius } from "src/assets/icons/bius.svg";
import { ReactComponent as UpperLowerCase} from "src/assets/icons/upper-lower-case.svg";
import { ReactComponent as PencilUnderline } from "src/assets/icons/pencil-underline.svg";
import { ReactComponent as Paint } from "src/assets/icons/paint.svg";
import { ReactComponent as ActivePaintIcon } from "src/assets/icons/active-paint.svg";
import { ReactComponent as Quotes } from "src/assets/icons/quotes.svg";
import { ReactComponent as CloudQuotes } from "src/assets/icons/cloud-quotes.svg";
import { ReactComponent as Degree } from "src/assets/icons/degree.svg";
import { ReactComponent as Format } from "src/assets/icons/format.svg";
import { ReactComponent as LinkOther } from "src/assets/icons/link-other.svg";
import './TextFormat.less'
import { Button, Flex } from "antd";
import { useState } from "react";
import ActivePaint from "./ActivePaint/ActivePaint";
type Props = {
    buttonPosition: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    }
}

function TextFormat({buttonPosition}: Props) {
    const [activePaint, setActivePaint] = useState(false);
    const handlePenClick  = () => {
        setActivePaint(!activePaint);
    }
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
                <Button className={'button'}><Bius /></Button>
                <Button className={'button'}><UpperLowerCase /></Button>
                <Button className={'button'}><PencilUnderline /></Button>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <Button className={`button ${activePaint && ' button-active-paint'}`} onClick={handlePenClick}>
                        {!activePaint ? <Paint /> : <ActivePaintIcon />}
                    </Button>
                    {activePaint && (<ActivePaint />)}
                </div>
                <Button className={'button'}><Quotes /></Button>
                <Button className={'button'}><CloudQuotes /></Button>
                <Button className={'button'}><Degree /></Button>
                <Button className={'button'}><Format /></Button>
                <Button className={'button'}><LinkOther /></Button>
            </Flex>

    </>
    )
}
export default TextFormat;