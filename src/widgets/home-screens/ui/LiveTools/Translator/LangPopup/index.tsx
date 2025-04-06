import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useRef, useState } from "react";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import classNames from "classnames";
import FilesList from "../FilesList";
import css from "./LangPopup.module.less";

interface IProps {
    text?: string;
    onChange: (e: any) => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    isRotated: boolean;
}

const DEFAULT_TEXT = `Bijection language: create a one-to-one mapping from each letter of the English alphabet to a unique token. This could be another letter, a number, a symbol, or a string of characters. For example, map 'A' to '!', 'B' to '@', and so o`;

const LangPopup: FC<IProps> = ({
    onChange,
    isActive,
    setIsActive,
    isRotated,
    text = DEFAULT_TEXT,
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = useRef<HTMLDivElement>(null);
    const [files, setFiles] = useState<File[]>([]);
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
            setFiles([...files, ...uploadFiles]);
        },
    });

    console.log("text", text);

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
                    value={DEFAULT_TEXT}
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
                        {files && !drag && (
                            <FilesList
                                files={files}
                                isRotated={isRotated}
                                classes={css.filesList}
                            />
                        )}
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
