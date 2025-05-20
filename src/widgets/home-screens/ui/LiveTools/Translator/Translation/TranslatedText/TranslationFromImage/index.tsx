import Popover from "src/shared/components/Popover";
import { LOADED_IMAGE_TRANSLATION } from "../../../../MockData";
import css from "./TranslationFromImage.module.less";
import { useRef, useState } from "react";

const TranslationFromImage = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const [selectedText, setSelectedText] = useState("");

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString() || "";
        setSelectedText(selectedText);
    };

    return (
        <div className={css.translatedTextWrapper} ref={textRef} onMouseUp={handleMouseUp}>
            <div
                className={css.imageText}
                dangerouslySetInnerHTML={{
                    __html: LOADED_IMAGE_TRANSLATION,
                }}
            />
            {selectedText && (
                <Popover
                    content={
                        <div
                            className={css.imageText}
                            dangerouslySetInnerHTML={{
                                __html: LOADED_IMAGE_TRANSLATION,
                            }}
                        />
                    }
                />
            )}
        </div>
    );
};

export default TranslationFromImage;
