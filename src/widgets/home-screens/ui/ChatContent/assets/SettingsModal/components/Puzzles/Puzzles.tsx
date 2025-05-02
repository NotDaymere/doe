import { useEffect, useRef, useState } from "react";
import { PazzleItem, PuzzleCategories, PuzzleType } from "./PuzzleItem/PuzzleItem";
import styles from "./Puzzles.module.less";
import { useClickOut } from "src/shared/hooks/useClickOut";

export const Puzzles = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [puzzles, setPuzzles] = useState<PuzzleType[]>([
        { id: crypto.randomUUID(), category: "Cognition", description: null },
    ]);
    const [selectedPuzzle, setSelectedPuzzle] = useState<string | null>(null);
    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            console.log(
                Array.from(ref.current?.children ?? []).some((child) => child.contains(target))
            );
            if (
                ref.current &&
                !Array.from(ref.current?.children ?? []).some((child) => child.contains(target))
            ) {
                setSelectedPuzzle(null);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);
    const selectPuzzle = (id: string) => setSelectedPuzzle(id);
    const addPuzzle = () =>
        setPuzzles((prev) => [
            ...prev,
            { id: crypto.randomUUID(), category: null, description: null },
        ]);
    return (
        <div ref={ref} className={styles.puzzles__container}>
            {puzzles.map((puzzle, index) => (
                <PazzleItem
                    key={index}
                    index={index}
                    puzzle={puzzle}
                    addPuzzle={addPuzzle}
                    onClick={() => selectPuzzle(puzzle.id)}
                    selectedPuzzleId={selectedPuzzle}
                />
            ))}
        </div>
    );
};
