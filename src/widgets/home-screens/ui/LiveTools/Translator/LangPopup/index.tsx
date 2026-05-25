import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useRef, useState } from "react";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import classNames from "classnames";
import FilesList from "../FilesList";
import css from "./LangPopup.module.less";

interface IProps {
    text: string;
    onChange: (e: any) => void;
    onUploadFiles: () => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    isRotated: boolean;
    buttonRef: React.RefObject<HTMLElement>;
}

const LangPopup: FC<IProps> = ({ onChange, isActive, setIsActive, isRotated, text, buttonRef }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);
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

    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [buttonRef]);

    useEffect(() => {
        if (isActive && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.value.length;
            textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }
    }, [isActive]);

    const handleUploadFiles = () => {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;
        input.onchange = (ev: any) => {
            const newFiles = Array.from(ev.target.files) as File[];
            setFiles([...files, ...newFiles]);
            input.remove();
        };
        input.click();
    };

    return (
        <CSSTransition
            in={isActive}
            timeout={300}
            classNames={css}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div className={css.langPopup} ref={popupRef}>
                <div ref={nodeRef} className={css.popupWrapper}>
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
                            {files && !drag && (
                                <FilesList
                                    files={files}
                                    isRotated={isRotated}
                                    classes={css.filesList}
                                />
                            )}
                            <div
                                className={classNames(css.attachmentIcon, {
                                    [css.colorIcon]: drag,
                                })}
                            >
                                <AttachmentIcon
                                    width={15}
                                    height={15}
                                    onClick={handleUploadFiles}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default LangPopup;
