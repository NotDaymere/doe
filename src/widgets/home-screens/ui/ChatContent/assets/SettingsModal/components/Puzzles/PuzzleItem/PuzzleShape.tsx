import { LeftMiddlePuzzle } from "src/shared/icons/puzzleShapes/LeftMiddlePuzzle";
import { LeftTopPuzzle } from "src/shared/icons/puzzleShapes/LeftTopPuzzle";
import { MiddlePuzzle } from "src/shared/icons/puzzleShapes/MiddlePuzzle";
import { MiddleTopPuzzle } from "src/shared/icons/puzzleShapes/MiddleTopPuzzle";
import { RightMiddlePuzzle } from "src/shared/icons/puzzleShapes/RightMiddlePuzzle";
import { RightTopPuzzle } from "src/shared/icons/puzzleShapes/RightTopPuzle";
import { PuzzleCategories } from "./PuzzleItem";

type PuzzleShapeProps = {
    index: number;
    isColored?: boolean;
    category?: PuzzleCategories | null;
    isPlaceholder?: boolean;
};

export const PuzzleShape = ({
    index,
    isColored = true,
    category,
    isPlaceholder = false,
}: PuzzleShapeProps) => {
    const puzzleProps = {
        isColored,
        category,
        isPlaceholder,
    } as const;
    if (index === 0) return <LeftTopPuzzle {...puzzleProps} />;
    if (index > 0 && index < 3) return <MiddleTopPuzzle {...puzzleProps} />;
    if (index === 3) return <RightTopPuzzle {...puzzleProps} />;
    if (index % 4 === 0) return <LeftMiddlePuzzle {...puzzleProps} />;
    if (index % 4 > 0 && index % 4 < 3) return <MiddlePuzzle {...puzzleProps} />;
    if (index % 4 === 3) return <RightMiddlePuzzle {...puzzleProps} />;
};
