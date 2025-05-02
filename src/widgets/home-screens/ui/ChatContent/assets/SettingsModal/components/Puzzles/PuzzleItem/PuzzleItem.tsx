import { LeftTopPuzzle } from "src/shared/icons/puzzleShapes/LeftTopPuzzle";
import styles from "./PuzzleItem.module.less";
import { MiddleTopPuzzle } from "src/shared/icons/puzzleShapes/MiddleTopPuzzle";
import { RightTopPuzzle } from "src/shared/icons/puzzleShapes/RightTopPuzle";
import { LeftMiddlePuzzle } from "src/shared/icons/puzzleShapes/LeftMiddlePuzzle";
import { MiddlePuzzle } from "src/shared/icons/puzzleShapes/MiddlePuzzle";
import { RightMiddlePuzzle } from "src/shared/icons/puzzleShapes/RightMiddlePuzzle";
import clsx from "clsx";
import { useCallback } from "react";

export type PuzzleCategories = "Identity" | "Preferences" | "Knowledge" | "Intent" | "Cognition";
export type PuzzleType = {
    id: string;
    category: PuzzleCategories | null;
    description: string | null;
};
type PuzzleItemProps = {
    index: number;
    puzzle: PuzzleType;
    addPuzzle: () => void;
    onClick: () => void;
    selectedPuzzleId: string | null;
};
export const PazzleItem = ({
    index,
    puzzle: { category, id },
    selectedPuzzleId,
    addPuzzle,
    onClick,
}: PuzzleItemProps) => {
    const isLastInRow = index % 4 === 3 || index === 3;
    const isSelected = selectedPuzzleId === id;
    const renderPuzzle = useCallback(() => {
        const puzzleProps = {
            category: category ?? "without_category",
            isColored: isSelected || !selectedPuzzleId,
        } as const;
        if (index === 0) return <LeftTopPuzzle {...puzzleProps} />;
        if (index > 0 && index < 3) return <MiddleTopPuzzle {...puzzleProps} />;
        if (index === 3) return <RightTopPuzzle {...puzzleProps} />;
        if (index % 4 === 0) return <LeftMiddlePuzzle {...puzzleProps} />;
        if (index % 4 > 0 && index % 4 < 3) return <MiddlePuzzle {...puzzleProps} />;
        if (index % 4 === 3) return <RightMiddlePuzzle {...puzzleProps} />;
    }, [index, category, selectedPuzzleId]);
    return (
        <div
            className={clsx(
                styles.puzzleItem__container,
                isSelected && styles.puzzleItem__container__selected
            )}
            onClick={() => onClick()}
        >
            {renderPuzzle()}
            {isSelected && (
                <div
                    className={clsx(
                        styles.puzzleItem__control__container,
                        isLastInRow && styles.puzzleItem__control__container__last
                    )}
                >
                    <button
                        className={clsx(
                            styles.puzzleItem__controlBtn,
                            styles.puzzleItem__controlBtn__add
                        )}
                        onClick={addPuzzle}
                    >
                        +
                    </button>
                    <button
                        className={clsx(
                            styles.puzzleItem__controlBtn,
                            styles.puzzleItem__controlBtn__remove
                        )}
                    >
                        -
                    </button>
                </div>
            )}
        </div>
    );
};
