import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PazzleItem, PuzzleCategories, PuzzleType } from "./PuzzleItem/PuzzleItem";
import styles from "./Puzzles.module.less";
import { PuzzleShape } from "./PuzzleItem/PuzzleShape";
import { create } from "domain";
import { createEmptyPuzzle } from "../../tabs/ModelSettingsTab/views/SensOfSelf/SensOfSelf";

type PuzzlesProps = {
    puzzles: PuzzleType[];
    setPuzzles: Dispatch<SetStateAction<PuzzleType[]>>;
};
export const Puzzles = ({ puzzles, setPuzzles }: PuzzlesProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [selectedPuzzle, setSelectedPuzzle] = useState<string | null>(null);
    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
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
    const addPuzzle = () => {
        setPuzzles((prev) => [...prev, createEmptyPuzzle()]);
    };
    const removePuzzle = (id: string) => {
        if (puzzles.length > 1) {
            setSelectedPuzzle((prev) => null);
            setPuzzles((prev) => prev.filter((puzzle) => puzzle.id !== id));
        }
    };
    const changeCategory = ({ category, id }: { category: PuzzleCategories; id: string }) => {
        setPuzzles((prev) => {
            return prev.map((puzzle) => {
                if (puzzle.id === id) {
                    return { ...puzzle, category };
                }
                return puzzle;
            });
        });
    };
    return (
        <div ref={ref} className={styles.puzzles__container}>
            {puzzles.map((puzzle, index) => (
                <PazzleItem
                    key={puzzle.id}
                    index={index}
                    puzzle={puzzle}
                    addPuzzle={() => addPuzzle()}
                    removePuzzle={() => removePuzzle(puzzle.id)}
                    onEdit={(text) =>
                        setPuzzles((prev) =>
                            prev.map((p) =>
                                p.id === puzzle.id ? { ...puzzle, description: text } : p
                            )
                        )
                    }
                    onClick={() => setSelectedPuzzle(puzzle.id)}
                    onSelectCategory={changeCategory}
                    selectedPuzzleId={selectedPuzzle}
                    isSingle={puzzles.length === 1}
                />
            ))}
            <PuzzleShape index={puzzles.length} isPlaceholder />
        </div>
    );
};
