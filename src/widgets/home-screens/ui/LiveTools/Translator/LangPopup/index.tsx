import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useRef, useState } from "react";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import classNames from "classnames";
import css from "./LangPopup.module.less";

interface IProps {
    text: string;
    onChange: (e: any) => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const LangPopup: FC<IProps> = ({ text, onChange, isActive, setIsActive }) => {
    const [showPopup, setShowPopup] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = useRef<HTMLDivElement>(null);

    const {
        drag,
        dragTarget,
        handleDragDropTarget,
        handleDragLeaveTarget,
        handleDragOverTarget,
        handleDragStart,
        handleDragOver,
        handleDragCancel,
    } = useDragFile({
        onUploadFiles(uploadFiles) {
            console.log("uploaded");
        },
    });

    useEffect(() => {
        if (isActive) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    }, [isActive]);

    useEffect(() => {
        if (showPopup && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.value.length;
            textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }
    }, [showPopup]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (combinedRef.current && !combinedRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup, setIsActive]);

    return (
        <CSSTransition
            in={showPopup}
            timeout={500}
            classNames={css}
            unmountOnExit
            nodeRef={combinedRef}
        >
            <div className={css.langPopup} ref={combinedRef}>
                <textarea
                    onChange={onChange}
                    value={text}
                    className={css.textarea}
                    ref={textareaRef}
                />
                <div
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragCancel}
                >
                    <div
                        className={classNames(css.dragWrapper, { [css._over]: dragTarget })}
                        onDragOver={handleDragOverTarget}
                        onDrop={handleDragDropTarget}
                        onDragLeave={handleDragLeaveTarget}
                    >
                        {drag && <div className={css.panel_drag} />}
                        <div className={classNames(css.attachmentIcon, { [css.colorIcon]: drag })}>
                            <AttachmentIcon width={15} height={15} />
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default LangPopup;
