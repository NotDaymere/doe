import styles from "./PuzzleItem.module.less";
import clsx from "clsx";
import { PuzzleShape } from "./PuzzleShape";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { puzzleCategories } from "../Puzzles.config";
import MinusIcon from "src/shared/icons/Minus.icon";
import { PlusIcon } from "src/shared/icons/PlusIcon";
import { useState } from "react";
import { create } from "zustand";
import { createPortal } from "react-dom";
import { PuzzleEditModal } from "../PuzzleEditModal/PuzzleEditModal";

export type PuzzleCategories = "Identity" | "Preferences" | "Knowledge" | "Intent" | "Cognition";
export type PuzzleType = {
    id: string;
    category: PuzzleCategories | null;
    description: string | null;
};
type PuzzleItemProps = {
    index: number;
    puzzle: PuzzleType;
    addPuzzle: (e: React.MouseEvent<HTMLButtonElement>) => void;
    removePuzzle: () => void;
    onEdit: (text: string) => void;
    onClick: () => void;
    onSelectCategory: ({ category, id }: { category: PuzzleCategories; id: string }) => void;
    selectedPuzzleId: string | null;
    isFilled: boolean;
};
export const PuzzleItem = ({
    index,
    puzzle: { category, id, description },
    selectedPuzzleId,
    isFilled,
    addPuzzle,
    removePuzzle,
    onEdit,
    onClick,
    onSelectCategory,
}: PuzzleItemProps) => {
    const isLastInRow = index % 4 === 3 || index === 3;
    const isSelected = selectedPuzzleId === id;
    const isUnselected = selectedPuzzleId && selectedPuzzleId !== id;
    const [openEditModal, setOpenEditModal] = useState(false);

    return (
        <div
            className={clsx(
                styles.puzzleItem__container,
                isSelected && styles.puzzleItem__container__selected
            )}
            onClick={() => {
                onClick();
            }}
        >
            <CategorySelect
                category={category}
                onSelect={(cat) => onSelectCategory({ category: cat, id })}
                className={clsx(isUnselected && styles.puzzleItem__menu__unselected)}
            />
            <p
                className={clsx(
                    styles.puzzleItem__description,
                    category && !isUnselected && styles[category],
                    isUnselected && styles.puzzleItem__description__unselected
                )}
                onClick={() => setOpenEditModal(true)}
            >
                {description ?? "Create new memory block!"}
            </p>
            <PuzzleShape
                index={index}
                isColored={!selectedPuzzleId || isSelected}
                category={category}
            />
            {isSelected && (
                <div
                    className={clsx(
                        styles.puzzleItem__control__container,
                        isLastInRow && styles.puzzleItem__control__container__last
                    )}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {isFilled && (
                        <button
                            className={clsx(
                                styles.puzzleItem__controlBtn,
                                styles.puzzleItem__controlBtn__add
                            )}
                            onClick={addPuzzle}
                        >
                            <PlusIcon />
                        </button>
                    )}

                    {(index > 0 || (index === 0 && !!category)) && (
                        <button
                            className={clsx(
                                styles.puzzleItem__controlBtn,
                                styles.puzzleItem__controlBtn__remove
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                removePuzzle();
                            }}
                        >
                            <MinusIcon />
                        </button>
                    )}
                </div>
            )}
            {openEditModal &&
                createPortal(
                    <PuzzleEditModal
                        text={description ?? ""}
                        onClose={() => setOpenEditModal(false)}
                        onSave={onEdit}
                    />,
                    document.body
                )}
        </div>
    );
};
