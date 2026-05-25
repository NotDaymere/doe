import Popover from "src/shared/components/Popover";
import { LOADED_IMAGE_TRANSLATION } from "../../../../MockData";
import css from "./TranslationFromImage.module.less";
import { useRef, useState } from "react";

const TranslationFromImage = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const [selectedText, setSelectedText] = useState("");
    const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString() || "";

        if (selectedText && selection?.rangeCount) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setPopoverPosition({
                top: rect.top + window.scrollY - 40,
                left: rect.left + rect.width / 2 + window.scrollX,
            });
        } else {
            setPopoverPosition(null);
        }

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
            {selectedText && popoverPosition && (
                <Popover
                    content={
                        <div
                            className={css.imageText}
                            dangerouslySetInnerHTML={{
                                __html: LOADED_IMAGE_TRANSLATION,
                            }}
                        />
                    }
                    position={popoverPosition}
                />
            )}
        </div>
    );
};

export default TranslationFromImage;
