import clsx from "clsx";
import style from "./PuzzleEditModal.module.less";
import CrossIcon from "src/shared/icons/Cross.icon";
import SendIcon from "src/shared/icons/Send.icon";
import { useState } from "react";

type PuzzleEditModalProps = {
    text: string;
    onClose: () => void;
    onSave: (value: string) => void;
};
export const PuzzleEditModal = ({ text, onClose, onSave }: PuzzleEditModalProps) => {
    const [inputValue, setInputValue] = useState(text);
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };
    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSave(inputValue);
        onClose();
    };
    return (
        <div className={style.puzzleEditModal} onMouseDown={(e) => e.stopPropagation()}>
            <div className={style.puzzleEditModal__backdrop} onClick={handleClose}>
                <div
                    className={style.puzzleEditModal__container}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={style.puzzleEditModal__content}>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={style.puzzleEditModal__text}
                        />
                        <div className={style.puzzleEditModal__buttons}>
                            <button
                                className={clsx(
                                    style.puzzleEditModal__button,
                                    style.puzzleEditModal__button__cancel
                                )}
                                onClick={handleClose}
                            >
                                <CrossIcon />
                            </button>
                            <button
                                className={clsx(
                                    style.puzzleEditModal__button,
                                    style.puzzleEditModal__button__save
                                )}
                                onClick={handleSave}
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
